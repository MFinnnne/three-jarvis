import { Camera, Group, Light, Line, Mesh, Object3D, Points, Scene, Sprite } from 'three';

class Style {
    private handlerMap: Map<string, (object3D: Object3D) => Partial<CSSStyleDeclaration>> = new Map();

    constructor() {
        this.handlerMap.set('Mesh', Style.getMeshStyle);
        this.handlerMap.set('Line', Style.getLineStyle);
        this.handlerMap.set('Points', Style.getPointsStyle);
        this.handlerMap.set('Sprite', Style.getSpriteStyle);
        this.handlerMap.set('Group', Style.getGroupStyle);
        this.handlerMap.set('Scene', Style.getSceneStyle);
        this.handlerMap.set('Light', Style.getLightStyle);
        this.handlerMap.set('Camera', Style.getCameraStyle);
    }

    public getStyleByModelType(object3D: Object3D): Partial<CSSStyleDeclaration> {
        const handler = this.handlerMap.get(object3D.type);
        if (handler) {
            return handler(object3D);
        }
        this.handlerMap.forEach((value, key) => {
            if (object3D.type.includes(key)) {
                return value(object3D);
            }
        });
        return Style.getDefaultStyle();
    }

    private static getSceneStyle(object3D: Object3D): Partial<CSSStyleDeclaration> {
        if (!(object3D.type === 'Scene')) {
            throw new Error('function param is not Scene');
        }
        return {
            cursor: 'pointer',
            userSelect: 'none',
        };
    }

    private static getLightStyle(object3D: Object3D): Partial<CSSStyleDeclaration> {
        if (!(object3D instanceof Light)) {
            throw new Error('function param is not Light');
        }
        return {
            cursor: 'pointer',
            userSelect: 'none',
        };
    }

    private static getCameraStyle(object3D: Object3D): Partial<CSSStyleDeclaration> {
        if (!(object3D instanceof Camera)) {
            throw new Error('function param is not Camera');
        }
        return {
            cursor: 'pointer',
            userSelect: 'none',
        };
    }

    private static getMeshStyle(object3D: Object3D): Partial<CSSStyleDeclaration> {
        if (!(object3D instanceof Mesh)) {
            throw new Error('function param is not Object3D');
        }
        return {
            cursor: 'pointer',
            userSelect: 'none',
        };
    }

    private static getLineStyle(object3D: Object3D): Partial<CSSStyleDeclaration> {
        if (!(object3D instanceof Line)) {
            throw new Error('function param is not Object3D');
        }
        return {
            cursor: 'pointer',
            userSelect: 'none',
        };
    }

    private static getPointsStyle(object3D: Object3D): Partial<CSSStyleDeclaration> {
        if (!(object3D instanceof Points)) {
            throw new Error('function param is not Object3D');
        }
        return {
            cursor: 'pointer',
            userSelect: 'none',
        };
    }

    private static getSpriteStyle(object3D: Object3D): Partial<CSSStyleDeclaration> {
        if (!(object3D instanceof Sprite)) {
            throw new Error('function param is not Object3D');
        }
        return {
            cursor: 'pointer',
            userSelect: 'none',
        };
    }

    private static getGroupStyle(object3D: Object3D): Partial<CSSStyleDeclaration> {
        if (!(object3D instanceof Group)) {
            throw new Error('function param is not Object3D');
        }
        return {
            cursor: 'pointer',
            userSelect: 'none',
        };
    }

    private static getDefaultStyle(): Partial<CSSStyleDeclaration> {
        return {
            cursor: 'pointer',
            userSelect: 'none',
        };
    }
}

const style = new Style();
export default style;
