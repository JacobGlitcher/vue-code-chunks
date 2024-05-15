<template>
  <Teleport to="body">
    <Transition name="fade-translate-down-content">
      <BaseModal
        v-if="isOpen"
        content-class="min-h-screen md:min-h-fit"
        @close="handleClose"
      >
        <BaseModalHeader title="Language" @close="handleClose" />

        <p class="text-lg leading-[1.25rem] font-light text-black">
          You're currently shopping in Germany store. You can browse this store in the following languages:
        </p>

        <form
          class="mt-[1.5rem] w-full flex flex-col items-start"
          @submit.prevent="handleSubmit"
        >
          <BaseSelect
            placeholder="Choose a language"
            id="language"
            left="left-[-0.6rem]"
            left-focus="group-focus-within/input:left-[-0.6rem]"
            v-model="language"
            :options="languages"
            class="mb-[5.25rem]"
          />

          <button
            type="submit"
            class="bg-black hover:bg-gray-800 w-full h-[2.75rem] text-white font-medium text-md leading-[1.33] transition-colors duration-[160] ease-in-out"
          >
            Update language
          </button>
        </form>
      </BaseModal>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
// Constants
import { languages } from '~/constants/languages';

const route = useRoute();

const language = ref<string>('en');

const isOpen = computed(() => {
  return typeof route.query.language === 'string';
});

function handleClose() {
  navigateTo({
    path: route.fullPath,
    query: {
      ...route.query,
      language: undefined,
    },
  });
}

function handleSubmit() {
  handleClose();
}
</script>
