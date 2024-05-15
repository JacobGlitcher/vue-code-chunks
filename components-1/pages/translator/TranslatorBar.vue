<template>
  <form class="max-w-[24.5625rem] w-full" @submit.prevent="handleSubmit">
    <div class="flex flex-col w-full items-center justify-start">
      <BaseButton
        class="w-full p-[1.125rem] rounded-bl-none rounded-br-none"
        variant="secondary"
        type="button"
        @click="handleOpenLanguagesPicker('from')"
      >
        {{ translationState.from || 'Choose langauge' }}
      </BaseButton>
      <BaseInput class="w-full rounded-tr-none rounded-tl-none text-center py-[2.3125rem] mb-[2.375rem]" v-model="translatingWord" />
      <BaseButton
        class="p-[1.125rem] mb-[2.375rem] w-full !bg-dark-600"
        variant="secondary"
        type="button"
        @click="handleOpenLanguagesPicker('to')"
      >
        {{ translationState.to || 'Choose language' }}
      </BaseButton>
      <BaseButton class="p-[1.125rem] w-full" variant="primary" type="submit">
        Translate
      </BaseButton>
      <Modal
        v-if="!isMobile"
        :is-open="isModalOpen"
        position="center"
        content-class-name="!max-w-[68.75rem] bg-[#222222] rounded-lg"
        @close="handleCloseModal"
      >
        <ChooseLanguageModal
          :list="coreLanguages"
          @save="handleSave"
        />
      </Modal>
      <SwipeBar
        v-else
        label="language"
        :is-open="isSwipeBarOpen"
        @close="handleCloseSwipeBar"
      >
        <ChooseLanguageModal
          :list="coreLanguages"
          @save="handleSave"
        />
      </SwipeBar>
    </div>
  </form>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';

// Components
import Modal from '~/components-2-1/shared/Modal.vue';
import ChooseLanguageModal from './ChooseLanguageModal.vue';

// Store
import { useCoreStore } from '~/store/core';

// Types
import { CurrentOpenLanguagePickerType } from '~/types';

// Constants
import { mobileMediaQuery } from '~/constants';


const coreStore = useCoreStore();
const { getLanguages } = coreStore;
const { coreLanguages } = storeToRefs(coreStore);

const isMobile = useMedia(mobileMediaQuery);

const isModalOpen = ref(false);
const isSwipeBarOpen = ref(false);
const currentOpenLanguagePicker = ref<CurrentOpenLanguagePickerType>('from');
const translatingWord = ref('');
const translationState = reactive({
  from: '',
  to: '',
});

const emit = defineEmits(['translation-submit']);

const handleOpenModal = () => {
  isModalOpen.value = true;
};

const handleOpenLanguagesPicker = async (picker: CurrentOpenLanguagePickerType) => {
  currentOpenLanguagePicker.value = picker;
  if (!coreLanguages.value) {
    await getLanguages();
  }

  if (isMobile?.value) {
    handleOpenSwipeBar();
  } else {
    handleOpenModal();
  }
};
const handleCloseModal = () => {
  isModalOpen.value = false;
};

const handleOpenSwipeBar = () => {
  isSwipeBarOpen.value = true;
};

const handleCloseSwipeBar = () => {
  isSwipeBarOpen.value = false;
};

const handleSave = (language: string) => {
  translationState[currentOpenLanguagePicker.value] = language;
};

const handleSubmit = () => {
  emit('translation-submit', {
    word: translatingWord.value,
    from: translationState.from,
    to: translationState.to,
  });
};
</script>
