import { LEFT_SIDE_BAR_COLLAPSE, LEFT_SIDE_BAR_IS_MOBILE } from 'store/actions/common/leftsidebar';

const initialState = {
    collapsed: false,
    isMobile: false,
};

export const LeftSideBar = (state = initialState, action) => {
    switch (action.type) {
        case LEFT_SIDE_BAR_COLLAPSE:
            return { ...state, collapsed: action.collapsed };
        case LEFT_SIDE_BAR_IS_MOBILE:
            return { ...state, isMobile: action.isMobile };
        default:
            return { ...state };
    }
};
