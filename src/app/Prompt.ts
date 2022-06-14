import {html} from "million/html";
import Constant from "constant/Constant";
import {createElement, render, VNode} from "million";

export default class Prompt {
    static eject(text: string) {
        const prompt = html`
            <div className="${{prompt: true}}">
                ${text}
            </div>
        `
        const element = createElement(prompt as VNode) as HTMLElement;
        document.body.appendChild(element);
        console.log(element)
        element.addEventListener('animationend', () => {
            document.body.removeChild(element);
        })
    }

}
