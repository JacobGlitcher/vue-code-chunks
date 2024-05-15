<template>
  <div class="absolute right-0 md:py-[0.438rem] md:px-[0.375rem] w-full md:w-[42.5rem] h-full">
    <div class="content rounded-[0.125rem] w-full h-full overflow-y-auto bg-white scroll">
      <div class="p-[1.25rem] py-[0.938rem] md:py-[2.5rem] md:p-[2.5rem] w-full flex flex-col items-start">
        <NuxtLink
          :to="{ path: route.fullPath, query: { ...route.query, auth: undefined } }"
          aria-label="Close login"
          class="md:hidden flex items-center justify-center mb-[2rem]"
        >
          <Icon
            name="arrow-left-line"
            class="w-[1.25rem] h-[1.25rem] stroke-black"
          />
        </NuxtLink>

        <h2 class="text-[1.5rem] font-light text-black mb-[2rem] md:mb-[2.938rem]">
          Welcome to ShopLinks,<br>
          <b class="font-medium">Sign In</b> to Continue.
        </h2>

        <div class="w-full flex flex-col items-start mb-[2rem] md:mb-[2.938rem]">
          <span class="text-gray-300 font-light text-lg mb-[0.375rem]">
            Don’t have an account?
          </span>

          <NuxtLink
            :to="{ path: route.fullPath, query: { ...route.query, auth: 'signUp' } }"
            class="text-lg text-black font-medium underline hover:text-black-light-hover transition-colors duration-[160] ease-in-out"
          >
            Create an account
          </NuxtLink>
        </div>

        <form
          class="w-full flex items-start flex-col"
          @submit.prevent="handleSubmit"
        >
          <div class="mb-[0.875rem] flex w-full flex-col gap-y-[1.875rem]">
            <BaseInput
              id="email"
              name="email"
              type="email"
              placeholder="Email *"
              :error="v$.$dirty ? v$.email.$errors[0]?.$message : null"
              v-model="signInData.email"
              @blur="v$.email.$touch()"
            />

            <BaseInput
              id="password"
              name="password"
              type="password"
              placeholder="Password *"
              show-eye
              left="left-[-0.35rem]"
              left-focus="group-focus-within/input:left-[-0.35rem]"
              :error="v$.$dirty ? v$.password.$errors[0]?.$message : null"
              v-model="signInData.password"
              @blur="v$.password.$touch()"
            />
          </div>

          <div class="relative w-full flex items-start mt-[2.5rem] md:mt-[1.5rem] mb-[2.5rem] md:mb-[2.75rem]">
            <NuxtLink
              :to="{ path: route.fullPath, query: { ...route.query, auth: 'forgotPassword' } }"
              class="absolute z-component top-0 right-0 ml-auto text-gray-300 text-lg font-medium"
            >
              Forgot password
            </NuxtLink>
          </div>

          <button
            type="submit"
            class="bg-black hover:bg-gray-800 w-full h-[2.75rem] text-white font-medium text-md leading-[1.33] transition-colors duration-[160] ease-in-out"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core';
import { email, helpers, minLength, required } from '@vuelidate/validators';

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

const emit = defineEmits(['close']);

const route = useRoute();

const userStore = useUserStore();

const signInData = reactive({
  email: '',
  password: '',
});

const rules = computed(() => {
  return {
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

const v$ = useVuelidate(rules, signInData);

function handleSubmit() {
  if (v$.value.$invalid) {
    v$.value.$touch();
    return;
  }

  // TODO: await for request
  userStore.signIn(signInData);

  emit('close');
}
</script>
