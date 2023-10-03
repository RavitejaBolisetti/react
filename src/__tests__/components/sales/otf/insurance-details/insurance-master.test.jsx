import React from 'react';
import { screen } from '@testing-library/react';
import { InsuranceDetailsMaster } from '@components/Sales/OTF/InsuranceDetails/InsuranceDetailsMaster';
import customRender from '@utils/test-utils';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import { Button } from 'antd';
import { Form } from 'antd';

beforeEach(() => {
    jest.clearAllMocks();
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
    const myFormMock = {
        ...form,
        setFieldsValue: jest.fn(),
        resetFields: jest.fn(),
        resetData: jest.fn(),
        validateFields: jest.fn(),
    };
    return <InsuranceDetailsMaster form={myFormMock} {...props} />;
};

const props = {
    insuranceData: [],
    onCloseAction: jest.fn(),
    fetchList: jest.fn(),
    formActionType: { viewMode: true },
    isDataLoaded: true,
    listShowLoading: jest.fn(),
    showGlobalNotification: jest.fn(),
    handleFormValueChange: jest.fn(),
    section: { displayOnList: true, id: 5, title: 'Insurance Details' },
    isLoading: false,
    NEXT_ACTION: jest.fn(),
    handleButtonClick: jest.fn(),
    onFinishFailed: jest.fn(),
    onErrorAction: jest.fn(),
};

describe('Booking Insurance Details Component render', () => {
    it('should render addedit form', async () => {
        customRender(<FormWrapper {...props} StatusBar={StatusBar} FormActionButton={FormActionButton} />);
    });

    it('should render all fields', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                OTF: {
                    InsuranceDetail: {
                        isLoaded: true,
                        data: [{ name: '1' }, { name: '2' }],
                    },
                },
            },
        });

        customRender(
            <Provider store={mockStore}>
                <FormWrapper selectedOrderId={'123'} {...props} StatusBar={StatusBar} FormActionButton={FormActionButton} onErrorAction={jest.fn()} />
            </Provider>
        );

        const insuranceDetails = screen.getByText('Insurance Details');
        expect(insuranceDetails).toBeTruthy();
    });

    it('should render when view mode is false', async () => {
        const prop2 = { formActionType: { viewMode: false }, insuranceData: [], onCloseAction: jest.fn(), fetchList: jest.fn(), isDataLoaded: true, listShowLoading: jest.fn(), showGlobalNotification: jest.fn(), handleFormValueChange: jest.fn(), section: { displayOnList: true, id: 5, title: 'Insurance Details' }, isLoading: false, NEXT_ACTION: jest.fn(), handleButtonClick: jest.fn(), onFinishFailed: jest.fn(), onErrorAction: jest.fn() };
        customRender(<FormWrapper setFormData={jest.fn} {...prop2} StatusBar={StatusBar} FormActionButton={FormActionButton} />);
    });
});
