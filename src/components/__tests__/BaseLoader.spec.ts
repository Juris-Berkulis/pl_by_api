import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import BaseLoader from "@/components/BaseLoader.vue";

describe('BaseLoader', () => {
    const wrapper = mount(BaseLoader);

    it('Snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot();
    });
});
