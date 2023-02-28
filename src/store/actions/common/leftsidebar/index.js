export const LEFT_SIDE_BAR_COLLAPSE = 'LEFT_SIDE_BAR_COLLAPSE';
export const LEFT_SIDE_BAR_IS_MOBILE = 'LEFT_SIDE_BAR_IS_MOBILE';

const leftSideBarOpenClose = (collapsed) => ({
    type: LEFT_SIDE_BAR_COLLAPSE,
    collapsed,
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
