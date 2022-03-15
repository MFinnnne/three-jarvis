import VDOM, { VNodeTree } from '../../core/VDOM';
import { ModelVDomData } from '../../app/ObjectTree';
import { BoxGeometry, Mesh, MeshBasicMaterial, Scene } from 'three';

function checkModelDataTree(vNodeTree: VNodeTree) {
    expect(vNodeTree.self.tagName).toBe('div');
    expect(vNodeTree.self.style?.color).toBe('red');
    expect(vNodeTree.self.className).toBeDefined();
    expect(vNodeTree.self.id).toBeDefined();
    vNodeTree.children?.forEach((child) => {
        checkModelDataTree(child);
    });
}

describe('test vom', () => {
    test('test create virtual node', () => {
        const vNode = VDOM.createVNode('div', { className: 'test-div', id: 'test', style: 'color:red' });
        expect(vNode.tagName).toBe('div');
        expect(vNode.style).toBe('color:red');
        expect(vNode.className).toBe('test-div');
    });

    test('test parse object  tree to vnode tree', () => {
        const boxGeometry = new BoxGeometry(1, 1, 1);
        const material = new MeshBasicMaterial({ color: 0x00ff00 });
        const mesh = new Mesh(boxGeometry, material);
        const scene = new Scene();
        scene.name = 'scene';
        const modelL1: ModelVDomData = {
            name: scene.name,
            uuid: scene.uuid,
            model: scene,
            attributes: {
                id: scene.uuid,
                className: scene.name,
                style: { color: 'red' },
            },
        };
        const mesh0 = mesh.clone(true);
        mesh0.name = 'mesh0';
        const modelL20: ModelVDomData = {
            name: mesh0.name,
            uuid: mesh0.uuid,
            model: mesh0,
            attributes: {
                id: mesh0.uuid,
                className: mesh0.name,
                style: { color: 'red' },
            },
        };
        const mesh1 = mesh.clone(true);
        mesh1.name = 'mesh1';
        const modelL21: ModelVDomData = {
            name: mesh1.name,
            uuid: mesh1.uuid,
            model: mesh1,
            attributes: {
                id: mesh1.uuid,
                className: mesh1.name,
                style: { color: 'red' },
            },
        };
        const mesh2 = mesh.clone(true);
        mesh2.name = 'mesh2';
        const modelL30: ModelVDomData = {
            name: mesh2.name,
            uuid: mesh2.uuid,
            model: mesh2,
            attributes: {
                id: mesh2.uuid,
                className: mesh2.name,
                style: { color: 'red' },
            },
        };
        modelL1.child = [modelL20, modelL21];
        modelL20.parent = modelL1;
        modelL21.parent = modelL1;
        modelL20.child = [modelL30];
        const vNodeTree = VDOM.parseModelDataTree(modelL1);
        VDOM.print(vNodeTree);
        checkModelDataTree(vNodeTree);
    });
});