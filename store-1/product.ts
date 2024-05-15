import { IProductState } from '~/types';

import type { Product } from '../server/api/product.get'
import type { Data as ProductsResponse, Product as MProduct } from '../server/api/search.post'

export const useProductStore = defineStore('product', {
  state: (): IProductState => {
    return {
      variant: undefined,
      product: undefined,
      recommended: undefined,
      selectedOptions: {}
    };
  },
  getters: {

  },
  actions: {
    reset() {
      this.variant = undefined;
      this.product = undefined;
      this.recommended = undefined;
      this.selectedOptions = undefined;
    },
    updateOption(optionId: string, value: string) {
      this.selectedOptions[optionId] = value;

      const variant = this.product!.variants!.find(variant => {
        return variant.options!.every(option => option.value === this.selectedOptions[option.option_id])
      });

      if (!variant) {
        throw new Error("");

      }

      this.variant = variant;
    },
    async getProduct(handle: string) {
      try {
        const { data, error } = await useFetch<Product>(`/api/product`, {
          query: { handle }
        });

        if (error.value) {
          throw new Error(error.value?.message);
        }

        if (data.value) {
          this.product = data.value;
          this.variant = this.product!.variants[0];
          this.selectedOptions = this.variant!.options!.reduce((acc, curr) => {
            return { ...acc, [curr.option_id]: curr.value }
          }, {});

          this.getRecommended();
        }
      } catch (e) {
        console.error(e);
      }
    },
    async getRecommended() {
      try {
        if (!this.product?.title) {
          return
        };

        const { data, error } = await useFetch<ProductsResponse>('/api/search', {
          method: 'POST',
          body: {
            q: this.product?.title,
            limit: 10
          }
        });

        if (error.value) {
          throw new Error(error.value?.message);
        }

        if (data.value) {
          this.recommended = data.value.products.
            filter(p => p.id !== this.product?.id);
        }
      } catch (e) {
        console.error(e);
      }
    }
  },
});
