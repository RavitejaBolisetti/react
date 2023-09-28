import React from 'react';
import { fireEvent, screen, act } from '@testing-library/react';
import { AdvancedSearch } from 'components/Sales/HoPriceMappingDealer/AdvancedSearch';
import customRender from '@utils/test-utils';
import { Form } from 'antd';

afterEach(() => {
    jest.restoreAllMocks();
});

const FormWrapper = (props) => {
    const [advanceFilterForm] = Form.useForm();

    const myFormMock = {
        ...advanceFilterForm,
        resetFields: jest.fn(),
    };
    return <AdvancedSearch advanceFilterForm={myFormMock} {...props} />;
};

describe('Advanced Search Component', () => {
    it('should render advanced search component', () => {
        customRender(<FormWrapper isVisible={true} handleFilterChange={jest.fn()} />);
    });

    it('search should work on click apply', () => {
        const filterString = {
            products: 'Kai',
            areaOfficeName: 'Kai',
            state: 'Kai',
            pricingCity: 'Kai',
            productHierarchy: 'Kai',
        };

        customRender(<FormWrapper isVisible={true} handleFilterChange={jest.fn()} filterString={filterString} setAdvanceSearchVisible={jest.fn()} setFilterString={jest.fn()} />);

        const applyBtn = screen.getByRole('button', { name: 'Apply' });
        fireEvent.click(applyBtn);
    });
});
