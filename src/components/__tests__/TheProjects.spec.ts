import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import TheProjects from "../TheProjects.vue";

describe('TheProjects', () => {
    const wrapper = mount(TheProjects);

    it('Snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });
});
