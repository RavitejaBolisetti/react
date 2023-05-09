import { combineReducers } from 'redux';

import { DealerLocationTypeMaster } from './dealerLocationTypeMaster';
import { DealerDivisionMaster } from './dealerDivisionMaster';
import { BayTypeMaster } from './bayMasterType';
import { DealerEmployeeDepartmentMaster } from './dealerEmployeeDepartmentMaster';

export const DealerManpower = combineReducers({
    DealerLocationTypeMaster,
    DealerDivisionMaster,
    BayTypeMaster,
    DealerEmployeeDepartmentMaster,
});
