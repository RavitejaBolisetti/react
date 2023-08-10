import React from 'react';
import { screen, fireEvent, logRoles } from '@testing-library/react';
import { Provider } from 'react-redux';
import { VehicleDetailsMaster } from '@components/Sales/OTF/VehicleDetails/VehicleDetailsMaster';
import customRender from '@utils/test-utils';
import { Form } from 'antd';
import createMockStore from '__mocks__/store';

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    return <VehicleDetailsMaster form={form} {...props} />;
};

describe("OtfMaster component render",()=>{

    it("test 5", async ()=>{
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                OTF: {
                    VehicleDetails: {
                        data: [{name: '1'}, {name:"2"}],
                        isLoaded: true
                    },
                    VehicleDetailsLov: {
                        filteredListData: [{name: '1'}, {name:"2"}],
                        isFilteredListLoaded: true
                    }
                },
                ProductHierarchy: {
                    filteredListData: [{name: '1'}, {name:"2"}],
                    isFilteredListLoaded: true
                }
            },
        });
        customRender(
        <Provider store={mockStore}>
            <FormWrapper typeData={'VEHCL_TYPE'} selectedOrderId={'hello'} onChange={jest.fn()} />
        </Provider>
        );
        const appActionCollapse = screen.getByRole("button", {name: 'Tax Details', exact: false});
        fireEvent.click(appActionCollapse);
        logRoles(screen.getByTestId('logRole'));
    });
});
