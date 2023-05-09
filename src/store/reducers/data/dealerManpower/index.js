import { combineReducers } from 'redux';

import { DealerLocationTypeMaster } from './dealerLocationTypeMaster';
import { DealerEmployeeDepartmentMaster } from './dealerEmployeeDepartmentMaster';

export const DealerManpower = combineReducers({
    DealerLocationTypeMaster,
    DealerEmployeeDepartmentMaster,
});
