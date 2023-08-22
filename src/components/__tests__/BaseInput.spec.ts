import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import BaseInput from "../BaseInput.vue";

describe('BaseInput', () => {
    const wrapper = mount(BaseInput, {
        props: {
            inputValue: '',
        }
    });

    it('Snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('Contains text', () => {
        const wrapper = mount(BaseInput, {
            props: {
                inputValue: 'aaa',
            }
        });
        expect(wrapper.get('input').attributes('value') === 'aaa');
    });
});
