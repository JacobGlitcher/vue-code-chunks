<template>
  <div class="relative group shop-item border-l-white border-l-[0.063rem]">
    <NuxtLink
      :to="{
        path: `/product/${product.handle}`,
        query: { ...route.query, from: from || undefined },
      }"
    >
      <div
        class="relative w-full bg-[#f6f6f6] before:block before:pb-[133.33333%] before:w-full"
      >
        <div
          class="absolute left-0 right-0 bottom-[1px] top-0 flex items-center justify-center overflow-hidden"
        >
          <ul
            v-if="product?.tags?.length"
            class="absolute z-component top-0 left-0 py-[1.125rem] px-[0.875rem] w-full flex items-center flex-wrap gap-[0.875rem]"
          >
            <li
              v-for="badge in product?.tags"
              :key="badge"
              :style="{ backgroundColor: BADGES[badge]?.color ?? '#6E6E6E' }"
              class="px-[0.875rem] h-[1.688rem] flex items-center max-w-full overflow-hidden"
            >
              <Icon
                v-if="BADGES[badge]?.icon"
                :name="(BADGES[badge]?.icon as any)"
              />

              <span
                class="flex-1 max-w-full text-xs text-black font-medium font-suisse text-ellipsis whitespace-nowrap overflow-hidden"
                :class="{ 'ml-[0.625rem]': !!BADGES[badge]?.icon }"
              >
                {{ badge }}
              </span>
            </li>
          </ul>

          <!-- <div v-if="images.length > 1" class="w-full h-full flex items-center justify-center">
            <img :src="images[0]" :alt="name" loading="lazy" class="max-w-full max-h-full" />
            <img :src="images[1]" :alt="name" loading="lazy"
              class="absolute max-w-full max-h-full transition-opacity duration-[240] ease-shop-item-image opacity-0 lg:group-hover:opacity-100" />
          </div>
          <img v-else :src="images[0]" :alt="name" loading="lazy" class="max-w-full max-h-full" /> -->

          <img
            v-if="product.images[0]"
            :src="product.images[0]"
            loading="lazy"
            class="max-w-full max-h-full"
          />
        </div>
      </div>

      <div
        class="px-[0.75rem] pt-[1rem] pb-[2.5rem] sm:px-[2.25rem] sm:pt-[1.5rem] sm:pb-[4rem] flex flex-col items-start justify-center"
      >
        <h3
          class="text-sm tracking-[1.05px] text-center font-medium text-black-light font-suisse mb-[0.5rem] line-clamp-2 w-full leading-[1rem] full-hd:text-lg full-hd:leading-[1.25rem]"
        >
          {{ product.title }}
        </h3>

        <span
          class="w-full text-sm text-center tracking-[0.7px] font-light text-black-lighter leading-[1rem] full-hd:text-lg full-hd:leading-[1.25rem]"
        >
          {{ `$${product.lowest_price_usd}` }}
        </span>

        <!-- <span v-if="options"
          class="w-full tracking-[0%] text-center text-black-light-hover text-sm font-light mt-[0.5rem] leading-[1rem] full-hd:text-lg full-hd:leading-[1.25rem]">
          {{ options }}
        </span> -->

        <!-- <span v-if="lowestPrice"
          class="mt-[0.5rem] tracking-[0.13px] w-full text-center text-gray-400 text-[0.625rem] font-light leading-[1rem] full-hd:text-sm">
          Lowest price
        </span> -->

        <span
          class="mt-[0.5rem] tracking-[0.13px] w-full text-center text-gray-400 text-[0.625rem] font-light leading-[1rem] full-hd:text-sm uppercase"
        >
          Read More
        </span>
      </div>
    </NuxtLink>

    <button
      v-if="showFavorite"
      :aria-label="`Add ${product.title} to wish list`"
      class="absolute top-[-3.5rem] sm:top-[-3.875rem] mt-[133.33333%] right-[0.5rem] sm:right-[0.875rem] w-[2.625rem] h-[2.625rem] rounded-full text-black hover:text-white bg-white hover:bg-black flex items-center justify-center opacity-100 lg:opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out"
      @click="handleFavorite"
    >
      <Icon
        name="heart"
        :class="{ 'fill-[currentColor]': isFavorite }"
        class="stroke-[currentColor] w-[1.25rem] h-[1.25rem]"
        stroke-width="1.5"
      />
    </button>

    <button
      v-if="showDelete"
      :aria-label="`Delete ${product.title} from wish list`"
      class="absolute top-[-3.5rem] sm:top-[-3.875rem] mt-[133.33333%] right-[0.5rem] sm:right-[0.875rem] w-[2.625rem] h-[2.625rem] rounded-full text-black hover:text-white bg-white hover:bg-black flex items-center justify-center opacity-100 lg:opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out"
      @click="handleDelete"
    >
      <Icon
        name="close"
        class="stroke-[currentColor] w-[1.25rem] h-[1.25rem]"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Product } from "~/server/api/search.post";

import type { IShopItemBadge } from "~/types";

import { BADGES } from "~/constants/badges";

const route = useRoute();

const props = defineProps<{
  badges?: IShopItemBadge[];
  // isFavorite?: boolean;
  showFavorite?: boolean;
  showDelete?: boolean;
  from?: string;
  product: Product;
}>();

const emit = defineEmits(["delete", "favorite"]);

const isFavorite = ref(
  Boolean(localStorage.getItem(`wish_${props.product.id}`))
);

function handleDelete() {
  emit("delete", props.product.id);
}

function handleFavorite() {
  isFavorite.value = true;
  emit("favorite", props.product.id);
}
</script>
