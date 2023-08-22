<script setup lang="ts">
interface Props {
    inputValue: string,
};

defineProps<Props>();

defineEmits(['update:inputValue']);
</script>

<template>
<input 
    class="border px-2 py-1 text-sm focus:outline-none" 
    :value="inputValue" 
    @input="$emit('update:inputValue', ($event.target as HTMLInputElement).value)" 
    type="text"
>
</template>

<style scoped>
</style>
