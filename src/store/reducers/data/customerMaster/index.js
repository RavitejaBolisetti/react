import { combineReducers } from 'redux';

import { CorporateAccounts } from './corporateAccountRelated';
import { IndivisualAccounts } from './indivisualAccountRelated';
export const CUSTOMERMASTER = combineReducers({
    CorporateAccounts,
    IndivisualAccounts,
});
