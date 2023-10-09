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

        const res = [{
            "id": "4a50fd6d-a788-4313-96dc-8b4fe9b8d7d1",
            "state": "Uttar Pradesh",
            "city": "KURNOOL",
            "enabledDate": "2017-07-01T00:00:00.000+00:00",
            "enabledBy": "Sakshi",
            "dealerBranch": "AM02",
            "dealerParent": "SUPREME MOBILES PVT LTD.",
            "dealerSelectOnRoadPrice": true,
            "modelDealerMapResponse": null
          }]

        customRender(<FormWrapper isVisible={true} filteredStateData={res} handleFilterChange={jest.fn()} filterString={filterString} setAdvanceSearchVisible={jest.fn()} setFilterString={jest.fn()} />);

        const applyBtn = screen.getByRole('button', { name: 'Apply' });
        fireEvent.click(applyBtn);
    });
});
