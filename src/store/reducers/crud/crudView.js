export const initialState = {
    id: null,
    isVisible: false,
};
const viewShowModalCF = (state, action) => ({
    isVisible: true,
    id: action.id,
});

const viewHideModalCF = (state, action) => ({
    isVisible: false,
});

export const crudViewReducer =
    (viewActionConstants, myInitialState = initialState) =>
    (state = myInitialState, action) => {
        switch (action.type) {
            case viewActionConstants.SHOW_MODAL:
                return viewShowModalCF(state, action);
            case viewActionConstants.HIDE_MODAL:
                return viewHideModalCF(state, action);
            default:
                return state;
        }
    };
