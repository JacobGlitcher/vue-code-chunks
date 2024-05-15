<template>
  <div class="-sm:h-[calc(100%-4.75rem)] overflow-y-auto">
    <h5 class="p-[1.125rem] text-center bg-dark-700 rounded-tl-lg rounded-tr-lg -sm:hidden">
      English
    </h5>
    <div class="pt-[0.625rem] px-[2.75rem] pb-[3.125rem] -sm:p-[0.375rem]">
      <div v-if="list" class="grid grid-rows-20 grid-cols-5 -sm:grid-cols-1 -sm:grid-rows-none gap-x-[2.9375rem]">
        <div v-for="item of list" :key="item">
          <label
            class="flex items-center justify-between px-4 py-[0.875rem] rounded-[0.375rem] hover:cursor-pointer hover:bg-dark-650"
            :class="{'bg-dark-650 hover:bg-dark-700': value.includes(item)}"
            :for="item"
          >
            <input class="hidden" type="radio" name="test" :id="item" :value="item" v-model="value" />
            <span>{{ item }}</span>
            <span v-if="value.includes(item)">
              <Icon name="checkmark" />
            </span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  list: string[] | null;
  value?: string[];
}>();

const emit = defineEmits(['save', 'cancel']);

const value = ref<string[]>(props.value || []);

watch(value, (newValue) => {
  emit('save', newValue);
});
</script>