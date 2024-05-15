<template>
  <div class="mx-auto w-full lg:w-[50%] flex items-start flex-col">
    <h2 class="w-full text-center text-lg leading-[1.25rem] font-medium xga:text-xl">
      FORGOT PASSWORD
    </h2>

    <div v-if="tab === 'contact'" class="w-full mt-[3.434rem]">
      <div class="flex items-center mb-[1.5rem]">
        <button aria-label="Back" @click="handleBack">
          <Icon name="arrow-left-line-alt" class="stroke-black w-[1rem] h-[1rem] ml-[0.313rem]" stroke-width="2" />
        </button>

        <span class="ml-[1.125rem] text-xl leading-[1.5rem] font-medium text-black">
          CAN WE HELP YOU?
        </span>
      </div>

      <span class="inline-block mb-[0.5rem] leading-[1.5rem] font-medium text-xl">
        Telephone
      </span>

      <div class="tracking-[0.3px] mb-[1.5rem] text-xl font-normal leading-[1.5rem] text-black">
        <span>
          Burberry offers worldwide assistance 24 hours a day, seven days a week. Please note, we may monitor or record
          your communications for training and quality control purposes.
        </span>

        <ul class="mt-[1.5rem]">
          <li>0800 279 4998</li>
          <li>0203 402 1444</li>
        </ul>
      </div>

      <h3 class="mb-[0.5rem] text-xl leading-[1.5rem] font-medium text-black">
        Email
      </h3>

      <a href="mailto:customerservice@burberry.com"
        class="underline inline-block mb-[1.5rem] text-xl leading-[1.5rem] font-normal text-black hover:text-gray-800 transition-colors duration-[160] ease-in-out">
        customerservice@burberry.com
      </a>

      <h3 class="mb-[0.5rem] text-xl leading-[1.5rem] font-medium text-black">
        Twitter
      </h3>

      <a href="mailto:customerservice@burberry.com"
        class="underline inline-block mb-[1.5rem] text-xl leading-[1.5rem] font-normal text-black hover:text-gray-800 transition-colors duration-[160] ease-in-out">
        @BurberryService
      </a>
    </div>
    <div v-else class="w-full mt-[6.75rem] pb-[1rem]">
      <p class="text-[1.5rem] mb-[1.5rem] leading-[1.995rem] font-medium text-black">
        We've sent an email to {{ route.query.email }}
      </p>

      <form class="w-full mb-[1.5rem]" @submit.prevent="handleSubmit">
        <div class="mb-[3.5rem] md:mb-[2.75rem] flex w-full flex-col gap-y-[1.875rem]">
          <BaseInput id="token" name="token" type="text" placeholder="Token" left="left-[-0.425rem]"
            left-focus="group-focus-within/input:left-[-0.425rem]"
            :error="v$.$dirty ? v$.token.$errors[0]?.$message : null" v-model="resetPasswordData.token"
            @focus="v$.token.$touch()" />

          <BaseInput id="password" name="password" type="password" placeholder="New password" left="left-[-0.425rem]"
            left-focus="group-focus-within/input:left-[-0.425rem]"
            :error="v$.$dirty ? v$.password.$errors[0]?.$message : null" v-model="resetPasswordData.password"
            @focus="v$.password.$touch()" />
        </div>

        <button type="submit"
          class="bg-black hover:bg-gray-800 w-full h-[2.75rem] text-white font-medium text-md leading-[1.33] transition-colors duration-[160] ease-in-out">
          Continue
        </button>
      </form>

      <div class="text-xl mb-[1.5rem] leading-[1.5rem] font-normal text-black-lighter flex flex-col w-full">
        <span>If you still have problems signing in, <button class="underline" @click="handleContact">Contact
            Us.</button></span>
      </div>

      <Transition name="fade">
        <p v-if="isResent" class="mt-[0.5rem] text-[#1A8000] text-xl leading-[1.5rem] font-normal">
          A new email has been sent to you.
        </p>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core';
import { helpers, minLength, required, email } from '@vuelidate/validators';

// Store
import { useUserStore } from '~/store/user';

// Constants
import {
  emailMessage,
  minLengthMessage,
  minValidationLength,
  passwordMessage,
  passwordRegexp,
  requiredMessage,
} from '~/constants';

const userStore = useUserStore();

const tab = ref<string>('form');
const isResent = ref<boolean>(false);

const route = useRoute();

const resetPasswordData = reactive({
  token: '',
  password: '',
  email: <string>route.query.email,
});

const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage(requiredMessage, required),
      email: helpers.withMessage(emailMessage, email),
    },
    token: {
      required: helpers.withMessage(requiredMessage, required),
    },
    password: {
      required: helpers.withMessage(requiredMessage, required),
      minLength: helpers.withMessage(minLengthMessage.base, minLength(minValidationLength.base)),
      password: helpers.withMessage(passwordMessage, (value: string) => value.length === 0 ? true : passwordRegexp.test(value)),
    },
  };
});

const v$ = useVuelidate(rules, resetPasswordData);

function handleSubmit() {
  if (v$.value.$invalid) {
    v$.value.$touch();
    return;
  }

  userStore.resetPassword({
    email: resetPasswordData.email,
    password: resetPasswordData.password,
    token: resetPasswordData.token,
  });

  navigateTo({
    path: route.fullPath,
    query: {
      ...route.query,
      auth: undefined,
      email: undefined,
    },
  });
}
function handleBack() {
  tab.value = '';
}
function handleContact() {
  tab.value = 'contact';
}
</script>
