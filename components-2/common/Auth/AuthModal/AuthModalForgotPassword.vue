<template>
  <div class="mx-auto w-full lg:w-[50%] flex items-start flex-col">
    <h2 class="w-full text-center text-lg leading-[1.25rem] font-medium xga:text-xl">
      FORGOT PASSWORD
    </h2>

    <div v-if="tab === 'form'" class="w-full mt-[5.938rem]">
      <p class="mb-[1.25rem] text-black text-xl leading-[1.5rem] font-normal">
        Enter your email and we will send details on how to reset your password.
      </p>

      <form class="w-full" @submit.prevent="handleSubmit">
        <BaseInput id="email" name="email" type="email" placeholder="Your email*"
          :error="v$.$dirty ? v$.email.$errors[0]?.$message : null" v-model="forgotPasswordData.email"
          @blur="v$.email.$touch()" />

        <button type="submit"
          class="mt-[4.563rem] w-full bg-black text-white text-sm font-medium h-[2.75rem] full-hd:text-lg hover:bg-gray-800 transition-colors ease-in-out duration-[160] uppercase">
          Send
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core';
import { email, helpers, required } from '@vuelidate/validators';

// Store
import { useUserStore } from '~/store/user';

// Constants
import { emailMessage, requiredMessage } from '~/constants';

const userStore = useUserStore();

const tab = ref<string>('form');
const isResent = ref<boolean>(false);

const route = useRoute();

const forgotPasswordData = reactive({
  email: '',
});

const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage(requiredMessage, required),
      email: helpers.withMessage(emailMessage, email),
    },
  };
});

const v$ = useVuelidate(rules, forgotPasswordData);

function handleSubmit() {
  if (v$.value.$invalid) {
    v$.value.$touch();
    return;
  }

  userStore.forgotPassword(forgotPasswordData);

  navigateTo({
    path: route.fullPath,
    query: {
      ...route.query,
      auth: 'resetPassword',
      email: forgotPasswordData.email,
    },
  });
}


function handleSubmit2() {
  if (v$.value.$invalid) {
    v$.value.$touch();
    return;
  }

  userStore.resetPassword(forgotPasswordData);

  handleThankYou();
}

function handleResend() {
  if (v$.value.$invalid) {
    return;
  }

  userStore.forgotPassword(forgotPasswordData);

  isResent.value = true;
}

function handleThankYou() {
  tab.value = 'thankYou';
}

function handleContact() {
  tab.value = 'contact';
}
</script>
