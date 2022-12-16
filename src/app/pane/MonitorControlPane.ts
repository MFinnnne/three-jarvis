import { BladeApi, Pane, TabPageApi } from "tweakpane";
import { Euler, Object3D, Quaternion, Vector3 } from "three";
import DefaultControlPane from "./DefaultControlPane";
import { Point3d } from "@tweakpane/core/dist/es6/input-binding/point-3d/model/point-3d";
import Prompt from "../Prompt";
import Constant from "../../constant/Constant";

export default class MonitorControlPane extends DefaultControlPane {
    protected objectPane?: TabPageApi;
    protected geometryPane?: TabPageApi;
    protected materialPane?: TabPageApi;
    protected object?: Object3D;

    public genPane(object?: Object3D): Pane {
        const pane = super.genPane(object);
        const monitorFolder = this.pane.addFolder({ title: "monitor" });
        const info = { memory: "", render: "" };
        monitorFolder.addMonitor(info, "memory", { multiline: true, lineCount: 2 }).on("update", () => {
            const memory = Constant.rawVar.render.info.memory;
            info.memory = `textures: ${memory.textures}\ngeometries: ${memory.geometries}`;
        });
        monitorFolder.addSeparator()
        monitorFolder.addMonitor(info, "render", { multiline: true, lineCount: 5 }).on("update", () => {
            const render = Constant.rawVar.render.info.render;
            info.render = `frame: ${render.frame}\ntriangles: ${render.triangles}\ncalls: ${render.calls}\npoints: ${render.points}\nlines: ${render.lines}`;
        });
        return pane;
    }


}
