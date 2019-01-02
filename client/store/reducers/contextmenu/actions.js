
import { CONTEXT_MENU_OPEN, CONTEXT_MENU_CLOSE, CONTEXT_MENU_CLOSE_AND_OPEN } from '../../actions/action-types';
import { POSTS_CONTEXT_MENU } from '../../../components/contextmenu/menu-types';

let y = 0;
let noScroll = () => window.scrollTo(0, y);

export const openPostsContextMenu = (event, data) => {
    event.preventDefault();
    event.stopPropagation();

    let { clientX, forceX, clientY, forceY } = event.nativeEvent;

    y = window.scrollY;
    window.addEventListener('scroll', noScroll, true);

    return {
        type: CONTEXT_MENU_OPEN,
        payload: {
            type: POSTS_CONTEXT_MENU,
            data: data,
            y: clientY || forceY,
            x: clientX || forceX
        }
    };
};

export const closeContextMenu = () => {
    window.removeEventListener('scroll', noScroll, true);

    return {
        type: CONTEXT_MENU_CLOSE
    };
};

export const reOpenContextMenu = event => {
    event.preventDefault();
    event.stopPropagation();
    
    window.removeEventListener('scroll', noScroll, true);

    let { clientX, clientY } = event;

    // console.log('reOpenContextMenu', clientX, clientY);

    return {
        type: CONTEXT_MENU_CLOSE_AND_OPEN,
        payload: {
            y: clientY,
            x: clientX
        }
    };
};