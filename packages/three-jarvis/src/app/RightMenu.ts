import RightMenu from '@right-menu/core';
import RemoveObjectCommand from '../core/commands/RemoveObjectCommand';
import General from '../core/General';

const FINISH = new Map();

export const rightMenu = (el: HTMLElement, general: General) => {
    if (FINISH.has(el.id)) {
        return;
    }
    FINISH.set(el.id, 1);
    return new RightMenu({ el: el, maxWidth: '50px' }, [
        {
            type: 'li',
            text: 'delete',
            callback: () => {
                const object3D = general.scene.getObjectByProperty('uuid', el.id);
                if (object3D) {
                    general.recorder.execute(new RemoveObjectCommand(object3D));
                    general.transformControl.detach();
                    general.state.selectedObjectDom = null;
                }
            },
        },
    ]);
};
