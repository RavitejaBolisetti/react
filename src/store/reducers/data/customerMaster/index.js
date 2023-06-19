import { combineReducers } from 'redux';

import { CustomerDetails } from './customerDetails';
import { CustomerDetailsIndividual } from './customerDetailsIndividual';
import { FamilyDetails } from './individual/familyDetails';
export const CustomerMaster = combineReducers({
    CustomerDetails,
    CustomerDetailsIndividual,
    FamilyDetails,
});
