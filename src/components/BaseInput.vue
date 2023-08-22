<script setup lang="ts">
interface Props {
    inputValue: string,
};

defineProps<Props>();

defineEmits(['update:inputValue']);
</script>

<template>
<input type="text" :value="inputValue" @input="$emit('update:inputValue', ($event.target as HTMLInputElement).value)">
</template>

<style scoped>
</style>
