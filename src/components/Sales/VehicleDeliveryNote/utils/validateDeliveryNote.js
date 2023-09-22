/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { VEHICLE_DELIVERY_NOTE_SECTION } from 'constants/vehicleDeliveryNoteSection';

export const validateDeliveryNote = ({ item, soldByDealer }) => {
    switch (true) {
        case item?.id === VEHICLE_DELIVERY_NOTE_SECTION.FINANCE_DETAILS.id && soldByDealer:
            return 1;
        case item?.id === VEHICLE_DELIVERY_NOTE_SECTION.FINANCE_DETAILS.id && !soldByDealer:
            return 0;

        default:
            return 1;
    }
};
