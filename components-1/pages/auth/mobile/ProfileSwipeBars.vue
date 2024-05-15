<template>
  <SwipeBar
    label="Findr"
    :is-open="!!profileState"
    @close="handleCloseProfileModal"
    class="z-[500]"
  >
    <template #header>
      <div class="px-[1.375rem] py-7 border-b-dark-700 border-b-[0.0625rem] flex flex-col items-start justify-start">
        <h4 class="text-white-900 mb-2 text-[0.9375rem]">
          {{ profileState === 'settings' ? 'Settings' : 'Change password' }}
        </h4>
        <h5 class="text-white-700 text-[0.9375rem] font-medium">customer@gmail.com</h5>
      </div>
    </template>
    <div class="px-3 py-9">
      <SettingsModal v-if="profileState === 'settings'" />
      <ChangePasswordModal v-if="profileState === 'changepassword'" />
    </div>
    <template v-if="profileState === 'settings'">
      <div class="px-3">
        <BaseButton class="text-white-900 py-6 px-7 flex items-center justify-start w-full" variant="secondary" @click="handleChangePasswordClick">
          <Icon class="mr-7" name="lock" />
          <span>Change password</span>
          <Icon class="ml-auto" name="chevron-right" />
        </BaseButton>
      </div>
    </template>
  </SwipeBar>
</template>

<script setup lang="ts">
// Components
import SettingsModal from '../../profile/SettingsModal.vue';
import ChangePasswordModal from '../../profile/ChangePasswordModal.vue';


defineProps<{
  profileState?: string;
  isOpen?: boolean;
}>();

const emit = defineEmits(['close', 'change-password-click']);

const handleCloseProfileModal = () => {
  emit('close');
};

const handleChangePasswordClick = () => {
  emit('change-password-click');
};
</script>