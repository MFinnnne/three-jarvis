import Toastify from 'toastify-js';

export default class Toast {
    public static show(text: string) {
        Toastify({
            text: text,
            duration: 2000,
            className: 'toast',
            position: 'left',
        }).showToast();
    }
}
