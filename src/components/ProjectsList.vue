<script setup lang="ts">
import { type Project } from '@/types/index';
import ProjectsListItem from './ProjectsListItem.vue';

interface Props {
    projectsList: Array<Project>,
};

defineProps<Props>();
</script>

<template>
<ul>
    <ProjectsListItem v-for="project of projectsList" :key="project.id" :project="project" />
</ul>
</template>

<style scoped>
</style>
