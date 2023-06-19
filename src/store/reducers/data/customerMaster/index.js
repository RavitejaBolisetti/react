import { combineReducers } from 'redux';

import { FamilyDetails } from './individual/familyDetails';
import { CorporateAccounts } from './corporateAccountRelated';
import { IndivisualAccounts } from './indivisualAccountRelated';

import { CustomerDetails } from './customerDetails';
import { CustomerDetailsIndividual } from './customerDetailsIndividual';
export const CustomerMaster = combineReducers({
    CustomerDetails,
    CustomerDetailsIndividual,
    FamilyDetails,
    CorporateAccounts,
    IndivisualAccounts,
});
