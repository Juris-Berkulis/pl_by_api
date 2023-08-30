<script setup lang="ts">
import type { SelectedProjectStatus } from '@/types';

type Option = SelectedProjectStatus | number;

interface Props {
    selectedValue: Option,
    optionsList: Array<Option>,
    resetPage: () => void,
};

const props = defineProps<Props>();

const emit = defineEmits(['update:selectedValue']);

const changeSelectedValue = (event: Event) => {
    props.resetPage();
    emit('update:selectedValue', <Option>(event.target as HTMLSelectElement).value);
};
</script>

<template>
<select 
    class="w-full sm:w-1/3 border p-1 text-sm focus:outline-none"
    :value="selectedValue" 
    @change="changeSelectedValue"
>
    <option v-for="option of optionsList" :key="option" :data-option="option">{{ option }}</option>
</select>
</template>

<style scoped>
</style>
