<script setup lang="ts">
import { type Project } from '@/types/index';

interface Props {
    projectsList: Array<Project>,
};

defineProps<Props>();
</script>

<template>
<ul>
    <li v-for="project of projectsList" :key="project.id">
        <p>{{ project.status }}</p>
        <h2>{{ project.title }}</h2>
    </li>
</ul>
</template>

<style scoped>
</style>
