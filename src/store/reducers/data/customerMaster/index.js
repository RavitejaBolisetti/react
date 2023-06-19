import { combineReducers } from 'redux';
import { IndiviualProfile } from './individual/indiviualProfile';
import { FamilyDetails } from './individual/familyDetails';

export const CustomerMaster = combineReducers({
    IndiviualProfile,
    FamilyDetails,
});
