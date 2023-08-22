import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import BasePagination from "../BasePagination.vue";

describe('BasePagination', () => {
    const pagesCount = 4;

    const wrapper = mount(BasePagination, {
        props: {
            pagesCount,
            changePage: () => {},
            page: 1,
        }
    });

    it('snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('Contains text', () => {
        for (let page = 1; page <= pagesCount; page++) {
            expect(wrapper.text()).toContain(page);
        };
    });
});
