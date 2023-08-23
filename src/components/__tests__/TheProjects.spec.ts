import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { ref, type Ref } from "vue";
import TheProjects from "@/components/TheProjects.vue";
import type { Project } from "@/types";

describe('TheProjects', () => {
    const wrapper = mount(TheProjects);

    it('Snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('Fetch projects list', async () => {
        const projectsList: Ref<Array<Project>> = ref([]);
        const response: Response = await fetch(`https://dev.aicap.tech/api/v1/interview/projects?page=1`);
        const fetchResult = await response.json();
        projectsList.value = fetchResult.results;

        expect(projectsList.value[0].title).toBe('Рекламный ролик №56 (банки, дебет, 2 кат)');
        expect(projectsList.value.length).toBe(10);
    });
});
