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
    class="border p-1 focus:outline-none"
    :value="selectedValue" 
    @change="$emit('update:selectedValue', ($event.target as HTMLSelectElement).value as SelectedProjectStatus)"
>
    <option v-for="option of optionsList" :key="option">{{ option }}</option>
</select>
</template>

<style scoped>
</style>
