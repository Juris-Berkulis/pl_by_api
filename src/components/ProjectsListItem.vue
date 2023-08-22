<script setup lang="ts">
import type { Project } from '@/types';

interface Props {
    project: Project,
};

defineProps<Props>();
</script>

<template>
<li class="mb-2 last:mb-0 bg-sky-200 p-1">
    <p class="mb-0.5 font-bold">{{ project.status }}</p>
    <h2>{{ project.title }}</h2>
</li>
</template>

<style scoped>
</style>
