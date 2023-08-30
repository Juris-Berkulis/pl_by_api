<script setup lang="ts">
import { ref, type Ref, computed, type ComputedRef, watchEffect } from 'vue';
import ProjectsList from '@/components/ProjectsList.vue';
import ProjectsListEmpty from '@/components/ProjectsListEmpty.vue'
import BaseLoader from '@/components/BaseLoader.vue';
import BasePagination from '@/components/BasePagination.vue';
import BaseSelect from '@/components/BaseSelect.vue';
import BaseInput from '@/components/BaseInput.vue';
import { type Project, type ProjectStatus, type SelectedProjectStatus } from '@/types/index';

interface FetchResult {
    count: number,
    results: Project[],
};

type ProjectsCountInEachPage = 3 | 5 | 10;

const projectsList: Ref<Array<Project>> = ref([]);
const projectsCount: Ref<number> = ref(0);
const page: Ref<number> = ref(1);
const projectsCountsInEachPage: Array<ProjectsCountInEachPage> = [3, 5, 10];
const projectsCountInEachPage: Ref<ProjectsCountInEachPage> = ref(10);
const isLoading: Ref<boolean> = ref(false);
const projectsStatusesSelectionList: Array<SelectedProjectStatus> = ['Любой', 'CREATED', 'IN_PROGRESS', 'FINISHED'];
const selectedProjectStatus: Ref<SelectedProjectStatus> = ref('Любой');
const inputedTitlePart: Ref<string> = ref('');

const pagesCount: ComputedRef<number> = computed((): number => {
    const projectsCountForLastPage: number = projectsCount.value % projectsCountInEachPage.value;
    const fulledPagesCount: number = (projectsCount.value - projectsCountForLastPage) / projectsCountInEachPage.value;
    return projectsCountForLastPage === 0 ? fulledPagesCount : fulledPagesCount + 1
});

const changePage = (newPageNumber: number): void => {
    page.value = newPageNumber;
};

const resetPage = (): void => {
    changePage(1);
};

const checkingForAllValues = (_: never): '' => {
    return ''
};

const projectsStatusForFetch: ComputedRef<ProjectStatus | ''> = computed((): ProjectStatus | '' => {
    switch (selectedProjectStatus.value) {
        case 'CREATED':
        case 'IN_PROGRESS':
        case 'FINISHED':
            return selectedProjectStatus.value
        case 'Любой':
            return ''
        default:
            return checkingForAllValues(selectedProjectStatus.value)
    }
});

const fetchProjectsList = async () => {
    isLoading.value = true;
    try {
        const response: Response = await fetch(`https://dev.aicap.tech/api/v1/interview/projects?title=${inputedTitlePart.value}&status=${projectsStatusForFetch.value}&page=${page.value}&page_size=${projectsCountInEachPage.value}`);
        if (response.ok) {
            const fetchResult: FetchResult = await response.json();
            projectsList.value = fetchResult.results;
            projectsCount.value = fetchResult.count;
        } else {
            throw 'Ошибка при запросе'
        }
    } catch (error) {
        console.log(error);
    } finally {
        isLoading.value = false;
    }
};

watchEffect(async () => {
    await fetchProjectsList();
});
</script>

<template>
<div class="flex flex-col items-center flex-1">
    <div class="w-full flex justify-between items-center mb-8 flex-wrap gap-2">
        <BaseInput v-model:inputedValue="inputedTitlePart" :resetPage="resetPage" />
        <BaseSelect v-model:selectedValue="selectedProjectStatus" :optionsList="projectsStatusesSelectionList" :resetPage="resetPage" />
        <BaseSelect v-model:selectedValue="projectsCountInEachPage" :optionsList="projectsCountsInEachPage" :resetPage="resetPage" />
    </div>
    <div class="w-full flex-1 mb-8">
        <BaseLoader v-if="isLoading" />
        <ProjectsList v-else-if="projectsList.length" :projectsList="projectsList" />
        <ProjectsListEmpty v-else />
    </div>
    <BasePagination :pagesCount="pagesCount" :changePage="changePage" :page="page" />
</div>
</template>

<style scoped>
</style>
