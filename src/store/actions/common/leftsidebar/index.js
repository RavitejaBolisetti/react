export const LEFT_SIDE_BAR_COLLAPSE = 'LEFT_SIDE_BAR_COLLAPSE';

const leftSideBarOpenClose = (collapsed) => ({
    type: LEFT_SIDE_BAR_COLLAPSE,
    collapsed,
});

export const setCollapsed = (collapsed) => (dispatch) => {
    dispatch(leftSideBarOpenClose(collapsed));
};
