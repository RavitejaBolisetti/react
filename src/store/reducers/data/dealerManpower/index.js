import { combineReducers } from 'redux';

import { DealerLocationTypeMaster } from './dealerLocationTypeMaster';
import { DealerDivisionMaster } from './dealerDivisionMaster';


export const DealerManpower = combineReducers({
    DealerLocationTypeMaster,
    DealerDivisionMaster,
});
