<script setup lang="ts">
import type { SelectedProjectStatus } from '@/types';

interface Props {
    selectedValue: SelectedProjectStatus,
    optionsList: Array<SelectedProjectStatus>,
};

defineProps<Props>();

defineEmits(['update:selectedValue']);
</script>

<template>
<select 
    class="w-full sm:w-1/3 border p-1 text-sm focus:outline-none"
    :value="selectedValue" 
    @change="$emit('update:selectedValue', ($event.target as HTMLSelectElement).value as SelectedProjectStatus)"
>
    <option v-for="option of optionsList" :key="option">{{ option }}</option>
</select>
</template>

<style scoped>
</style>
