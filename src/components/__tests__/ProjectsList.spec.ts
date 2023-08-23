import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import ProjectsList from "@/components/ProjectsList.vue";
import type { Project } from "@/types";

describe('ProjectsList', async () => {
    const response: Response = await fetch(`https://dev.aicap.tech/api/v1/interview/projects?page=1`);
    const fetchResult = await response.json();
    const projectsList = fetchResult.results;

    const wrapper = mount(ProjectsList, {
        props: {
            projectsList,
        }
    });

    it('Snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('Contains text', () => {
        projectsList.forEach((project: Project) => {
            expect(wrapper.text()).toContain(project.title);
            expect(wrapper.text()).toContain(project.status);
        });
    });
});
