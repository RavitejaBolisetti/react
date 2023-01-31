import { LEFT_SIDE_BAR_COLLAPSE } from 'store/actions/common/leftsidebar';

const initialState = {
    collapsed: false,
};

export const LeftSideBar = (state = initialState, action) => {
    switch (action.type) {
        case LEFT_SIDE_BAR_COLLAPSE:
            return { ...state, collapsed: action.collapsed };
        default:
            return { ...state };
    }
};
