<script setup lang="ts">
import ProjectsListItem from '@/components/ProjectsListItem.vue';
import { type Project } from '@/types/index';

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
