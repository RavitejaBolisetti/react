/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { AMC_CONSTANTS } from '../utils/AMCConstants';

function RequestedOnDate(data, requestStatus, priceType) {
    switch (priceType) {
        case AMC_CONSTANTS?.MNM_FOC?.key: {
            switch (requestStatus) {
                case AMC_CONSTANTS?.APPROVED?.key: {
                    return data?.shieldRegistrationDate;
                }
                case AMC_CONSTANTS?.PENDING_FOR_CANCELLATION?.key: {
                    return data?.regCancelDate;
                }
                default:
                    return data?.shieldRegistrationDate;
            }
        }
        case AMC_CONSTANTS?.PAID?.key: {
            switch (requestStatus) {
                case AMC_CONSTANTS?.PENDING_FOR_APPROVAL?.key: {
                    return data?.shieldRegistrationDate;
                }
                case AMC_CONSTANTS?.PENDING_FOR_CANCELLATION?.key: {
                    return data?.regCancelDate;
                }
                case AMC_CONSTANTS?.UNDER_PROGRESS?.key: {
                    return data?.shieldRegistrationDate;
                }
                default:
                    return data?.approvedDate;
            }
        }

        default:
            return data?.shieldRegistrationDate;
    }
}

export default RequestedOnDate;
