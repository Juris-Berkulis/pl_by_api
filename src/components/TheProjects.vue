<script setup lang="ts">
import { ref, type Ref, computed, type ComputedRef, watchEffect, reactive } from 'vue';
import ProjectsList from '@/components/ProjectsList.vue';
import ProjectsListEmpty from '@/components/ProjectsListEmpty.vue'
import BaseLoader from '@/components/BaseLoader.vue';
import BasePagination from '@/components/BasePagination.vue';
import { type ProjectStatus, type Project } from '@/types/index';

interface MemoizePagesContent {
    [key: number]: Project[];
};

interface FetchResult {
    count: number,
    results: Project[],
};

type SelectedProjectStatus = ProjectStatus | 'Любой';

const projectsList: Ref<Array<Project>> = ref([]);
const projectsCount: Ref<number> = ref(0);
const page: Ref<number> = ref(1);
const projectsCountInEachPage: number = 10;
const isLoading: Ref<boolean> = ref(false);
const memoizePagesContent: MemoizePagesContent = reactive({});
const projectsStatusesSelectionList: Array<SelectedProjectStatus> = ['Любой', 'CREATED', 'IN_PROGRESS', 'FINISHED'];
const selectedProjectStatus: Ref<SelectedProjectStatus> = ref('Любой');

const pagesCount: ComputedRef<number> = computed(() => {
    const fullPagesCount: number = projectsCount.value / projectsCountInEachPage;
    return projectsCount.value % projectsCountInEachPage === 0 ? fullPagesCount : fullPagesCount + 1
});

const checkingForAllValues = (status: never): Array<Project> => {
    return projectsList.value
};

const filteredProjectsListByStatus: ComputedRef<Array<Project>> = computed((): Array<Project> => {
    switch (selectedProjectStatus.value) {
        case 'CREATED':
        case 'IN_PROGRESS':
        case 'FINISHED':
            return projectsList.value.filter((project: Project): boolean => {
                return project.status === selectedProjectStatus.value
            })
        case 'Любой':
            return projectsList.value
        default:
            return checkingForAllValues(selectedProjectStatus.value)
    }
});

const fetchProjectsList = async () => {
    isLoading.value = true;
    try {
        const response: Response = await fetch(`https://dev.aicap.tech/api/v1/interview/projects?page=${page.value}`);
        if (response.ok) {
            const fetchResult: FetchResult = await response.json();
            projectsList.value = fetchResult.results;
            projectsCount.value = fetchResult.count;
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

const changePage = (newPageNumber: number):void => {
    page.value = newPageNumber;
};

watchEffect(async () => {
    if (memoizePagesContent[page.value]) {
        projectsList.value = memoizePagesContent[page.value];
    } else {
        await fetchProjectsList();
        memoizePagesContent[page.value] = projectsList.value;
    }
});
</script>

<template>
<div>
    <BaseLoader v-if="isLoading" />
    <ProjectsList v-else-if="filteredProjectsListByStatus.length" :projectsList="filteredProjectsListByStatus" />
    <ProjectsListEmpty v-else />
    <BasePagination :pagesCount="pagesCount" :changePage="changePage" />
    <select v-model="selectedProjectStatus">
        <option v-for="projectStatus of projectsStatusesSelectionList" :key="projectStatus">{{ projectStatus }}</option>
    </select>
</div>
</template>

<style scoped>
</style>
