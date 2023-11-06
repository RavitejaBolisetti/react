/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { translateContent } from 'utils/translateContent';

export const PRODUCT_HIERARCHY_TYPE = {
    MODEL: {
        KEY: 'MD',
        TYPE: 'Model',
        TITLE: translateContent('productHierarchy.productHierarchType.model'),
    },
    MODEL_FAMILY: {
        KEY: 'MF',
        TYPE: 'Model Family',
        TITLE: translateContent('productHierarchy.productHierarchType.modelFamily'),
    },
    MODEL_GROUP: {
        KEY: 'MG',
        TYPE: 'Model Group',
        TITLE: translateContent('productHierarchy.productHierarchType.modelGroup'),
    },
    MODEL_VARIANT: {
        KEY: 'MV',
        TYPE: 'Model Variant',
        TITLE: translateContent('productHierarchy.productHierarchType.modelVariant'),
    },
    PRODUCT_DIVISION: {
        KEY: 'PD',
        TYPE: 'Product Division',
        TITLE: translateContent('productHierarchy.productHierarchType.productDivision'),
    },
    PRODUCT_HIERARCHY: {
        KEY: 'PH',
        TYPE: 'Product Hierarchy',
        TITLE: translateContent('productHierarchy.productHierarchType.productHierarchy'),
    },
};
