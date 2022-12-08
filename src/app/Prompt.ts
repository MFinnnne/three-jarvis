import {html} from "million/html";
import {createElement,VNode} from "million";

export default class Prompt {
    static eject(text: string) {
        const prompt = html`
            <div className="${{prompt: true}}">
                <span className=${{msg: true}}>                     
                    ${text}
                </span>
            </div>
        `
        const element = createElement(prompt as VNode) as HTMLElement;
        document.body.appendChild(element);
        element.addEventListener('animationend', () => {
            document.body.removeChild(element);
        })
    }

}
