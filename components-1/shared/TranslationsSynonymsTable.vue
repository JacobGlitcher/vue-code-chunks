<template>
  <div>
    <table class="w-full border-collapse">
      <thead class="font-medium text-white-700">
        <tr class="border-b-[0.0625rem] border-b-dark-600">
          <th class="text-start pt-7 pb-[1.125rem] pl-6">Translate</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item, index in data" :key="index" class="hover:bg-dark-600 border-b-[0.0625rem] border-b-dark-600 group">
          <td class="py-[1.125rem] text-start pl-6 pr-7 w-3/5">
            <div class="flex items-center justify-start min-h-[2.5rem]">
              <span class="mr-[6.8125rem]">{{ index + 1 }}</span>
              <span>{{ item }}</span>
              <div class="ml-auto hidden group-hover:inline-flex">
                <BaseButton class="py-[0.625rem] px-[1.375rem] mr-5" variant="secondary">
                  Find synonyms
                </BaseButton>
                <BaseButton class="py-[0.625rem] px-[1.375rem]" variant="primary">
                  Create Search
                </BaseButton>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  data: string[];
}>();
</script>