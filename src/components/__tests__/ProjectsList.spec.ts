import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import ProjectsList from "../ProjectsList.vue";
import type { Project } from "@/types";

const projectsList: Project[] = [
    {
        "id": 187,
        "title": "Рекламный ролик №31 (банки, сервис, 2 кат)",
        "status": "IN_PROGRESS"
    },
    {
        "id": 186,
        "title": "Рекламный ролик №30 (банки, lдебет, 2 кат)",
        "status": "IN_PROGRESS"
    },
    {
        "id": 185,
        "title": "Рекламный ролик №29 (банки, кредит, 2 кат)",
        "status": "IN_PROGRESS"
    },
    {
        "id": 184,
        "title": "Рекламный ролик №28 (банки, кредит, 2 кат)",
        "status": "IN_PROGRESS"
    },
    {
        "id": 183,
        "title": "Рекламный ролик #27(банки, кредит, 15 сек)",
        "status": "IN_PROGRESS"
    },
    {
        "id": 182,
        "title": "Рекламный ролик #26(банки, кредит, 2 кат)",
        "status": "IN_PROGRESS"
    },
    {
        "id": 181,
        "title": "Исследование AICAP VidMK23 09.06",
        "status": "FINISHED"
    },
    {
        "id": 180,
        "title": "Задание от AICAP №6",
        "status": "FINISHED"
    },
    {
        "id": 179,
        "title": "Исследование AICAP VidMK23",
        "status": "IN_PROGRESS"
    },
    {
        "id": 178,
        "title": "Задание от AICAP №5",
        "status": "FINISHED"
    }
];

describe('ProjectsList', () => {
    const wrapper = mount(ProjectsList, {
        props: {
            projectsList,
        }
    });

    it('Snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('Contains text', () => {
        projectsList.forEach((project: Project) => {
            expect(wrapper.text()).toContain(project.title);
            expect(wrapper.text()).toContain(project.status);
        });
    });
});
