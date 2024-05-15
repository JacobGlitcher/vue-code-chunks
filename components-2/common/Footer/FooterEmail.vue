<template>
  <form class="relative w-full" @submit.prevent="handleSubmit">
    <BaseInput
      type="email"
      id="email-footer"
      placeholder="Email"
      name="email"
      left="left-0"
      left-focus="group-focus-within/input:left-0"
      top="translate-y-[calc(100%+0.1rem)]"
      scale="scale-1"
      scale-focus="group-focus-within/input:scale-1"
      error-class="!text-sm"
      placeholder-class="!text-[0.75rem]"
      input-class="pr-[2rem] !pt-[0.063rem] !pb-[0.125rem] !h-[1.438rem] !text-xl lg:!text-[0.75rem]"
      :error="v$.$dirty ? v$.email.$errors[0]?.$message : null"
      v-model="emailData.email"
      @blur="v$.email.$touch()"
    >
      <template #icon>
        <Transition name="fade">
          <button
            v-if="email"
            type="submit"
            aria-label="Continue sign up"
            class="absolute z-component right-0 py-[0.5rem] flex items-center justify-center"
          >
            <Icon
              name="arrow-right-long-line-solid"
              class="w-[1.25rem] h-[1.25rem] stroke-black"
            />
          </button>
        </Transition>
      </template>
    </BaseInput>
  </form>
</template>

<script setup lang="ts">
import useVuelidate from "@vuelidate/core";
import { email, helpers, required } from "@vuelidate/validators";
import { emailMessage, requiredMessage } from "~/constants";

const route = useRoute();

const emailData = reactive({
  email: "",
});

const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage(requiredMessage, required),
      email: helpers.withMessage(emailMessage, email),
    },
  };
});

const v$ = useVuelidate(rules, emailData);

function handleSubmit() {
  if (v$.value.$invalid) {
    v$.value.$touch();
    return;
  }

  navigateTo({
    path: route.fullPath,
    query: {
      ...route.query,
      auth: "signUp",
      email: emailData.email,
    },
  });
}
</script>
