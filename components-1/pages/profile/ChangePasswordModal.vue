<template>
  <form class="flex flex-col items-start justify-start w-full" @submit.prevent="handleSubmit">
    <div class="flex items-center justify-between w-full mb-[1.125rem] -sm:mb-6 -sm:flex-col -sm:items-start">
      <span class="text-white-900 mr-[3.75rem] text-[0.9375rem] -sm:mb-3">
        Old password
      </span>
      <BaseInput class="flex-1 -sm:bg-dark-700 -sm:w-full" v-model="passwordState.oldPassword" />
    </div>
    <div class="flex items-center justify-between w-full mb-[4.875rem] -sm:mb-6 -sm:flex-col -sm:items-start">
      <span class="text-white-900 mr-[3.75rem] text-[0.9375rem] -sm:mb-3">
        New password
      </span>
      <div class="flex-1 relative -sm:w-full">
        <BaseInput class="w-full -sm:bg-dark-700 -sm:w-full" :model-value="passwordState.newPassword" />
        <span class="absolute -bottom-6 left-0 text-white-700 font-medium text-[0.9375rem] -sm:hidden">Minimum 8 characters</span>
      </div>
    </div>
    <BaseButton class="p-[0.625rem] w-full font-medium text-[0.9375rem]" variant="primary">Change</BaseButton>
  </form>
</template>

<script setup lang="ts">
const passwordState = reactive({
  oldPassword: '',
  newPassword: '',
});

const handleSubmit = () => {
  console.log(passwordState);
};
</script>