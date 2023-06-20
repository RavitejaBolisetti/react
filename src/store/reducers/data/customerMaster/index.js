import { combineReducers } from 'redux';
import { IndiviualProfile } from './individual/indiviualProfile';
import { FamilyDetails } from './individual/familyDetails';

import { CorporateAccounts } from './corporateAccountRelated';
import { IndivisualAccounts } from './indivisualAccountRelated';

import { CustomerDetails } from './customerDetails';
import { CustomerDetailsIndividual } from './customerDetailsIndividual';
import { CompanyProfile } from './corporateCompanyProfileReducer';
export const CustomerMaster = combineReducers({
    IndiviualProfile,
    CustomerDetails,
    CustomerDetailsIndividual,
    FamilyDetails,
    CorporateAccounts,
    IndivisualAccounts,
    CompanyProfile,
});
