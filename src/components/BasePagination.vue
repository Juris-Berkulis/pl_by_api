<script setup lang="ts">
interface Props {
    pagesCount: number,
    changePage: (newPageNumber: number) => void,
    page: number,
};

const props = defineProps<Props>();

const isShowPageBtn = (pageNumber: number): boolean => {
    return pageNumber === 1 
        || pageNumber === props.pagesCount 
        || props.page === pageNumber 
        || pageNumber - props.page === 1 
        || props.page - pageNumber === 1
};

const isShowEllipsisBetweenPages = (pageNumber: number): boolean => {
    return pageNumber - props.page === 2 || props.page - pageNumber === 2
};
</script>

<template>
<div class="w-full flex justify-center gap-4">
    <template v-for="pageNumber of pagesCount" :key="pageNumber">
        <button 
            class="p-2"
            :class="[page === pageNumber ? 'bg-sky-300' : 'bg-sky-200']"
            v-if="isShowPageBtn(pageNumber)"
            @click="changePage(pageNumber)"
            :data-page="pageNumber"
        >{{ pageNumber }}</button>
        <span v-else-if="isShowEllipsisBetweenPages(pageNumber)">...</span>
    </template>
</div>
</template>

<style scoped>
</style>
