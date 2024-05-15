<template>
  <Accordion
    class="w-full py-[1.75rem] px-[1.25rem] sm:px-0 border-t-[#ECECEC] border-t-[0.063rem]"
    icon-class="stroke-black w-[0.938rem] h-[0.938rem]"
    id="sort_by"
    :open="open"
    @toggle="handleToggle"
  >
    <template #default>
      <h3 class="text-xl font-medium text-black">Sort by</h3>
    </template>

    <template #content>
      <div class="flex flex-col w-full mt-[1.375rem] gap-y-[1.5rem]">
        <Radio
          v-for="sortOption in sortOptions"
          :key="sortOption.value"
          :id="`sort-${sortOption.value}`"
          :value="sortOption.value"
          :label="sortOption.name"
          v-model="sortBy"
        />
      </div>
    </template>
  </Accordion>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";

// Store
import { useFilterStore } from "~/store/filter";

const emit = defineEmits(["change"]);

const filterStore = useFilterStore();

const { sortOptions, sorting } = storeToRefs(filterStore);

const open = ref<boolean>(true);
const sortBy = ref<string>(sorting.value);

watch(sortBy, (value) => {
  handleChange(value);
});

function handleToggle() {
  open.value = !open.value;
}

function handleChange(sort: string) {
  emit("change", {
    key: "sorting",
    value: sort,
  });
}
</script>
