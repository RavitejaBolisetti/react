import React from 'react';
import { render, screen } from '@testing-library/react';
import { ViewTermConditionList } from '@components/common/TermsAndConditions/ManufacturerTermCondition/ViewTermConditionList'


afterEach(() => {
    jest.restoreAllMocks();
});
describe('ViewTermConditionList Component', () => {
  it('should render with provided data', () => {
    const formData = {
      productName: 'Sample Product',
      documentTypeCode: 'Doc Type 1',
      languageDesc: 'English',
      effectivefrom: '2023-08-15',
      effectiveto: '2023-08-31',
      version: '1.0',
      termsconditiondescription: 'Sample terms and conditions',
    };

    render(
      <ViewTermConditionList formData={formData} isLoading={false} styles={{}} />
    );

    expect(screen.getByText('Product Hierarchy')).toBeInTheDocument();
    expect(screen.getByText('Sample Product')).toBeInTheDocument();

    expect(screen.getByText('Document Type')).toBeInTheDocument();
    expect(screen.getByText('Doc Type 1')).toBeInTheDocument();

    expect(screen.getByText('Language')).toBeInTheDocument();
    expect(screen.getByText('English')).toBeInTheDocument();

    expect(screen.getByText('Effective From')).toBeInTheDocument();

    expect(screen.getByText('Effective To')).toBeInTheDocument();

    expect(screen.getByText('Version')).toBeInTheDocument();
    expect(screen.getByText('1.0')).toBeInTheDocument();

    expect(screen.getByText('Terms & Conditions')).toBeInTheDocument();
    expect(screen.getByText('Sample terms and conditions')).toBeInTheDocument();
  });


});
