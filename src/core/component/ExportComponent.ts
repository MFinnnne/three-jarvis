import { Group, Object3D } from 'three';
import state from '../State';
import { LoadConfig, LoadModelConfig } from '../Type';
import sceneDB from '../mapper/SceneDB';
import dayjs from 'dayjs';

export default class ExportComponent {

    static exportJson(fileName:string,json: string) {
        ExportComponent.exportFile(fileName+'.json', json);
    }

    //导出txt格式
    private static exportFile(fileName: string, content: string) {
        const pom = document.createElement('a');
        pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
        pom.setAttribute('download', fileName);
        if (document.createEvent) {
            const event = document.createEvent('MouseEvents');
            event.initEvent('click', true, true);
            pom.dispatchEvent(event);
        } else {
            pom.click();
        }
    }

    private static exportObjectJson(object: Object3D | Group): any {
        return object.toJSON();
    }


    private static objectConfig(object: Object3D | Group): string {
        const config: LoadConfig = {
            loadModelConfigs: [],
            afterLoad: (objects) => {
            },
            beforeLoad: () => {
            },
        };
        for (const child of object.children) {
            const modelConfig: LoadModelConfig = {
                id: child.uuid,
                path: '',
                name: child.name,
                position: { x: child.position.x, y: child.position.y, z: child.position.z },
                rotation: {
                    x: child.rotation.x,
                    y: child.rotation.y,
                    z: child.rotation.z,
                    order: child.rotation.order,
                },
                scale: { x: child.scale.x, y: child.scale.y, z: child.scale.z },
                quaternion: {
                    x: child.quaternion.x,
                    y: child.quaternion.y,
                    z: child.quaternion.z,
                    w: child.quaternion.w,
                },
                afterRender: (object) => {
                },
                beforeRender: () => {
                },
            };
            config.loadModelConfigs.push(modelConfig);
        }
        return ExportComponent.loadModelConfig2String(config);
    }


    private static loadModelConfig2String(config: LoadConfig): string {
        return `
            export const CONFIG = {
                loadModelConfigs:[${(ExportComponent.modelConfig2String(config.loadModelConfigs))}],
                afterLoad: (objects) => {
                },
                beforeLoad: () => {
                }
            }
        `;
    }

    private static modelConfig2String(modelConfigs: LoadModelConfig[]): string {
        const configs: string[] = [];
        modelConfigs.forEach((child, index) => {
            const modelConfig = `
            {
               id: '${child.id}',
                name: '${child.name}',
                position: {x: ${child.position.x}, y: ${child.position.y}, z: ${child.position.z}},
                rotation: {x: ${child.rotation.x}, y: ${child.rotation.y}, z: ${child.rotation.z}, order: '${child.rotation.order}'},
                scale:  {x: ${child.scale.x}, y: ${child.scale.y}, z: ${child.scale.z}},
                quaternion: {
                    x: ${child.quaternion.x},
                    y: ${child.quaternion.y},
                    z: ${child.quaternion.z},
                    w: ${child.quaternion.w}
                },
                afterRender: (object) => {
                },
                beforeRender: () => {
                } 
            }
        `;
            configs.push(modelConfig);
        });
        return configs.toString();
    }
}


