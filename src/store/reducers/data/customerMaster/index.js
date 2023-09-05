/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { combineReducers } from 'redux';
import { IndiviualProfile } from './individual/indiviualProfile';
import { FamilyDetails } from './individual/familyDetails';
import { FamilyDetailSearch } from './individual/familyDetailSearch';
import { CorporateAccounts } from './corporateAccountRelated';
import { IndivisualAccounts } from './indivisualAccountRelated';
import { CustomerDetails } from './customerDetails';
import { CustomerDetailsIndividual } from './customerDetailsIndividual';
import { CompanyProfile } from './corporateCompanyProfile';
import { Corporate } from './corporate';
import { AddressIndividual } from './individual/individualAddress';
import { CorporateAddress } from './corporate/corporateAddress';

import { NameChangeRequest } from './individual/nameChangeRequest';
import { CustomerParentCompany } from './customerParentCompany';
import { ViewDocument } from './documentView';
import {customerMobileDetail} from './searchMobileNumber';

export const CustomerMaster = combineReducers({
    IndiviualProfile,
    CustomerDetails,
    CustomerDetailsIndividual,
    FamilyDetails,
    FamilyDetailSearch,
    CorporateAccounts,
    IndivisualAccounts,
    CompanyProfile,
    Corporate,
    AddressIndividual,
    NameChangeRequest,
    CustomerParentCompany,
    CorporateAddress,
    ViewDocument,
    customerMobileDetail,
});
