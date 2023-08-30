import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import BaseInput from "@/components/BaseInput.vue";

describe('BaseInput', () => {
    const wrapper = mount(BaseInput, {
        props: {
            inputedValue: '',
            resetPage: () => {},
        }
    });

    it('Snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('Contains text', () => {
        const wrapper = mount(BaseInput, {
            props: {
                inputedValue: 'aaa',
                resetPage: () => {},
            }
        });
        expect(wrapper.get('input').attributes('value') === 'aaa');
    });

    it('Change inputed text', async () => {
        await expect(wrapper.get('input').trigger('input', {value: 'bbb'}));
        expect(wrapper.get('input').attributes('value') === 'bbb');
    });
});
