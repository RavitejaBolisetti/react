import { combineReducers } from 'redux';

import { ProductHierarchyData } from './tncProductHierarchy';
import { DocumentTypeData } from './tncDocumentType';
import { LanguageData } from './tncLanguage';
import { FetchTermsConditionsList } from './tncFectchDealerList';
import { DealerTermsConditions } from './tncDealerSave';

export const TermCondition = combineReducers({
    ProductHierarchyData,
    DocumentTypeData,
    LanguageData,
    FetchTermsConditionsList,
    DealerTermsConditions,
});
