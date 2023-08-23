import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import ProjectsListItem from "@/components/ProjectsListItem.vue";
import type { Project } from "@/types";

const project: Project = {
    id: 1,
    title: 'aaa',
    status: 'CREATED',
};

describe('ProjectsListItem', () => {
    const wrapper = mount(ProjectsListItem, {
        props: {
            project,
        }
    });

    it('Snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('Contains text', () => {
        expect(wrapper.text()).toContain('aaa');
        expect(wrapper.text()).toContain('CREATED');
    });
});
