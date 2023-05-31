import { combineReducers } from 'redux';

import { DealerCompany } from './dealerCompany';
import { DealerParent } from './dealerParent';
import { DealerParentGroupSearch } from './dealerParentGroupSearch';
import { DealerParentTitle } from './dealerParentTitle';

export const DealerHierarchy = combineReducers({
    DealerParent,
    DealerCompany,
    DealerParentGroupSearch,
    DealerParentTitle,
});
