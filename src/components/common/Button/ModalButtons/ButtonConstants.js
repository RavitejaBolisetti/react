/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
export const ModalConstants = (props) => {
    const { resetName, submitName } = props;
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
