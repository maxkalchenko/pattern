
import { CONTEXT_MENU_OPEN, CONTEXT_MENU_CLOSE, CONTEXT_MENU_REOPEN } from '../../actions/action-types';

let y = 0;
let target = null;

export const openContextMenu = (event, data) => {
    return {
        type: CONTEXT_MENU_OPEN,
        payload: {
            data: data,
            ...onOpen(event)
        }
    };
};

export const closeContextMenu = () => {
    onClose();

    return {
        type: CONTEXT_MENU_CLOSE
    };
};

export const reOpenContextMenu = event => {
    onClose();

    event.preventDefault();
    event.stopPropagation();

    let { clientX, clientY } = event;

    return {
        type: CONTEXT_MENU_REOPEN,
        payload: {
            y: clientY,
            x: clientX
        }
    };
};

function onOpen(event) {
    target = event.currentTarget;
    target.classList.add('context-menu-open');

    event.preventDefault();
    event.stopPropagation();

    let { clientX, forceX, clientY, forceY } = event.nativeEvent;

    y = window.scrollY;

    window.addEventListener('scroll', noScroll, true);

    return {
        y: clientY || forceY,
        x: clientX || forceX
    };
}

function onClose() {
    target.classList.remove('context-menu-open');
    target = null;
    
    window.removeEventListener('scroll', noScroll, true);
}

function noScroll() {
    window.scrollTo(0, y);
}
