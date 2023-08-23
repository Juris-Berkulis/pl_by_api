<script setup lang="ts">
interface Props {
    inputValue: string,
};

defineProps<Props>();

defineEmits(['update:inputValue']);
</script>

<template>
<input 
    class="w-full sm:w-1/2 px-2 py-1 border text-sm focus:outline-none" 
    :value="inputValue" 
    @input="$emit('update:inputValue', ($event.target as HTMLInputElement).value)" 
    type="text"
    placeholder="Заголовок"
>
</template>

<style scoped>
</style>
