import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import BasePagination from "@/components/BasePagination.vue";

describe('BasePagination', () => {
    const pagesCount = 4;
    const page = 1;

    const wrapper = mount(BasePagination, {
        props: {
            pagesCount,
            changePage: () => {},
            page,
        }
    });

    it('Snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('Contains text', () => {
        for (let page = 1; page <= pagesCount; page++) {
            expect(wrapper.text()).toContain(page);
        };
    });

    it('Contains actived class', () => {
        expect(wrapper.get('button[class*="bg-sky-300"]').html()).toContain(page);
    });

    it('Change actived page', async () => {
        await expect(wrapper.get('button[data-page="3"]').trigger('click'));
        expect(wrapper.get('button[class*="bg-sky-300"]').html()).toContain(3);
    });
});
