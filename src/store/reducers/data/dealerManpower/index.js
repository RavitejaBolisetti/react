import { combineReducers } from 'redux';

import { DealerLocationTypeMaster } from './dealerLocationTypeMaster';
import { BayTypeMaster } from './bayMasterType';

export const DealerManpower = combineReducers({
    DealerLocationTypeMaster,
    BayTypeMaster,
});
