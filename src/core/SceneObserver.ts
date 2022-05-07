import {Object3D, Scene} from "three";
import GUI from "../app/GUI";
import Constant from "../constant/Constant";

export default class SceneObserver {

    private static OBJECTS_FLAT_MAP: Map<String, Object3D> = new Map();

    static monitorScene(scene: Scene) {
        let prevModelCount = 0;
        setInterval(() => {
            const number = SceneObserver.countAllModels(scene);
            const flatModels = scene.children.flat();
            const curModelsCount = flatModels.filter(item => {
                return !item.name.includes(Constant.HELPER_NAME);
            }).length;
            console.log("all models count:", curModelsCount);
            if (prevModelCount !== curModelsCount) {
                console.table(scene.children.flat())
                prevModelCount = curModelsCount;
                SceneObserver.checkScene(scene);
            }
        }, 500)
    }

    private static checkScene(scene: Scene) {

        GUI.objectTreeInit();
    }

    static countAllModels(model:Object3D):number{
        if (model.children.length < 0) {
            return 0;
        }
        const numbers = model.children.map(item=>{
            return SceneObserver.countAllModels(item);
        });
        return model.children.length;
    }
}
