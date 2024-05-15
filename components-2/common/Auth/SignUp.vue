<template>
  <div class="absolute right-0 md:py-[0.438rem] md:px-[0.375rem] w-full md:w-[42.5rem] h-full">
    <div class=" content rounded-[0.125rem] w-full h-full overflow-y-auto bg-white scroll">
      <div class="p-[1.25rem] py-[0.938rem] md:py-[2.5rem] md:p-[2.5rem] w-full flex flex-col items-start">
        <NuxtLink
          :to="{ path: route.fullPath, query: { ...route.query, auth: 'signIn' } }"
          aria-label="Go back to login"
          class="md:hidden flex items-center justify-center mb-[2rem]"
        >
          <Icon
            name="arrow-left-line"
            class="w-[1.25rem] h-[1.25rem] stroke-black"
          />
        </NuxtLink>

        <h2 class="text-[1.5rem] font-light text-black mb-[2rem] md:mb-[2.938rem]">
          Become a <b class="font-medium">SHOPLINKS</b> member.
        </h2>

        <div class="w-full flex flex-col items-start mb-[2rem] md:mb-[2.938rem]">
          <span class="text-gray-300 font-light text-lg mb-[0.375rem]">
            Are you already member?
          </span>

          <NuxtLink
            :to="{ path: route.fullPath, query: { ...route.query, auth: 'signIn' } }"
            class="text-lg text-black font-medium underline  hover:text-black-light-hover transition-colors duration-[160] ease-in-out"
          >
            Sign In
          </NuxtLink>
        </div>

        <form
          class="w-full flex items-start flex-col"
          @submit.prevent="handleSubmit"
        >
          <div
            :class="`${isButtonFixed ? 'mb-[5rem] md:mb-[3.5rem]' : 'mb-[3.5rem] md:mb-[2.75rem]'}`"
            class="flex w-full flex-col gap-y-[1.875rem]"
          >
            <div class="relative w-full">
              <span class="text-sm leading-[0.998rem] font-normal text-[rgb(51,51,51)] pointer-events-none full-hd:text-[0.875rem] full-hd:leading-[1.254rem]">
                Title*
              </span>

              <div class="w-full flex flex-wrap mt-[0.5rem] border-t-[#ccc] border-l-[#ccc] border-t-[0.063rem] border-l-[0.063rem]">
                <div
                  v-for="title in titleVariants"
                  :key="title.id"
                  class="p-[1rem] w-[50%] flex items-center border-b-[#ccc] border-r-[#ccc] border-b-[0.063rem] border-r-[0.063rem]"
                >
                  <Radio
                    :id="title.id"
                    :value="title.id"
                    :label="title.name"
                    v-model="signUpData.title"
                  />
                </div>
              </div>

              <Transition name="fade">
                <p
                  v-if="v$.$dirty ? v$.firstName.$errors[0]?.$message : null"
                  role="alert"
                  class="absolute z-component top-[100%] left-0 text-lg font-normal text-error mt-[0.5rem] leading-[1.429] full-hd:text-xl full-hd:leading-[1.5rem"
                >
                  {{ v$.firstName.$errors[0].$message }}
                </p>
              </Transition>
            </div>

            <BaseInput
              id="first-name"
              name="first-name"
              placeholder="First name*"
              left="left-[-0.4rem]"
              left-focus="group-focus-within/input:left-[-0.4rem]"
              :error="v$.$dirty ? v$.firstName.$errors[0]?.$message : null"
              v-model="signUpData.firstName"
              @blur="v$.firstName.$touch()"
            />

            <BaseInput
              id="last-name"
              name="last-name"
              placeholder="Last name*"
              left="left-[-0.4rem]"
              left-focus="group-focus-within/input:left-[-0.4rem]"
              :error="v$.$dirty ? v$.lastName.$errors[0]?.$message : null"
              v-model="signUpData.lastName"
              @blur="v$.lastName.$touch()"
            />

            <BaseInput
              id="email"
              name="email"
              type="email"
              placeholder="Email *"
              :error="v$.$dirty ? v$.email.$errors[0]?.$message : null"
              v-model="signUpData.email"
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
              v-model="signUpData.password"
              @blur="v$.password.$touch()"
            />
          </div>

          <div
            :class="`${isButtonFixed ? 'absolute z-component bottom-0 left-0 px-[1.25rem] pb-[1rem] md:px-[2.5rem]' : ''}`"
            class="w-full"
          >
            <button
              ref="submitButton"
              type="submit"
              class="bg-black hover:bg-gray-800 w-full h-[2.75rem] text-white font-medium text-md leading-[1.33] transition-colors duration-[160] ease-in-out"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useVuelidate from '@vuelidate/core';
import { email, helpers, maxLength, minLength, required } from '@vuelidate/validators';

// Store
import { useUserStore } from '~/store/user';

// Constants
import {
  minValidationLength,
  passwordRegexp,
  requiredMessage,
  emailMessage,
  minLengthMessage,
  passwordMessage,
  maxLengthMessage,
  validationLength,
} from '~/constants';
import { titleVariants } from '~/constants/titleVariants';

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

const submitButton = ref<HTMLButtonElement | null>(null);
const isButtonFixed = ref<boolean>(false);

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

const v$ = useVuelidate(rules, signUpData);

onMounted(() => {
  handleCheckSubmitButtonHeight();

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

function handleSubmit() {
  if (v$.value.$invalid) {
    v$.value.$touch();
    return;
  }

  // TODO: await for request
  userStore.signUp(signUpData);

  navigateTo({
    path: route.fullPath,
    query: {
      ...route.query,
      auth: 'verifyEmail',
      email: signUpData.email,
    },
  });
}

function handleCheckSubmitButtonHeight() {
  if (!submitButton.value) {
    return;
  }

  const screenHeight = window.innerHeight;
  const rect = submitButton.value.getBoundingClientRect();
  const offsetTop = submitButton.value.offsetTop + rect.height;

  isButtonFixed.value = offsetTop > screenHeight;
}
</script>
