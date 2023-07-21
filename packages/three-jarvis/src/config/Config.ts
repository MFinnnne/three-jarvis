import GUI from "../app/GUI";

export class Config {
	constructor() {
		return new Proxy(this, {
			get(target, prop: string) {
				// 打印get操作的属性名
				console.log(`get ${prop}`);
				// 返回原始对象的属性值
				return target[prop];
			},
			set(target, prop: string, value) {
				// 打印set操作的属性名和值
				console.log(`set ${prop} to ${value}`);
				// 设置原始对象的属性值
				target[prop] = value;
				// 返回true表示成功
				return true;
			}
		});
	}

	private _hidden: boolean = false;

	get hidden(): boolean {
		return this._hidden;
	}

	set hidden(value: boolean) {
		this._hidden = value;
		if (value) {
			GUI.hiddenGUI();
		} else {
			GUI.showGUI();
		}
	}
}
