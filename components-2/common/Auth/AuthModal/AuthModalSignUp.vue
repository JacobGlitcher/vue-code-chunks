<template>
  <div class="w-full lg:w-[60%] mx-auto flex items-start flex-col lg:mt-0 mt-[3rem]">
    <h2
      class="w-full text-center text-lg leading-[1.25rem] font-medium mb-[1.5rem] full-hd:text-[1rem] full-hd:leading-[1.5rem]">
      SIGN UP
    </h2>

    <form class="w-full flex flex-col" @submit.prevent="handleSubmit">
      <div class="relative w-full mb-[1.25rem]">
        <span
          class="text-sm leading-[0.998rem] font-normal text-[rgb(51,51,51)] pointer-events-none full-hd:text-[0.875rem] full-hd:leading-[1.254rem]">
          Title*
        </span>

        <div
          class="w-full flex flex-wrap mt-[0.5rem] border-t-[#ccc] border-l-[#ccc] border-t-[0.063rem] border-l-[0.063rem]">
          <div v-for="title in titleVariants" :key="title.id"
            class="p-[1rem] w-[50%] flex items-center border-b-[#ccc] border-r-[#ccc] border-b-[0.063rem] border-r-[0.063rem]">
            <Radio :id="title.id" :value="title.id" :label="title.name" v-model="signUpData.title" />
          </div>
        </div>

        <Transition name="fade">
          <p v-if="v$.$dirty ? v$.firstName.$errors[0]?.$message : null" role="alert"
            class="absolute z-component top-[100%] left-0 text-lg font-normal text-error mt-[0.5rem] leading-[1.429] full-hd:text-xl full-hd:leading-[1.5rem">
            {{ v$.firstName.$errors[0].$message }}
          </p>
        </Transition>
      </div>

      <BaseInput id="first-name" name="first-name" placeholder="First name*" left="left-[-0.4rem]"
        left-focus="group-focus-within/input:left-[-0.4rem]" wrapper-class="mb-[2.25rem]"
        :error="v$.$dirty ? v$.firstName.$errors[0]?.$message : null" v-model="signUpData.firstName"
        @blur="v$.firstName.$touch()" />

      <BaseInput id="last-name" name="last-name" placeholder="Last name*" left="left-[-0.4rem]"
        left-focus="group-focus-within/input:left-[-0.4rem]" wrapper-class="mb-[2.25rem]"
        :error="v$.$dirty ? v$.lastName.$errors[0]?.$message : null" v-model="signUpData.lastName"
        @blur="v$.lastName.$touch()" />

      <BaseInput id="sign-up-email" name="email" type="email" placeholder="Your email*" left="left-[-0.35rem]"
        left-focus="group-focus-within/input:left-[-0.35rem]" wrapper-class="mb-[2.25rem]"
        :error="v$.$dirty ? v$.email.$errors[0]?.$message : null" v-model="signUpData.email" @blur="v$.email.$touch()" />

      <BaseInput id="sign-up-password" name="password" type="password" placeholder="Create password*"
        left="left-[-0.55rem]" left-focus="group-focus-within/input:left-[-0.55rem]" wrapper-class="mb-[2.25rem]" show-eye
        :error="v$.$dirty ? v$.password.$errors[0]?.$message : null" v-model="signUpData.password"
        @blur="v$.password.$touch()" />

      <div class="mb-[1.5rem] flex items-start w-full">
        <Checkbox v-model="signUpData.email_marketing" button-class="!w-[1.125rem] !h-[1.125rem]"
          wrapper-class="mt-[0.2rem] mr-[0.5rem]" />

        <p class="text-lg font-light leading-[1.25rem] text-black">
          Subscribe to receive email updates about Burberry products, services and events. When you subscribe, you confirm
          you have read Burberry's <NuxtLink to="/privacy-policy" class="underline">Privacy Policy</NuxtLink>. You may opt
          out at any time by using the unsubscribe link in the emails. You provide your personal information voluntarily
          and Burberry can only send you updates with your consent.
        </p>
      </div>

      <p class="mb-[1.5rem] text-sm leading-[0.998rem] text-[rgb(102,102,102)] font-light">
        Your personal information will be managed by Burberry Limited, with its company address at Horseferry House,
        Horseferry Road, London SW1P 2AW and may be stored outside your country of residence (including in the U.K.,
        Europe and USA). Burberry uses your personal information to offer an enhanced customer service tailored to your
        preferences and may share your personal information with Burberry group companies and third parties who support
        Burberry in providing products and services to you on Burberry’s behalf. By continuing, you confirm you have read
        our <NuxtLink to="/privacy-policy" class="underline">Privacy Policy</NuxtLink> and, where consent is required
        under local laws, you agree to the use of your personal information as described in our <NuxtLink
          to="/privacy-policy" class="underline">Privacy Policy</NuxtLink>, including in relation to the transfer and
        storage of your personal information outside your country of residence.
      </p>

      <button type="submit"
        class="w-full bg-black text-white text-sm font-medium h-[2.75rem] full-hd:h-[3rem] full-hd:text-lg hover:bg-gray-800 transition-colors ease-in-out duration-[160]">
        CREATE AN ACCOUNT
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core';
import { email, helpers, maxLength, minLength, required } from '@vuelidate/validators';

// Store
import { useUserStore } from '~/store/user';

// Constants
import {
  emailMessage,
  maxLengthMessage,
  minLengthMessage,
  minValidationLength,
  passwordMessage,
  passwordRegexp,
  requiredMessage,
  validationLength,
} from '~/constants';
import { titleVariants } from '~/constants/titleVariants';

const emit = defineEmits(['close']);

const route = useRoute();

const userStore = useUserStore();

const signUpData = reactive({
  title: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  email_marketing: false,
});

const rules = computed(() => {
  return {
    title: {
      required: helpers.withMessage(requiredMessage, required),
    },
    firstName: {
      required: helpers.withMessage(requiredMessage, required),
      maxLength: helpers.withMessage(maxLengthMessage.name, maxLength(validationLength.name)),
    },
    lastName: {
      required: helpers.withMessage(requiredMessage, required),
      maxLength: helpers.withMessage(maxLengthMessage.name, maxLength(validationLength.name)),
    },
    email: {
      required: helpers.withMessage(requiredMessage, required),
      email: helpers.withMessage(emailMessage, email),
    },
    password: {
      required: helpers.withMessage(requiredMessage, required),
      minLength: helpers.withMessage(minLengthMessage.base, minLength(minValidationLength.base)),
      password: helpers.withMessage(passwordMessage, (value: string) => value.length === 0 ? true : passwordRegexp.test(value)),
    },
  };
});

onMounted(() => {
  const email = route.query.email;

  if (typeof email === 'string') {
    signUpData.email = email;

    navigateTo({
      path: route.fullPath,
      query: {
        ...route.query,
        email: undefined,
      },
      replace: true,
    });
  }
});

const v$ = useVuelidate(rules, signUpData);

function handleSubmit() {
  if (v$.value.$invalid) {
    v$.value.$touch();
    return;
  }

  // TODO: await for request
  userStore.signUp(signUpData);

  handleClose();
}

function handleClose() {
  navigateTo({
    path: route.fullPath,
    query: {
      ...route.query,
      auth: undefined,
    },
  });
}
</script>
