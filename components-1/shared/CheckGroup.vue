<template>
  <div>
    <ul>
      <li v-for="item in list" :key="item">
        <label
          class="flex items-center justify-between px-4 py-[0.875rem] rounded-[0.375rem] hover:cursor-pointer hover:bg-dark-650"
          :class="{'bg-dark-650 hover:bg-dark-700': value.includes(item)}"
          :for="item"
        >
          <input class="hidden" type="checkbox" name="test" :id="item" :value="item" v-model="value" />
          <span>{{ item }}</span>
          <span v-if="value.includes(item)">
            <Icon name="checkmark" />
          </span>
        </label>
      </li>
    </ul>
    <div class="flex items-center justify-end mt-2 px-[1.25rem] -sm:px-0">
      <BaseButton v-if="withCancelButton" class="py-[0.625rem] px-[1.375rem] font-semibold text-[#787878]" type="button" @click="$emit('cancel')">Cancel</BaseButton>
      <BaseButton class="py-[0.625rem] px-[1.375rem] font-bold" variant="primary" type="button" @click="$emit('save', value)">Save</BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  list: string[];
  value?: string[];
  withCancelButton?: boolean
}>();

defineEmits(['save', 'cancel']);

const value = ref<string[]>(props.value || []);
</script>