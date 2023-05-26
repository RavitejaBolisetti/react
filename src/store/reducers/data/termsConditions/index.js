import { combineReducers } from 'redux';

import { ProductHierarchyData } from './tncProductHierarchy';
import { DocumentTypeData } from './tncDocumentType';
import { LanguageData } from './tncLanguage';

export const TermCondition = combineReducers({
    ProductHierarchyData,
    DocumentTypeData,
    LanguageData,
});
