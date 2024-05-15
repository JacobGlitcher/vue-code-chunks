<template>
  <header
    :class="{
      'sm:flex hidden': hideMobile,
      flex: !hideMobile,
      'z-popup transition-top-index': !hasCategory,
      'transition-top z-modal': hasCategory,
      'top-[2.75rem]': isBannerOpen,
      'top-0': !isBannerOpen,
      '!top-[-16rem]': !isHeaderOpen,
    }"
    class="fixed w-full bg-white pl-[1rem] sm:pl-[1.875rem] sm:pr-[1.875rem] pr-[1rem] xga:px-[2.5rem] full-hd:!px-[2.75rem] h-mobile-header sm:h-header flex-row items-center duration-300 ease-in-out"
  >
    <NuxtLink
      v-if="back"
      :to="{ path: back, query: { ...route.query, ...backQuery } }"
      aria-label="Go back"
      class="mr-[1rem] w-[1.5rem] h-[1.5rem] flex items-center justify-center"
    >
      <Icon
        name="arrow-left-line"
        class="w-[1.25rem] h-[1.25rem] stroke-black"
      />
    </NuxtLink>

    <NuxtLink
      :to="{
        path: '/',
      }"
      @click="resetState"
      class="text-lg font-medium text-black"
    >
      SHOPLINKS
    </NuxtLink>

    <nav
      v-if="!isMobile"
      class="ml-[2rem] lg:ml-[8.465rem] xga:ml-[8.6rem] full-hd:!ml-[10.2rem] hidden md:flex items-center"
    >
      <ul class="main-nav gap-x-[2rem] flex items-center">
        <li v-for="category in categoriesList" :key="category.id" class="flex">
          <button
            :class="{ 'after:bg-black': route.query.category === category.id }"
            class="relative text-sm text-black xga:text-md full-hd:!text-lg font-normal after:absolute after:left-0 after:top-[100%] after:mt-[0.5rem] after:z-component after:w-full after:h-[0.125rem] after:transition-colors after:duration-300 after:ease-in-out"
            @mouseenter="handleCategory(category.id, true)"
            @click="handleCategory(category.id)"
          >
            {{ category.name }}
          </button>
        </li>
      </ul>
    </nav>

    <div class="ml-auto hidden sm:flex items-center justify-end">
      <div class="flex items-center justify-end gap-x-[2rem]">
        <button
          aria-label="Search"
          class="flex items-center justify-end"
          @mouseenter="handleSearch"
          @click="handleSearchClick"
        >
          <Icon
            class="w-[1.25rem] h-[1.25rem] stroke-black"
            name="search-rounded"
            stroke-width="1.5"
          />
        </button>

        <button
          v-if="true"
          aria-label="Wishlist"
          class="flex items-center justify-end"
          @click="handleWishlist"
        >
          <Icon
            class="w-[1.25rem] h-[1.25rem]"
            :class="wishlistOpen"
            name="heart"
            stroke-width="1.5"
          />
        </button>

        <HeaderAuthButtons />
      </div>
    </div>

    <div
      v-if="!isSearch"
      class="sm:hidden flex items-center justify-end ml-auto gap-x-[1.1rem] sm:mr-0 mr-[0.5rem]"
    >
      <!-- <button :class="{ 'mr-[0.2rem]': appliedFiltersLength }" class="relative flex items-center" @click="handleFilter">
        <Icon name="filter-horizontal" class="w-[1rem] h-[0.688rem] mr-[0.8rem]" />

        <span class="text-md font-normal text-black leading-[1rem]">
          Filter
        </span>

        <span v-if="appliedFiltersLength"
          class="absolute top-[-0.2rem] left-[calc(100%+0.15rem)] text-[0.625rem] font-light">
          {{ appliedFiltersLength }}
        </span>
      </button> -->

      <!-- <button v-if="has_account" aria-label="Wishlist" class="flex items-center justify-end" @click="handleWishlist">
        <Icon class="w-[1.25rem] h-[1.25rem]" :class="wishlistOpen" name="heart" stroke-width="1.5" />
      </button> -->

      <HeaderAuthButtons />
    </div>

    <button
      v-else
      aria-label="Close search"
      type="button"
      class="sm:hidden block ml-auto"
      @click="handleCloseSearch"
    >
      <Icon name="close" class="stroke-black w-[1rem] h-[1rem]" />
    </button>
  </header>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

// Components
import HeaderAuthButtons from "~/components-2/common/Header/HeaderAuthButtons.vue";

// Store
import { useUserStore } from "~/store/user";
import { useShopStore } from "~/store/shop";
import { useUiStore } from "~/store/ui";
import { useCategoryStore } from "~/store/category";
import { useFilterStore } from "~/store/filter";

// Constants
import { mobileMediaQuery } from "~/constants";

const props = defineProps<{
  hideMobile?: boolean;
}>();

const route = useRoute();

const isMobile = useMedia(mobileMediaQuery);

const userStore = useUserStore();
const shopStore = useShopStore();
const uiStore = useUiStore();
const categoryStore = useCategoryStore();
const filterStore = useFilterStore();

const { has_account, metadata } = storeToRefs(userStore);
const { back, backQuery, isHeaderOpen } = storeToRefs(uiStore);
const { list: categoriesList } = storeToRefs(categoryStore);
const { appliedFiltersLength } = storeToRefs(filterStore);
const { wishlist, selectedCategories } = storeToRefs(shopStore);

const isBannerOpen = useCheckBannerOpen();

const wishlistOpen = ref("stroke-black");

const hasCategory = computed<boolean>(() => {
  const category = route.query.category;

  return Boolean(category && typeof category === "string");
});

const isSearch = computed(() => {
  return typeof route.query.search === "string";
});

function handleCategory(id: string, onlyOpen?: boolean) {
  navigateTo({
    path: route.fullPath,
    replace: !!onlyOpen,
    query: {
      ...route.query,
      category: onlyOpen ? id : route.query.category === id ? undefined : id,
      filterDropdown: undefined,
      search: undefined,
    },
  });
}

function handleWishlist() {
  shopStore.toggleWishlist(
    Array.isArray(metadata?.value?.wishlist)
      ? (metadata?.value?.wishlist as string[])
      : []
  );
}

function handleSearch() {
  navigateTo({
    path: route.fullPath,
    replace: true,
    query: {
      ...route.query,
      search: "",
      filterDropdown: undefined,
      category: undefined,
    },
  });
}

function handleSearchClick() {
  navigateTo({
    path: route.fullPath,
    query: {
      ...route.query,
      search: typeof route.query.search === "string" ? undefined : "",
      filterDropdown: undefined,
      category: undefined,
    },
  });
}

function handleCloseSearch() {
  navigateTo({
    path: route.fullPath,
    query: {
      ...route.query,
      search: undefined,
    },
  });
}

function resetState() {
  //   navigateTo({
  //     path: route.fullPath,
  //     query: {},
  //   });

  //   shopStore.reset();
  //   setTimeout(() => shopStore.getProducts());

  location.replace("/");
}

onMounted(() => {
  setTimeout(() => {
    if (route.params.categoryId && !selectedCategories.value.length) {
      shopStore.setCategories([
        { id: route.params.categoryId as string, name: "" },
      ]);
    }
  });
});

watch(wishlist, () => {
  wishlistOpen.value = wishlist.value ? "fill-black" : "stroke-black";
});
</script>
