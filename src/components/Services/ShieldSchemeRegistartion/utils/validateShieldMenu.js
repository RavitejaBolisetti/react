/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
// import { ReceiptType } from './ReceiptType';
import { SHIELD_REGISTRATION_SECTION } from 'constants/ShieldSchemeRegistrationSection';

export const validateShieldRegistrationMenu = ({ item, formActionType }) => {
    switch (item?.id) {
        case SHIELD_REGISTRATION_SECTION?.REQUEST_DETAILS?.id: {
            return formActionType?.viewMode;
        }
        case SHIELD_REGISTRATION_SECTION?.THANK_YOU_PAGE?.id: {
            return false;
        }
        default: {
            return true;
        }
    }
};
