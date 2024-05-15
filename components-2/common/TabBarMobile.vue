<template>
  <div
    v-if="isHomePage"
    class="sm:hidden fixed z-popup bottom-[1.25rem] left-[50%] translate-x-[-50%] flex items-center justify-center"
  >
    <div
      class="shadow-dashboard-back-button bg-black h-[3.75rem] px-[1.875rem] flex items-center justify-center gap-x-[2.625rem]"
    >
      <button class="outline-none" aria-label="Menu" @click="handleMenu">
        <Icon
          name="filter-horizontal"
          class="w-[1.25rem] h-[0.694rem] fill-white"
        />
        <span
          v-if="appliedFiltersLength"
          class="absolute text-white text-[0.625rem] font-light"
        >
          {{ appliedFiltersLength }}
        </span>
      </button>

      <button class="outline-none" aria-label="Search" @click="handleSearch">
        <Icon
          name="search-rounded"
          class="w-[1.25rem] h-[1.25rem] stroke-white"
          stroke-width="2"
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
    </div>
  </div>
</template>

<script setup lang="ts">
// Store
import { useUserStore } from "~/store/user";
import { useShopStore } from "~/store/shop";
import { useFilterStore } from "~/store/filter";
import { useUiStore } from "~/store/ui";

import { storeToRefs } from "pinia";

const route = useRoute();

const userStore = useUserStore();
const shopStore = useShopStore();
const uiStore = useUiStore();
const filterStore = useFilterStore();

const { has_account, metadata } = storeToRefs(userStore);
const { appliedFiltersLength } = storeToRefs(filterStore);
const { wishlist } = storeToRefs(shopStore);

const wishlistOpen = ref("stroke-white");

const isHomePage = computed(() => {
  return route.path === "/";
});

function handleSearch() {
  uiStore.openHeader();

  navigateTo({
    path: route.fullPath,
    query: {
      ...route.query,
      search: "",
    },
  });
}

function handleMenu() {
  navigateTo({
    path: route.fullPath,
    query: {
      ...route.query,
      filter: "",
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

watch(wishlist, () => {
  wishlistOpen.value = wishlist.value ? "fill-white" : "stroke-white";
});
</script>
