export const LOGIN_PAGE_LOGGING_IN = "LOGIN_PAGE_LOGGING_IN";
export const LOGIN_PAGE_CLEAR = "LOGIN_PAGE_CLEAR";

export const loginPageIsLoading = (isLoading = true) => ({
    type: LOGIN_PAGE_LOGGING_IN,
    isLoading
})

export const loginPageClear = () => ({
    type: LOGIN_PAGE_CLEAR,
});
