export const showLoadingSaveCF = (state, action) => ({
    ...state,
    isLoadingOnSave: action.isLoading,
});
