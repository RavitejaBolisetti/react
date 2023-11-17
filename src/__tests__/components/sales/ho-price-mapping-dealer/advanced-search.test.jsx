/* eslint-disable jest/no-mocks-import */
import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { AdvancedSearch } from 'components/Sales/HoPriceMappingDealer/AdvancedSearch';
import customRender from '@utils/test-utils';
import { Form } from 'antd';

afterEach(() => {
    jest.restoreAllMocks();
});

jest.mock('store/actions/data/geo/states', () => ({
    geoStateDataActions: {},
}));

jest.mock('store/actions/data/geo/districts', () => ({
    geoDistrictDataActions: {},
}));

jest.mock('store/actions/data/geo/cities', () => ({
    geoCityDataActions: {},
}));

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

    it('search should work on click apply', async () => {
        const filterString = {
            products: 'Kai',
            areaOfficeName: 'Kai',
            state: 'Kai',
            pricingCity: 'Kai',
            productHierarchy: 'Kai',
        };

        const stateData = [{ key: '106', value: 'TestState', parentKey: 'IND', status: true }];
        const cityData = [{ key: '106', value: 'TestCity', parentKey: 'IND', status: true }];
        const productData = [{ key: '102', value: "testingproduct", prodctShrtName: "prodctShrtName", prodctCode: 'TestproductData', parentKey: 'IND', status: true }];

        customRender(<FormWrapper fetchStateLovList={jest.fn()} resetFields={jest.fn()} fetchDistrictLovList={jest.fn()} fetchCityLovList={jest.fn()} isVisible={true} filteredStateData={stateData} filteredCityData={cityData} productHierarchyList={productData} handleFilterChange={jest.fn()} filterString={filterString} setAdvanceSearchVisible={jest.fn()} setFilterString={jest.fn()} />);

        const stateSelect = screen.getByRole('combobox', { name: 'State' });
        fireEvent.change(stateSelect, { target: { value: 'TestState' } });
        const stateOptionSelect = screen.getByText('TestState');
        fireEvent.click(stateOptionSelect);

        const city = screen.getByRole('combobox', { name: 'City' });
        fireEvent.change(city, { target: { value: 'TestCity' } });
        const cityOptionSelect = screen.getByText('TestCity');
        fireEvent.click(cityOptionSelect);

        const productHierarchy = screen.getByRole('combobox', { name: 'Product Hierarchy' });
        fireEvent.change(productHierarchy, { target: { value: 'prodctShrtName' } });
        const TestproductOptionSelect = screen.getByText('prodctShrtName');
        fireEvent.click(TestproductOptionSelect);

        const searchBtn = screen.getByTestId('apply');
        fireEvent.click(searchBtn);
    });

    it('search should work on finish failed apply', async () => {
        const filterString = {
            products: 'Kai',
            areaOfficeName: 'Kai',
            state: 'Kai',
            pricingCity: 'Kai',
            productHierarchy: 'Kai',
        };

        const stateData = [{ key: '106', value: 'TestState', parentKey: 'IND', status: true }];
        const cityData = [{ key: '106', value: 'TestCity', parentKey: 'IND', status: true }];
        const productData = [{ key: '102', value: "testingproduct", prodctShrtName: "prodctShrtName", prodctCode: 'TestproductData', parentKey: 'IND', status: true }];

        customRender(<FormWrapper fetchStateLovList={jest.fn()} resetFields={jest.fn()} fetchDistrictLovList={jest.fn()} fetchCityLovList={jest.fn()} isVisible={true} filteredStateData={stateData} filteredCityData={cityData} productHierarchyList={productData} handleFilterChange={jest.fn()} filterString={filterString} setAdvanceSearchVisible={jest.fn()} setFilterString={jest.fn()} />);

        const stateSelect = screen.getByRole('combobox', { name: 'State' });
        fireEvent.change(stateSelect, { target: { value: 'TestState' } });
        const stateOptionSelect = screen.getByText('TestState');
        fireEvent.click(stateOptionSelect);

        const city = screen.getByRole('combobox', { name: 'City' });
        fireEvent.change(city, { target: { value: 'TestCity' } });
        const cityOptionSelect = screen.getByText('TestCity');
        fireEvent.click(cityOptionSelect);

        const searchBtn = screen.getByTestId('apply');
        fireEvent.click(searchBtn);
    });
});
