import {className, Flags, m, render, VElement, VNode} from 'million';
import {Object3D} from 'three';
import {domClickEvent, domDoubleClickEvent} from '../core/events/DomEvents';
import General from '../core/General';
import Ticker from '../core/Ticker';
import genMyRightMenu from './MyRightMenu';

export default class ObjectTree {
	private prevNode: VNode | undefined;
	private readonly general: General;

	private container: HTMLElement;

	constructor(container: HTMLElement, general: General) {
		this.general = general;
		this.container = container;
		domDoubleClickEvent(container, general.scene);
		domClickEvent(general.scene);
	}

	private object2VNode(object: Object3D): VElement | null {
		if (object.userData.isShow === false) {
			return null;
		}
		const node: VElement = {
			flag: Flags.ELEMENT,
			tag: 'div',
			props: {
				className: object.name === '' ? object.type : object.name,
				uuid: object.uuid,
				parent: null,
				hasChildren: object.children.length > 0,
			},
			children: [
				m(
					'span',
					{
						id: object.uuid,
						className: className({
							caret: object.children.length > 0,
							caretOver: object.children.length <= 0,
							threeObject: true,
						}),
						onClick: (e) => {
							if (object.children.length > 0) {
								const parentElement = (e.target as HTMLElement).parentElement;
								const element = parentElement?.querySelector('.nested');
								element?.classList.toggle('active');
								(e.target as HTMLElement).classList.toggle('caretDown');
							}
							const target = e.target as HTMLElement;
							genMyRightMenu(target, this.general);
							const uuid = target.id;

							this.general.state.selectedObjectDom = target;
							Ticker.emmit('objectDomClick', uuid);
						},
					},
					[object.name === '' ? object.type : object.name],
					Flags.ELEMENT,
				),
			],
		};
		if (object.children.length > 0) {
			node.children?.push({
				tag: 'ul',
				props: {className: className({nested: true})},
				children: [],
				flag: Flags.ELEMENT,
			});
		}
		return node;
	}

	private object2VNodeTree(object: Object3D): VElement | null {
		const node = this.object2VNode(object);
		if (node !== null) {
			object.children.forEach((child) => {
				const childNode: VNode | null = this.object2VNodeTree(child);
				if (childNode == null) {
					return;
				}
				if (node.children?.length === 2) {
					if (childNode.props) {
						childNode.props.parent = node;
					}
					const ulNode = node.children[1] as VElement;
					ulNode.children?.push(childNode);
				}
			});
			return node;
		}
		return null;
	}

	static print(vNode: VElement, level = 0) {
		const props = vNode.props;
		if (!props) {
			return;
		}
		const indent = '-'.repeat(level * 2);
		console.log(`${indent}${props.value}#${props.id} ${props.value}`);
		vNode.children?.forEach((child) => {
			ObjectTree.print(child as VElement, level + 1);
		});
	}

	render(parent: HTMLElement): void {
		const newNode = this.object2VNodeTree(this.general.scene);
		if (newNode === null) {
			return;
		}
		render(parent, newNode, this.prevNode ?? newNode);
		this.prevNode = newNode;
	}

	/**
	 * find dom in three and auto scroll to it
	 * @param dom
	 */
	autoLocateInTree(dom: HTMLElement) {
		let offsetTop: number = dom.offsetTop - this.container.clientHeight / 2;
		if (dom.offsetTop < this.container.clientHeight) {
			offsetTop = 0;
		}
		let offsetLeft: number = dom.offsetLeft - this.container.clientWidth / 2;
		if (dom.offsetLeft < this.container.clientWidth / 4) {
			offsetLeft = 0;
		}
		this.container.scrollTo(offsetLeft, offsetTop);
		this.general.state.selectedObjectDom = dom;
	}

	/**
	 * find dom in tree and expand
	 * @param element
	 */
	expandTreeByChildNode(element: HTMLElement) {
		let divElement = element.parentElement?.parentElement?.parentElement;
		while (divElement) {
			const classList = divElement.querySelector('.nested')?.classList;
			if (!classList?.contains('active')) {
				classList?.toggle('active');
			}
			if (divElement.className === 'scene') {
				break;
			}
			divElement = divElement.parentElement?.parentElement;
		}
		this.autoLocateInTree(element);
	}
}
