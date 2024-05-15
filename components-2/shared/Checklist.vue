<template>
  <ul>
    <li v-for="item in list" :key="item">
      <input class="mr-1" type="checkbox" v-model="value">
      <span>{{ item }}</span>
    </li>
  </ul>
</template>

<script setup lang="ts">
const props = defineProps<{
  list: string[];
}>();

const emit = defineEmits(['change']);

const value = ref([]);

watch(value, () => {
  emit('change', value.value);
}, {
  deep: true,
});
</script>