import { BoxGeometry, Group, Mesh, MeshBasicMaterial, PerspectiveCamera, PointLight, Scene } from 'three';
import { VElement } from 'million';
import ObjectTree from '../../app/ObjectTree';

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
