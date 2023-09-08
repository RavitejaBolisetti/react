import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { AddEditForm } from 'components/FinancialAccounting/AccountTaxCharges/TaxAndCharges/AddEditForm';

const fieldNames={
    title: ''
}

const props={
    isVisible: true,
    fieldNames: fieldNames,
    setAttributeType: jest.fn(),
    setSelectedTreeSelectKey: jest.fn(),
    setCalculationType: jest.fn()
}

describe('TaxCharges - Add Edit Form Component', () => {
    it('should render the add edit form correctly', () => {
        customRender(<AddEditForm {...props}/>)
    });

    it('add child form should work', () => {
        const attributeData=[{id: 106}];
        const formData={attributeTypeCode: 106};
        const flatternData=[{key: 106}];
        customRender(<AddEditForm flatternData={flatternData} formActionType={'child'} attributeData={attributeData} formData={formData} {...props} />)
    });

    it('add sibling form should work', () => {
        const attributeData=[{id: 107}];
        const unFilteredAttributeData=[{id: 106}];
        const formData={attributeTypeCode: 106};
        const flatternData=[{key: 106}];
        customRender(<AddEditForm selectedTreeKey={[106]} flatternData={flatternData} formActionType={'sibling'} attributeData={attributeData} unFilteredAttributeData={unFilteredAttributeData} formData={formData} {...props}/>)
    });
});
