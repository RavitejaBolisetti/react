import { combineReducers } from 'redux';

import { DealerCompany } from './dealerCompany';
import { DealerParent } from './dealerParent';

export const DealerHierarchy = combineReducers({
    DealerParent,
    DealerCompany,
});
