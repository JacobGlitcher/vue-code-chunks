<template>
  <span class="flex items-center justify-start text-white-950 ">
    <Icon class="text-white-600 mr-[0.625rem] block" name="timer" />
    <span>00:0{{ passedTime }}</span>
  </span>
</template>

<script setup lang="ts">
const passedTime = ref(0);

let passedTimeInterval: any;
onMounted(() => {
  passedTimeInterval = setInterval(() => {
    passedTime.value++;
  }, 1000);
});

onUnmounted(() => {
  clearInterval(passedTimeInterval);
});
</script>