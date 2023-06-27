/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { LEFT_SIDE_BAR_COLLAPSE, LEFT_SIDE_BAR_IS_MOBILE, MENU_SCROLL_VIEW_KEY } from 'store/actions/common/leftsidebar';

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
        case MENU_SCROLL_VIEW_KEY:
            return { ...state, selectedMenudId: action.menuKey };
        default:
            return { ...state };
    } 
};
