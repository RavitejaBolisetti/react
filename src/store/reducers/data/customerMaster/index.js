import { combineReducers } from 'redux';
import { IndiviualProfile } from './individual/indiviualProfile';
import { FamilyDetails } from './individual/familyDetails';
import { FamilyDetailSearch } from './individual/familyDetailSearch';
import { CorporateAccounts } from './corporateAccountRelated';
import { IndivisualAccounts } from './indivisualAccountRelated';

import { CustomerDetails } from './customerDetails';
import { CustomerDetailsIndividual } from './customerDetailsIndividual';
import { CorporateLov } from './corporateLov';
import { ChangeHistoryIndividualName } from './individual/nameChangeHistory';
export const CustomerMaster = combineReducers({
    IndiviualProfile,
    CustomerDetails,
    CustomerDetailsIndividual,
    FamilyDetails,
    FamilyDetailSearch,
    CorporateAccounts,
    IndivisualAccounts,
    CorporateLov,
    ChangeHistoryIndividualName,
});
