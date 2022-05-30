import {render} from 'million';
import Constant from '../constant/Constant';

export default class MenuBar {

    static init() {
        const element =
            <div className={{menu: true}}>
                <div className={{tag: true}}/>
            </div>
        render(Constant.MENU_CONTAINER, element);
    }
}
