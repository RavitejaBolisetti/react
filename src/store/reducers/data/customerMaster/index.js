import { combineReducers } from 'redux';

import { FamilyDetails } from './individual/familyDetails';
import { CorporateAccounts } from './corporateAccountRelated';
import { IndivisualAccounts } from './indivisualAccountRelated';

export const CustomerMaster = combineReducers({
    FamilyDetails,
    CorporateAccounts,
    IndivisualAccounts,
});
