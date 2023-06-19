import { combineReducers } from 'redux';

import { CustomerDetails } from './customerDetails';
import { CustomerDetailsIndividual } from './customerDetailsIndividual';
export const CustomerMaster = combineReducers({
    CustomerDetails,
    CustomerDetailsIndividual,
});
