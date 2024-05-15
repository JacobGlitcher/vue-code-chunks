import { ICatalog, ICatalogType, ICategory, ICategoryState } from '~/types';

import type { Data as CategoriesResponse } from '~/server/api/categories.get'

export const useCategoryStore = defineStore('category', {
  state: (): ICategoryState => {
    return {
      list: [],
      map: new Map()
    };
  },
  getters: {

  },
  actions: {
    async getCategories() {
      try {
        const { data, error } = await useFetch<CategoriesResponse>('/api/categories');

        if (error.value) {
          throw new Error(error.value?.message);
        }

        if (data.value) {
          const mapped = data.value.map<ICategory>((category) => {
            const _category: ICategory = {
              id: category.handle,
              name: category.name,
              catalogs: category.category_children.map<ICatalog>((child) => {
                const _catalog: ICatalog = {
                  // count: 0,
                  id: child.handle,
                  name: child.name,
                  types: child.category_children.map<ICatalogType>((grand_child) => {
                    const _type: ICatalogType = {
                      // count: 0,
                      id: grand_child.handle,
                      name: grand_child.name,
                      // new: true
                    };

                    this.map.set(_type.id, _type.name);

                    return _type;
                  })
                };

                this.map.set(_catalog.id, _catalog.name);

                return _catalog;
              })
            };

            this.map.set(_category.id, _category.name);

            return _category;
          });

          this.list = mapped;
        }
      } catch (e) {
        console.error(e);
      }
    },
  },
});
