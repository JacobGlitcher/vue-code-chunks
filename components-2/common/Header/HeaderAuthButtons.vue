<template>
  <!-- <button v-if="!has_account"
    class="text-md xga:text-lg text-black font-normal hover:text-black-light-hover transition-colors duration-[160] ease-in-out"
    @click="handleAuth('signIn')">
    Sign In
  </button>

  <button v-if="!has_account"
    class="text-md xga:text-lg text-black font-normal hover:text-black-light-hover transition-colors duration-[160] ease-in-out"
    @click="handleAuth('signUp')">
    Sign Up
  </button>

  <button v-if="has_account" @click="handleSignout">
    <Icon name="logout" class="w-[1.25rem] h-[1.25rem] stroke-black" stroke-width="1.5" />
  </button> -->
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

// Store
import { useUserStore } from "~/store/user";

const route = useRoute();

const userStore = useUserStore();

const { has_account } = storeToRefs(userStore);

function handleAuth(auth = "signIn") {
  navigateTo({
    path: route.fullPath,
    query: {
      ...route.query,
      auth,
    },
  });
}

function handleSignout() {
  userStore.signOut();
}
</script>
