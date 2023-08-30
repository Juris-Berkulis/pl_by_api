<script setup lang="ts">
import { ref, type Ref } from 'vue';

interface Props {
    inputedValue: string,
    resetPage: () => void,
};

const props = defineProps<Props>();

const emit = defineEmits(['update:inputedValue']);

const timerId: Ref<number | undefined> = ref();

const changeInputedValue = (event: Event): void => {
    clearTimeout(timerId.value);

    timerId.value = setTimeout(() => {
        props.resetPage();
        emit('update:inputedValue', <string>(event.target as HTMLInputElement).value);
    }, 1000);
};
</script>

<template>
<input 
    class="w-full sm:w-1/2 px-2 py-1 border text-sm focus:outline-none" 
    :value="inputedValue" 
    @input="changeInputedValue" 
    type="text"
    placeholder="Заголовок"
>
</template>

<style scoped>
</style>
