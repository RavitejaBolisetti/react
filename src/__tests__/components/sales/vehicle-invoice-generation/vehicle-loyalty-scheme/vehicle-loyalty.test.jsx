import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { LoyaltySchemeMaster } from '@components/Sales/VehicleInvoiceGeneration/LoyaltyScheme/LoyaltySchemeMaster';
import customRender from '@utils/test-utils';
import { Form, Button } from 'antd';
import createMockStore from '__mocks__/store';

jest.mock('store/actions/data/otf/loyaltyAndScheme', () => ({
    otfLoyaltySchemeDataActions: {},
}));

jest.mock('@components/Sales/Common/LoyaltyScheme/AddEditForm', () => {
    const AddEditForm = ({ onFinish }) => (
        <div>
            <button onClick={onFinish}>Save</button>
        </div>
    );
    return {
        __esModule: true,
        AddEditForm,
    };
});

const StatusBar = () => <div>No Status Bar</div>;

const FormActionButton = () => (
    <div>
        <Button htmlType="submit" type="primary">
            Save
        </Button>
    </div>
);

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    const myForm = {
        ...form,
        resetFields: jest.fn(),
        setFieldsValue: jest.fn(),
    };
    return <LoyaltySchemeMaster form={myForm} {...props} />;
};

describe('Invoice Generation Invoice Details render', () => {
    it('should render component ', async () => {
        const formActionType = { addMode: true };
        customRender(<FormWrapper StatusBar={StatusBar} FormActionButton={FormActionButton} formActionType={formActionType} setButtonData={jest.fn()} />);
    });

    it('test1 ', async () => {
        const formActionType = { viewMode: true };
        customRender(<FormWrapper StatusBar={StatusBar} FormActionButton={FormActionButton} formActionType={formActionType} setButtonData={jest.fn()} />);
    });

    it('test2', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                OTF: {
                    LoyaltyScheme: { isLoaded: true, data: [{ customerCode: 106 }] },
                    // SchemeDetail: { isLoaded: (isSchemeLovDataLoaded = false), isLoading: isSchemeLovLoading, data: (schemeLovData = []) },
                    LoyaltyModelGroup: { isLoaded: true, data: [{ id: 106, value: 'kai' }] },
                    LoyaltyVarient: { isLoaded: true, data: [{ id: 106, value: 'kai' }] },
                },
                // ConfigurableParameterEditing: { filteredListData: (typeData = []) },
            },
            // customer: {
            //     customerDetail: { isLoaded: (isDataCustomerLoaded = false), isLoading: (isCustomerLoading = false), data: (customerDetail = []) },
            // },
        });
        const formActionType = { viewMode: false };
        const fetchList = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <FormWrapper fetchList={fetchList} selectedOrder={'123'} StatusBar={StatusBar} FormActionButton={FormActionButton} formActionType={formActionType} setButtonData={jest.fn()} />
            </Provider>
        );
    });
});
