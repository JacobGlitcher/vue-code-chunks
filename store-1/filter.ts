// Utilities
import { getTruthyObjectPropertiesLength } from '~/utilities/getTruthyObjectPropertiesLength';

// Types
import { FilterType, IFilterState, ISortOption } from '~/types';

const existingFilters: FilterType[] = [
  {
    type: 'variants',
    key: 'color',
    label: 'Colour',
    variants: [
      {
        key: 'black',
        label: 'Black',
      },
      {
        key: 'white',
        label: 'White',
      },
    ],
  },
  {
    type: 'variants',
    key: 'size',
    label: 'Size',
    variants: [
      {
        key: 's',
        label: 'Small',
      },
      {
        key: 'm',
        label: 'Medium',
      },
      {
        key: 'l',
        label: 'Large',
      },
      {
        key: 'xl',
        label: 'Extra Large',
      },
    ],
  },
  {
    type: 'range',
    key: 'lowest_price_usd',
    label: 'Price',
    min: 10,
    max: 5000,
    step: 10,
    format: {
      prefix: '$',
      suffix: '',
      decimals: 0,
      thousand: ','
    },
  }
];

const existingSortOptions: ISortOption[] = [
  {
    name: 'Default',
    value: ''
  },
  {
    name: 'Price - High',
    value: 'lowest_price_usd:desc',
  },
  {
    name: 'Price - Low',
    value: 'lowest_price_usd:asc',
  },
  {
    name: 'Newest',
    value: 'created_at:desc',
  },
];

export const useFilterStore = defineStore('filter', {
  state: (): IFilterState => {
    return {
      list: existingFilters,
      sortOptions: existingSortOptions,
      appliedFilters: {},
      sorting: '',
    };
  },
  getters: {
    appliedFiltersLength: (state) => {
      let count = 0;

      Object.values(state.appliedFilters).forEach((filters) => {
        count += Array.isArray(filters) ? 1 : getTruthyObjectPropertiesLength(filters);
      });

      return count;
    },
  },
  actions: {
    async getFilters() {
      try {
        // const response = await useRequest('filters', {
        //   method: 'GET',
        // });

        this.list = existingFilters;
        this.sortOptions = existingSortOptions;
      } catch (e) {
        console.error(e);
      }
    },
    applyFilter(filter: FilterType, value: any) {
      const prevFiltersState = this.appliedFilters[filter.key] || {};

      if (filter.type === 'variants') {
        this.appliedFilters[filter.key] = {
          ...(prevFiltersState),
          [value.fieldKey]: value.value,
        };
      } else if (filter.type === 'range') {
        this.appliedFilters[filter.key] = value;
      }
    },
    toggleFilter(data: { id: string, valueKey: string, value: any }) {
      const appliedFilters = this.appliedFilters[data.id];

      if (appliedFilters) {
        const appliedFilter = this.appliedFilters[data.id][data.valueKey];

        if (appliedFilter) {
          delete this.appliedFilters[data.id][data.valueKey];
          return;
        }

        this.appliedFilters[data.id][data.valueKey] = data.value;
        return;
      }

      this.appliedFilters[data.id] = {
        [data.valueKey]: data.value,
      };
    },
    setFilters(data: Record<string, Record<string, any>>) {
      Object.assign(this.appliedFilters, data);
    },
    setSorting(s: string) {
      this.sorting = s ?? undefined
    }
  },
});
