export const ModalConstants = (props) => {
    const { reset, search, submit, resetName, submitName } = props;
    const modalConstants = {
        RESET: {
            id: 1,
            key: 'reset',
            name: resetName,
        },
        SUBMIT: {
            id: 2,
            key: 'submit',
            name: submitName,
        },
    };
    return modalConstants;
};
