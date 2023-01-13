import { Object3D } from 'three';
import Toastify from 'toastify-js';
import Toast from '../app/Toast';

export default class Utils {
    static removeAllChildNodes(parent): void {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    static countAllModels(model: Object3D): number {
        let length = 1;
        for (const child of model.children) {
            length += Utils.countAllModels(child);
        }
        return length;
    }

    static execCoy(text) {
        const input: HTMLInputElement = <HTMLInputElement>document.createElement('INPUT');
        input.style.opacity = '0';
        input.style.position = 'absolute';
        input.style.left = '-100000px';
        document.body.appendChild(input);

        input.value = text;
        input.select();
        input.setSelectionRange(0, text.length);
        document.execCommand('copy');
        document.body.removeChild(input);
        Toast.show(`(${text}) copied`);
        return true;
    }
    static once(f) {
        let result;
        let revoked = false;

        return (...args) => {
            if (revoked) return result;
            const r = f(...args);
            revoked = true;
            result = r;
            return r;
        };
    }
}

