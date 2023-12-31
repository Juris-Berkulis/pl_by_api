import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import ProjectsListEmpty from "@/components/ProjectsListEmpty.vue";

describe('ProjectsListEmpty', () => {
    const wrapper = mount(ProjectsListEmpty);

    it('Snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot()
    });

    it('Contains text', () => {
        expect(wrapper.text()).toContain('Список пуст');
    });
});
