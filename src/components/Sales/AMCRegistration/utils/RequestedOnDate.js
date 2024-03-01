/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { AMC_CONSTANTS } from './AMCConstants';

function RequestedOnDate(data, requestStatus, priceType) {
    switch (priceType) {
        case AMC_CONSTANTS?.MNM_FOC?.key: {
            switch (requestStatus) {
                case AMC_CONSTANTS?.APPROVED?.key: {
                    return data?.amcRegistrationDate;
                }
                case AMC_CONSTANTS?.PENDING_FOR_CANCELLATION?.key: {
                    return data?.amcCancelDate;
                }
                default:
                    return data?.amcRegistrationDate;
            }
        }
        case AMC_CONSTANTS?.PAID?.key: {
            switch (requestStatus) {
                case AMC_CONSTANTS?.PENDING_FOR_APPROVAL?.key: {
                    return data?.amcRegistrationDate;
                }
                case AMC_CONSTANTS?.PENDING_FOR_CANCELLATION?.key: {
                    return data?.amcCancelDate;
                }
                case AMC_CONSTANTS?.UNDER_PROGRESS?.key: {
                    return data?.amcRegistrationDate;
                }
                default:
                    return data?.approvedDate;
            }
        }

        default:
            return data?.amcRegistrationDate;
    }
}

export default RequestedOnDate;
