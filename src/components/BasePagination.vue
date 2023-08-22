<script setup lang="ts">
interface Props {
    pagesCount: number,
    changePage: (newPageNumber: number) => void
};

defineProps<Props>();
</script>

<template>
<div class="w-full flex justify-center gap-4">
    <button 
        class="p-2 bg-sky-200"
        v-for="pageNumber of pagesCount" 
        :key="pageNumber" 
        @click="changePage(pageNumber)"
    >{{ pageNumber }}</button>
</div>
</template>

<style scoped>
</style>
