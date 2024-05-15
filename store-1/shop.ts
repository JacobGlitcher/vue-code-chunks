import { useFilterStore } from './filter';

import type { ICatalogType, IStoreState } from '~/types';

import type { Data as ProductsResponse } from '../server/api/search.post'

export const useShopStore = defineStore('shop', {
  state: (): IStoreState => {
    return {
      wishlist: false,
      offset: 0,
      count: Infinity,
      products: undefined,
      autocompleteResults: undefined,
      selectedCategories: [],
      query: '',
      sorting: '',
      filters: {}
    };
  },
  getters: {

  },
  actions: {
    reset() {
      this.query = '';
      this.offset = 0;
      this.count = Infinity;
      this.wishlist = false;
      this.products = undefined;
      this.selectedCategories = [];
      this.autocompleteResults = undefined;
      this.sorting = '';
      this.filters = {};
    },
    setupWatch() {
      const filterStore = useFilterStore();

      watch(() => filterStore.sorting, (sorting) => {
        this.sorting = sorting;
        this.products = undefined;
        // console.log(sorting);

        setTimeout(() => this.getProducts());
      });

      watch(filterStore.appliedFilters, (filters) => {
        this.filters = filters;
        this.products = undefined;
        // console.log(filters);

        setTimeout(() => this.getProducts());
      });
    },
    async setCategories(categories: ICatalogType[]) {
      // this.reset();
      this.selectedCategories = categories;

      await this.getProducts();
    },
    async setQuery(q: string) {
      this.reset();
      this.query = q;

      await this.getProducts();
    },
    async clearAutocomplete() {
      this.autocompleteResults = undefined;
    },
    removeProduct(id: string) {
      if (this.products?.length) {
        const i = this.products.findIndex(p => p.id === id);

        if (i > -1) {
          this.products.splice(i, 1);
        }
      }
    },
    async toggleWishlist(ids: string[]) {
      const t = this.wishlist;

      this.reset();
      this.wishlist = !t;

      if (this.wishlist) {
        await this._getWishedProducts(ids);
      } else {
        await this.getProducts();
      }
    },
    async updateOffset(offset = 20) {
      if (this.offset >= this.count) {
        return;
      }

      this.offset = Math.min(this.offset + offset, this.count);

      await this.getProducts();
    },
    async getProducts() {
      try {
        const { data, error } = await useFetch<ProductsResponse>('/api/search', {
          method: 'POST',
          body: {
            q: this.query,
            offset: this.offset,
            categories: this.selectedCategories.map(({ id }) => id),
            sorting: this.sorting,
            filters: this.filters,
          }
        });

        if (error.value) {
          throw new Error(error.value?.message);
        }

        if (data.value) {
          this.offset = data.value.offset;
          this.count = data.value.count;

          if (data.value.offset > 0 && this.products?.length) {
            this.products = this.products!.concat(data.value.products);
          } else {
            this.products = data.value.products;
          }
        }
      } catch (e) {
        console.error(e);
      }
    },
    async _getWishedProducts(ids: string[]) {
      try {
        //
        ids = [];

        for (let i = 0; i < localStorage.length; i++) {
          const key: string = localStorage.key(i)!;

          if (key.startsWith('wish_')) {
            ids.push(localStorage.getItem(key)!);
          }
        }
        //

        const { data, error } = await useFetch<ProductsResponse>('/api/search', {
          method: 'POST',
          body: { ids }
        });

        if (error.value) {
          throw new Error(error.value?.message);
        }

        if (data.value) {
          this.products = data.value.products;
          this.offset = data.value.offset;
          this.count = data.value.count;
        }
      } catch (e) {
        console.error(e);
      }
    },
    async getAutocomplete(q: string) {
      if (!q) {
        this.autocompleteResults = undefined;
        return;
      }

      const { data, error } = await useFetch<ProductsResponse>('/api/search', {
        method: 'POST',
        body: {
          q, limit: 10
        }
      });

      if (error.value) {
        throw new Error(error.value?.message);
      }

      if (data.value) {
        this.autocompleteResults = data.value.products.map((p) => ({
          value: p.title
        }));
      }
    },
  },
});
