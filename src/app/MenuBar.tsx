import {render, VNode} from 'million';
import Constant from '../constant/Constant';

export default class MenuBar {


    static render() {
        const element =
            <div className={{menu: true}}>
                <div className={{tag: true}}>import</div>
            </div>
        render(Constant.MENU_CONTAINER, element as VNode);
    }
}
