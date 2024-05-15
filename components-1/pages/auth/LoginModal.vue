<template>
  <div class="pt-13 -sm:pt-0 -sm:px-[0.875rem] mb-[2.3125rem]">
    <h2 class="text-[#D5D5D5] mb-[1.875rem] text-lg">Welcome to Find</h2>
    <div class="flex flex-col justify-start items-center">
      <BaseButton class="flex items-center justify-center p-[0.625rem] text-dark-400 mb-2 w-full" variant="primary">
        <Icon class="mr-4" name="google" />
        <span class="font-medium">Continue with Google</span>
      </BaseButton>
      <BaseButton class="flex items-center justify-center p-[0.625rem] text-dark-400 w-full" variant="primary" @click="handleEmailClick">
        <Icon class="mr-4" name="email" />
        <span class="font-medium">Continue with Email</span>
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
const handleEmailClick = () => {
  navigateTo({
    query: {
      auth: 'signin'
    },
  });
};
</script>