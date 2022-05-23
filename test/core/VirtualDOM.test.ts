import {BoxGeometry, Group, Mesh, MeshBasicMaterial, PerspectiveCamera, PointLight, Scene} from 'three';
import {createElement, m, VElement} from "million";
import VirtualDOM from "../../src/core/VirtualDOM";

function checkModelDataTree(vNodeTree: VElement) {
    if (vNodeTree.props) {
        expect(vNodeTree.props.tagName).toBe('div');
        expect(vNodeTree.props.className).toBeDefined();
        expect(vNodeTree.props.id).toBeDefined();
        vNodeTree.children?.forEach((child) => {
            checkModelDataTree(child as VElement);
        });
    }

}

describe('test new vom', () => {
    test('should parse three scene', () => {
        const scene = new Scene();
        const pointLight = new PointLight(0xffffff, 1, 100, 2);
        scene.add(pointLight);
        const perspectiveCamera = new PerspectiveCamera(45, 1920 / 1080, 0.1, 1000);
        scene.add(perspectiveCamera);
        const group = new Group();
        const boxGeometry1 = new BoxGeometry(1, 1, 1);
        const material1 = new MeshBasicMaterial({color: 0x00ff00});
        const mesh3 = new Mesh(boxGeometry1, material1);
        group.add(mesh3);
        scene.add(group);
        const vNodeTree1 = VirtualDOM.object2VNodeTree(scene);
        VirtualDOM.print(vNodeTree1);
        // checkModelDataTree(vNodeTree1);
    });
});
