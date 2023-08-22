<script setup lang="ts">
interface Props {
    pagesCount: number,
    changePage: (newPageNumber: number) => void
};

defineProps<Props>();
</script>

<template>
<div>
    <div v-for="pageNumber of pagesCount" :key="pageNumber" @click="changePage(pageNumber)">{{ pageNumber }}</div>
</div>
</template>

<style scoped>
</style>
