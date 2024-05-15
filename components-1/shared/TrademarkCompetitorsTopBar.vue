<template>
  <div class="mb-1 py-7 px-6 -sm:p-4 flex items-center justify-start">
    <BaseButton class="py-[0.9375rem] px-[1.3125rem] -sm:py-[0.71875rem] -sm:px-[0.65625rem] mr-7 -sm:mr-4" variant="secondary" @click="handleBackClick">
      <Icon name="arrow-left" />
    </BaseButton>
    <h3 class="text-[#787878] text-[1.0625rem]">{{ search }} {{ label }}</h3>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

const props = defineProps<{
  label?: string;
}>();

const { search } = route.query;

const handleBackClick = () => {
  // TODO make dynamic (possibility to navigate to generator)
  navigateTo('search');
};
</script>