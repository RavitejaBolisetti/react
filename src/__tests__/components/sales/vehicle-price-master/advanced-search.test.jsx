/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import { AdvancedSearch } from 'components/Sales/VehiclePriceMaster/AdvancedSearch';
import { Form } from 'antd';

const FormWrapper = (props) => {
    const [advanceFilterForm] = Form.useForm();

    const myFormMock = {
        ...advanceFilterForm,
        resetFields: jest.fn(),
    };
    return <AdvancedSearch advanceFilterForm={myFormMock} {...props} />;
};

describe('advanced search component render', () => {

    it("should render advanced search component",async ()=>{
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                Geo: {
                    State: { filteredListData: [{"key":"DEL","value":"DELHI1","parentKey":"IND"}] },
                },
                TermCondition: {
                    ProductHierarchyData: { data: [{"prodctCode":"DEL","prodctShrtName":"DELHI1","parentKey":"IND"}]},
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <FormWrapper handleFilterChange={jest.fn()} isVisible={true} filteredCityData={[{name: 'test'}]} />
            </Provider>
        );
    });

});
