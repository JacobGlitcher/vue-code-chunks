<template>
  <Drawer
    :is-open="isSearchOpen"
    :hide-scroll="isMobile"
    transition="fade-translate-down-content"
    :overlay-class="`${!isBannerOpen ? 'mt-[3.5rem] sm:mt-[5.5rem]' : ''} ${
      isBannerOpen ? 'mt-[6.25rem] sm:mt-[8.25rem]' : ''
    }`"
    :content-class="`content bg-white w-full px-[1rem] sm:px-[1.875rem] xga:px-[2.5rem] full-hd:!px-[2.75rem] py-[0.688rem] sm:py-[2.25rem] ${
      !isBannerOpen
        ? 'max-h-[calc(100vh-3.5rem)] sm:max-h-[calc(100vh-5.5rem)]'
        : ''
    } ${
      isBannerOpen
        ? 'max-h-[calc(100vh-6.25rem)] sm:max-h-[calc(100vh-8.25rem)]'
        : ''
    }`"
    @close="handleClose()"
  >
    <div class="w-full h-full overflow-y-auto scroll">
      <form
        @submit.prevent="handleSearch"
        class="w-full h-[2.75rem] pb-[0.5rem] flex items-center border-b-black border-b-[0.063rem] mb-[1.438rem] sm:mb-[2.25rem]"
      >
        <button
          type="submit"
          aria-label="Show search results"
          class="sm:hidden block"
        >
          <Icon
            name="search-rounded"
            class="w-[1.25rem] h-[1.25rem] mr-[0.625rem] stroke-black"
            stroke-width="1.5"
          />
        </button>

        <input
          ref="inputElement"
          type="text"
          placeholder="Search"
          class="flex-1 pr-[2rem] py-[0.5rem] leading-[1.25rem] placeholder-[#767676] outline-none text-xl lg:text-lg font-normal text-black full-hd:text-[1rem] full-hd:leading-[1.5rem]"
          v-model="searchValue"
        />

        <Transition name="fade">
          <button
            v-if="searchValue"
            aria-label="Show search results"
            type="submit"
            class="sm:block hidden"
          >
            <Icon
              name="arrow-right-long-line"
              class="fill-black w-[1.438rem] h-[0.75rem]"
            />
          </button>
        </Transition>

        <Transition name="fade">
          <button
            v-if="searchValue"
            aria-label="Clear the search field"
            type="button"
            class="sm:hidden block"
            @click="handleClear"
          >
            <Icon name="close" class="stroke-black w-[1rem] h-[1rem]" />
          </button>
        </Transition>
      </form>

      <Transition name="fade-translate-down">
        <div v-if="autocompleteResults?.length" class="w-full">
          <h3
            class="text-lg font-medium text-black py-[0.875rem] sm:py-[0.6rem] leading-[1rem] full-hd:text-lg full-hd:leading-[1.25rem]"
          >
            Suggestions
          </h3>

          <ul
            class="sm:mt-0 mt-[0.875rem] w-full sm:h-[12.5rem] flex flex-col flex-wrap items-start content-start gap-y-[1.75rem] sm:gap-y-[0.6rem] gap-x-[2rem]"
          >
            <li
              v-for="(result, index) in autocompleteResults"
              :key="index"
              class="w-full sm:w-[9rem] flex"
            >
              <button
                :to="{
                  path: '/',
                  query: { ...route.query, search: undefined },
                }"
                class="flex w-full break-words text-lg font-normal full-hd:text-lg full-hd:leading-[1.25rem] text-black-lighter hover:text-black-lighter-hover leading-[1rem] border-b-black border-b-[0.063rem] transition-colors py-2 duration-[160ms] ease-in-out"
                @click="handleSuggestion(result.value)"
              >
                {{ result.value }}
              </button>
            </li>
          </ul>
        </div>
        <div v-else-if="Array.isArray(autocompleteResults)">
          <h3
            class="text-lg font-medium text-black uppercase opacity-[0.5] py-[0.875rem] sm:py-[0.6rem] leading-[1rem] full-hd:text-lg full-hd:leading-[1.25rem]"
          >
            Found nothing matching this search
          </h3>
        </div>
      </Transition>
    </div>
  </Drawer>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

// Store
import { useShopStore } from "~/store/shop";

// Utilities
import debounce from "~/utilities/debounce";

// Constants
import { mobileMediaQuery } from "~/constants";

const route = useRoute();

const isMobile = useMedia(mobileMediaQuery);

const shopStore = useShopStore();

const { autocompleteResults } = storeToRefs(shopStore);

const inputElement = ref<HTMLElement | null>(null);

const searchValue = ref<string>(
  typeof route.query.search === "string" && route.query.search
    ? route.query.search
    : ""
);

const isBannerOpen = useCheckBannerOpen();

const isSearchOpen = computed(() => {
  return typeof route.query.search === "string";
});

watch(
  searchValue,
  debounce((q: string) => {
    shopStore.getAutocomplete(q);
  }, 300)
);

watch(route, (value) => {
  // Focus on open
  if (typeof value.query.search === "string") {
    setTimeout(() => {
      focus();
    }, 300);
  }

  // Clear field on close
  if (typeof value.query.search !== "string") {
    searchValue.value = "";
  }
});

function handleClose(path = route.fullPath) {
  navigateTo({
    path,
    query: {
      ...route.query,
      search: undefined,
    },
  });

  shopStore.clearAutocomplete();
}

function focus() {
  if (inputElement.value) {
    inputElement.value.focus();
  }
}

function handleSuggestion(value: string) {
  shopStore.setQuery(value);
  handleClose("/");
}

function handleSearch() {
  shopStore.setQuery(searchValue.value);
  handleClose("/");
}

function handleClear() {
  searchValue.value = "";
  shopStore.clearAutocomplete();
}
</script>
