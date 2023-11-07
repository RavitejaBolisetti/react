/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {AddVehicleDetailsModal} from '@components/Sales/StockTransferIndent/AddVehicleDetailsModal';
import customRender from '@utils/test-utils';
import { Form } from 'antd';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';

const FormWrapper = (props) => {
    const [addVehicleDetailsForm] = Form.useForm();

    const myMock = {
        ...addVehicleDetailsForm,
        setFieldsValue:jest.fn(),
    }
    return <AddVehicleDetailsModal addVehicleDetailsForm={myMock} {...props} />
}

describe("AddVehicleDetailsModal",()=>{
    it("Model Description",()=>{
        const fieldNames = { label: 'prodctShrtName', value: 'prodctCode' };
        const mockStore = createMockStore({
            auth:{userId:123},
            data: {
                OTF: {
                    VehicleDetailsLov: { filteredListData: [{prodctCode:'Wipro', prodctShrtName:'t01'}] },
                },
            }
        })

        customRender(
            <Provider store={mockStore}>
                <FormWrapper isVisible={true} fieldNames={fieldNames} />
            </Provider>
        )

        const prodctCode = screen.getByRole('combobox', {name:'Model Description'});
        fireEvent.change(prodctCode, { target: { value: 'Wipro' } });
    })
})