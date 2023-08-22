<script setup lang="ts">
import { ref, type Ref, computed, type ComputedRef } from 'vue';
import ProjectsList from '@/components/ProjectsList.vue';
import ProjectsListEmpty from '@/components/ProjectsListEmpty.vue'
import BaseLoader from '@/components/BaseLoader.vue';
import BasePagination from '@/components/BasePagination.vue';
import { type Project } from '@/types/index';

interface FetchResult {
    count: number,
    results: Project[],
};

const projectsList: Ref<Array<Project>> = ref([]);
const projectsCounr: Ref<number> = ref(0);
const page: Ref<number> = ref(1);
const projectsCountInEachPage: number = 10;
const isLoading: Ref<boolean> = ref(false);

const pagesCount: ComputedRef<number> = computed(() => {
    const fullPagesCount: number = projectsCounr.value / projectsCountInEachPage;
    return projectsCounr.value % projectsCountInEachPage === 0 ? fullPagesCount : fullPagesCount + 1
});

const fetchProjectsList = async () => {
    isLoading.value = true;
    try {
        const response: Response = await fetch(`https://dev.aicap.tech/api/v1/interview/projects?page=${page.value}`);
        if (response.ok) {
            const fetchResult: FetchResult = await response.json();
            projectsList.value = fetchResult.results;
            projectsCounr.value = fetchResult.count;
            console.log(projectsList.value)
        } else {
            throw 'Ошибка при запросе'
        }
    } catch (error) {
        console.log(error);
    } finally {
        isLoading.value = false;
    }
};

fetchProjectsList();
</script>

<template>
<div>
    <BaseLoader v-if="isLoading" />
    <ProjectsList v-else-if="projectsList.length" :projectsList="projectsList" />
    <ProjectsListEmpty v-else />
    <BasePagination :pagesCount="pagesCount" />
</div>
</template>

<style scoped>
</style>
