<script setup lang="ts">
import { ref, type Ref, computed, type ComputedRef, watchEffect, reactive } from 'vue';
import ProjectsList from '@/components/ProjectsList.vue';
import ProjectsListEmpty from '@/components/ProjectsListEmpty.vue'
import BaseLoader from '@/components/BaseLoader.vue';
import BasePagination from '@/components/BasePagination.vue';
import { type Project, type SelectedProjectStatus } from '@/types/index';
import BaseSelect from './BaseSelect.vue';
import BaseInput from './BaseInput.vue';

interface MemoizePagesContent {
    [key: number]: Project[];
};

interface FetchResult {
    count: number,
    results: Project[],
};

const projectsList: Ref<Array<Project>> = ref([]);
const projectsCount: Ref<number> = ref(0);
const page: Ref<number> = ref(1);
const projectsCountInEachPage: number = 10;
const isLoading: Ref<boolean> = ref(false);
const memoizePagesContent: MemoizePagesContent = reactive({});
const projectsStatusesSelectionList: Array<SelectedProjectStatus> = ['Любой', 'CREATED', 'IN_PROGRESS', 'FINISHED'];
const selectedProjectStatus: Ref<SelectedProjectStatus> = ref('Любой');
const inputedTitlePart: Ref<string> = ref('');

const pagesCount: ComputedRef<number> = computed(() => {
    const fullPagesCount: number = projectsCount.value / projectsCountInEachPage;
    return projectsCount.value % projectsCountInEachPage === 0 ? fullPagesCount : fullPagesCount + 1
});

const checkingForAllValues = (_: never): Array<Project> => {
    return projectsList.value
};

const filteredProjectsListByStatus: ComputedRef<Project[]> = computed((): Array<Project> => {
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

const filteredProjectsList: ComputedRef<Project[]> = computed((): Array<Project> => {
    return filteredProjectsListByStatus.value.filter((project: Project): boolean => {
        return project.title.includes(inputedTitlePart.value)
    })
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
    <BaseSelect v-model:selectedValue="selectedProjectStatus" :optionsList="projectsStatusesSelectionList" />
    <BaseInput v-model:inputValue="inputedTitlePart" />
    <BaseLoader v-if="isLoading" />
    <ProjectsList v-else-if="filteredProjectsList.length" :projectsList="filteredProjectsList" />
    <ProjectsListEmpty v-else />
    <BasePagination :pagesCount="pagesCount" :changePage="changePage" />
</div>
</template>

<style scoped>
</style>
