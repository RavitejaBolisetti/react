/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
// import { OTFSection } from 'constants/OTFSection';

export const MovetoNextForm = (leftTimeline, setleftTimeline, setmoduleName) => {
    const timeLineKeys = [];
    const ModuleArray = ['OTF Details', 'Customer Details', 'Vehicle Details', 'Scheme and Offer Details', 'Insurance Details', 'Finance Details', 'Exchange vehicle', 'Referrals', 'Loyalty scheme', 'Invoice Information'];

    for (const key in leftTimeline) {
        timeLineKeys.push(key);
    }

    for (const key in leftTimeline) {
        if (leftTimeline[key]) {
            const IndexFound = timeLineKeys.findIndex((element, Index) => element === key);
            if (IndexFound === timeLineKeys?.length - 1) {
                return;
            } else if (IndexFound !== -1) {
                setleftTimeline({ ...leftTimeline, [key]: false, [timeLineKeys[IndexFound + 1]]: true });
                setmoduleName(ModuleArray[IndexFound + 1]);
            }

            return;
        }
    }
};
