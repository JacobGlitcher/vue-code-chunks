<template>
  <div class="flex items-center justify-start flex-wrap bg-[#2F2F2F] rounded-lg py-3 px-[1.125rem]">
    <Badge v-for="tag in tags" :key="tag" class="mr-2">
      {{ tag }}
    </Badge>
    <input class="bg-transparent outline-none flex-1 w-[6.25rem]" type="text" v-model="value">
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  value: string[];
}>();

const emit = defineEmits(['change']);

const value = ref('');
const tags = ref<string[]>(props.value || []);

watch(value, (nextValue, prevValue) => {
  if (prevValue.trim().length && nextValue.endsWith(' ')) {
    tags.value.push(value.value);
    emit('change', tags.value);
    value.value = '';
  }
  // TODO add delete by backspace
});
</script>