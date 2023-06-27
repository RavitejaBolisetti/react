/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { combineReducers } from 'redux';

import { ProductHierarchyData } from './tncProductHierarchy';
import { DocumentTypeData } from './tncDocumentType';
import { LanguageData } from './tncLanguage';
//import { FetchTermsConditionsList } from './tncFectchDealerList';
import { DealerTermsConditions } from './tncDealerSave';
import { ManufacturerTermsConditions } from './termConditionManufacturerReducer';
import { ChangeHistoryTermsConditions } from './changeHistoryReducer';
import { ChangeHistoryManufacturerTermsConditions } from './changeHistoryManufacturerTermsConditionsReducer';

export const TermCondition = combineReducers({
    ProductHierarchyData,
    DocumentTypeData,
    LanguageData,
    //FetchTermsConditionsList,
    DealerTermsConditions,
    ManufacturerTermsConditions,
    ChangeHistoryTermsConditions,
    ChangeHistoryManufacturerTermsConditions,
});
