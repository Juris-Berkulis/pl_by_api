import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseSelect from '../BaseSelect.vue'


describe('BaseSelect', () => {
    const wrapper = mount(BaseSelect, { 
        props: { 
            selectedValue: 'Любой', 
            optionsList: ['Любой', 'CREATED', 'IN_PROGRESS', 'FINISHED'] 
        } 
    });

    it('Snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot();
    });

    it('Renders properly', () => {
        expect(wrapper.text()).toContain('Любой');
    });

    it('Contains text', () => {
        const wrapper = mount(BaseSelect, {
            props: { 
                selectedValue: 'CREATED', 
                optionsList: ['Любой', 'CREATED', 'IN_PROGRESS', 'FINISHED'] 
            } 
        });
        expect(wrapper.get('select').attributes('value') === 'CREATED');
        expect(wrapper.text()).toContain('Любой');
        expect(wrapper.text()).toContain('CREATED');
        expect(wrapper.text()).toContain('IN_PROGRESS');
        expect(wrapper.text()).toContain('FINISHED');
    });
});
