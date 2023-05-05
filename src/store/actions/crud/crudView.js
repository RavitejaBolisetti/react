export const viewActionConstants = (prefix) => ({
    SHOW_MODAL: prefix + 'VIEW_SHOW_MODAL',
    HIDE_MODAL: prefix + 'VIEW_HIDE_MODAL',
});

export const viewActions = (viewActionConstants) => ({
    showModal: (id) => ({
        type: viewActionConstants.SHOW_MODAL,
        id,
    }),
    hideModal: () => ({
        type: viewActionConstants.HIDE_MODAL,
    }),
});
