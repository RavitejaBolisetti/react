import React from 'react';
import { InsuranceDetailsMaster } from '@components/Sales/OTF/InsuranceDetails/InsuranceDetailsMaster';
import customRender from '@utils/test-utils';
// eslint-disable-next-line jest/no-mocks-import
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import { Button } from 'antd';
import { Form } from 'antd';
import { screen, fireEvent, waitFor } from '@testing-library/react';

beforeEach(() => {
    jest.clearAllMocks();
});

jest.mock('store/actions/data/otf/insuranceDetail', () => ({
    insuranceDetailDataActions: {}
}));

const StatusBar = () => <div>No Status Bar</div>;

const FormActionButton = () => (
    <div>
        <Button htmlType="submit" type="primary">
            Save
        </Button>
    </div>
);

jest.mock('@components/Sales/Common/InsuranceDetails/AddEditForm', () => {
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
        customRender(<FormWrapper {...props} StatusBar={StatusBar} setButtonData={jest.fn()} FormActionButton={FormActionButton} />);
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
                <FormWrapper selectedOrderId={'123'} setButtonData={jest.fn()} {...props} StatusBar={StatusBar} FormActionButton={FormActionButton} onErrorAction={jest.fn()} />
            </Provider>
        );

        const insuranceDetails = screen.getByText('Insurance Details');
        expect(insuranceDetails).toBeTruthy();
    });

    it('should render when view mode is false', async () => {
        const prop2 = { formActionType: { viewMode: false }, insuranceData: [], onCloseAction: jest.fn(), fetchList: jest.fn(), isDataLoaded: true, listShowLoading: jest.fn(), showGlobalNotification: jest.fn(), handleFormValueChange: jest.fn(), section: { displayOnList: true, id: 5, title: 'Insurance Details' }, isLoading: false, NEXT_ACTION: jest.fn(), handleButtonClick: jest.fn(), onFinishFailed: jest.fn(), onErrorAction: jest.fn() };
        customRender(<FormWrapper setFormData={jest.fn} {...prop2} setButtonData={jest.fn()} StatusBar={StatusBar} FormActionButton={FormActionButton} />);
    });

    it('test for onSuccess', async () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                OTF: {
                    InsuranceDetail: { isLoaded: true, data: [{ id: '8d461821-fa8b-4646-a4a2-783b6a5efc22', insuranceAmount: 39400, insuranceCompany: '11', insuranceCoverNote: 'MBDSJH7878', insuranceDate: '2023-10-03T18:30:00.000+00:00', otfId: '7e6f4990-f57d-477f-bace-ecd3da30ae5a', otfNumber: 'B-1332995', registrationNumber: 'MBDS77837' }] },
                },
            },
        });

        const res = { data: [{ id: '8d461821-fa8b-4646-a4a2-783b6a5efc22', insuranceAmount: 39400, insuranceCompany: '11', insuranceCoverNote: 'MBDSJH7878', insuranceDate: '2023-10-03T18:30:00.000+00:00', otfId: '7e6f4990-f57d-477f-bace-ecd3da30ae5a', otfNumber: 'B-1332995', registrationNumber: 'MBDS77837' }] };

        const saveData = jest.fn();
        const fetchList = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <FormWrapper saveData={saveData} fetchList={fetchList} handleButtonClick={jest.fn()} setButtonData={jest.fn()} onCloseAction={jest.fn()} StatusBar={StatusBar} FormActionButton={FormActionButton} resetData={jest.fn()} />
            </Provider>
        );

        const saveBtn = screen.getAllByRole('button', { name: 'Save' });

        fireEvent.click(saveBtn[1]);

        await waitFor(() => { expect(saveData).toHaveBeenCalled() });

        saveData.mock.calls[0][0].onSuccess(res);
    });
});
