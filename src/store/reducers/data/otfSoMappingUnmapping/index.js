/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { combineReducers } from 'redux';

import { DealerParentLocation } from './dealerLocation';
import { DealerParent } from './dealerParentLov';
import { OtfSoMapping } from './otfSoMapping';
import { OtfNumberSearch } from './otfNumberSearch';

export const OTFSoMapping = combineReducers({
    DealerParentLocation,
    DealerParent,
    OtfSoMapping,
    OtfNumberSearch,
});
