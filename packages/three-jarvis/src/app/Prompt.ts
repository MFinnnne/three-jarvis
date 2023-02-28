import { html } from 'million/html';
import { createElement, m, VNode } from 'million';

export default class Prompt {
    static eject(text: string) {
        const prompt = m('div', { className: 'prompt' }, [m('span', { className: 'msg' }, [text])]);
        const element = createElement(prompt as VNode) as HTMLElement;
        document.body.appendChild(element);
        element.addEventListener('animationend', () => {
            document.body.removeChild(element);
        });
    }
}
