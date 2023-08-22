<script setup lang="ts">
interface Props {
    pagesCount: number,
};

defineProps<Props>();
</script>

<template>
<div>
    <div v-for="pageNumber of pagesCount" :key="pageNumber">{{ pageNumber }}</div>
</div>
</template>

<style scoped>
</style>
