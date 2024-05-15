<template>
  <div class="w-full p-[1.75rem] flex items-stretch justify-between border-b-[#EAEAEA] border-b-[0.063rem]">
    <div class="w-[45%] md:w-[60%] flex items-start flex-col">
      <img
        :src="offer.image"
        :alt="offer.name"
        class="w-[2.563rem] h-[2.563rem] rounded-[0.25rem]"
      />

      <h4 class="mt-[1.188rem] mb-[0.313rem] font-normal text-xl w-full text-black text-ellipsis whitespace-nowrap overflow-hidden">
        {{ offer.website_url }}
      </h4>

      <h5 class="text-sm font-light text-gray-100 w-full text-ellipsis whitespace-nowrap overflow-hidden">
        {{ offer.description }}
      </h5>
    </div>

    <div class="w-[50%] md:w-[40%] flex items-end justify-start flex-col">
      <div>
        <span
          class="text-[1.063rem] text-black font-light"
          :class="{ 'text-gray-500': typeof offer.discounted_price === 'number', 'text-black': typeof offer.discounted_price !== 'number', 'line-through': typeof offer.discounted_price === 'number' }"
        >
          ${{ offer.price }}
        </span>

        <span v-if="offer.discounted_price" class="ml-[0.625rem] text-[1.063rem] text-black font-light">
          ${{ offer.discounted_price }}
        </span>
      </div>

      <a
        :href="offer.url"
        target="_blank"
        class="mt-auto flex items-center bg-black hover:bg-black-lighter px-[1.5rem] h-[2.625rem] transition-colors duration-[160] ease-in-out"
      >
        <span class="text-sm text-white font-light mr-[1rem]">
          BUY NOW
        </span>

        <Icon
          name="arrow-down-right"
          class="w-[1.25rem] h-[1.25rem] stroke-white"
        />
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
// Types
import { IProductOffer } from '~/types';

const props = defineProps<{
  offer: IProductOffer;
}>();
</script>
