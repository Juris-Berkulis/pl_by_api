<script setup lang="ts">
import { ref, type Ref, computed, type ComputedRef } from 'vue';

type ProjectStatus = 'CREATED' | 'IN_PROGRESS' | 'FINISHED';

interface Project {
    id: number,
    title: string,
    status: ProjectStatus,
};

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
    <div v-if="isLoading">
        Загрузка...
    </div>
    <ul v-else-if="projectsList.length">
        <li v-for="project of projectsList" :key="project.id">
            <p>{{ project.status }}</p>
            <h2>{{ project.title }}</h2>
        </li>
    </ul>
    <div v-else>
        Список пуст
    </div>
    <div>
        <div v-for="pageNumber of pagesCount" :key="pageNumber">{{ pageNumber }}</div>
    </div>
</div>
</template>

<style scoped>
</style>
