<template>
  <div class="w-full flex items-start flex-col lg:mt-0 mt-[3rem]">
    <h2 class="w-full text-center text-lg leading-[1.25rem] font-medium mb-[1.5rem] full-hd:text-[1rem] full-hd:leading-[1.5rem]">
      NEW TO SHOPLINKS?
    </h2>

    <div class="w-full">
      <p class="mb-[1.125rem] text-black text-lg leading-[1.251rem] font-light">
        Creating an account is easy. By registering, you will be able to:
      </p>

      <ul class="flex flex-col gap-y-[0.5rem] mb-[1.5rem]">
        <li
          v-for="benefit in signUpBenefits"
          :key="benefit"
          class="flex items-center"
        >
          <Icon
            name="check-small"
            class="fill-black-lighter w-[1.25rem] h-[1.25rem]"
          />

          <span class="ml-[1rem] text-lg leading-[1.251rem] font-light">
            {{ benefit }}
          </span>
        </li>
      </ul>

      <button
        type="button"
        class="w-full h-[2.75rem] bg-white border-[0.125rem] border-black text-black text-sm font-medium hover:bg-black hover:text-white transition-colors duration-[160] ease-in-out"
        @click="handleCreateAccount"
      >
        CREATE AN ACCOUNT
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
// Constants
import { signUpBenefits } from '~/constants/signUpBenefits';

const emit = defineEmits(['signUp']);

function handleCreateAccount() {
  emit('signUp');
}
</script>
