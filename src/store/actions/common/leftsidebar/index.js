/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
export const LEFT_SIDE_BAR_COLLAPSE = 'LEFT_SIDE_BAR_COLLAPSE';
export const LEFT_SIDE_BAR_IS_MOBILE = 'LEFT_SIDE_BAR_IS_MOBILE';
export const MENU_SCROLL_VIEW_KEY = 'MENU_SCROLL_VIEW_KEY';

const leftSideBarOpenClose = (collapsed) => ({
    type: LEFT_SIDE_BAR_COLLAPSE,
    collapsed,
});

const menuScroolToView = (menuKey) => ({
    type: MENU_SCROLL_VIEW_KEY,
    menuKey,
});

const openInMobile = (isMobile) => ({
    type: LEFT_SIDE_BAR_IS_MOBILE,
    isMobile,
});

export const setCollapsed = (collapsed) => (dispatch) => {
    dispatch(leftSideBarOpenClose(collapsed));
};

export const setIsMobile = (isMobile) => (dispatch) => {
    dispatch(openInMobile(isMobile));
};

export const setSelectKeyToScroll = (menuKey) => (dispatch) => {
    dispatch(menuScroolToView(menuKey));
};