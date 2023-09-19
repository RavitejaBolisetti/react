import React from 'react';
import { render } from '@testing-library/react';
import { ViewTermConditionList } from '@components/common/TermsAndConditions/DealerTermCondition/ViewTermConditionList';

afterEach(() => {
    jest.restoreAllMocks();
});
describe('ViewTermConditionList Component', () => {
    it('should render with provided data', () => {
        const formData = {
            productName: 'Sample Product',
            documentTypeCode: 'Doc Type 1',
            language: 'English',
            effectiveFrom: '2023-08-15',
            effectiveTo: '2023-08-31',
            version: '1.0',
            termConditionDescription: 'Sample terms and conditions',
        };

        render(<ViewTermConditionList formData={formData} isLoading={false} styles={{}} />);
    });
});
