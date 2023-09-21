import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import FinananceDetailsMaster from '@components/Sales/Common/FinananceDetails/FinananceDetailsMaster';
import customRender from '@utils/test-utils';
import { Button, Form } from 'antd';
import createMockStore from '__mocks__/store';

beforeEach(() => {
    jest.clearAllMocks();
});

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    return <FinananceDetailsMaster form={form} {...props} />;
};

const StatusBar = () => <div>No Status Bar</div>;

const FormActionButton = () => (
    <div>
        <Button htmlType="submit" type="primary">
            Save
        </Button>
    </div>
);

const FNC_ARNGD = [
    { key: '1', value: 'Finance Option 1' },
    { key: '2', value: 'Finance Option 2' },
];

const props = {
    saveData: jest.fn(),
    resetData: jest.fn(),
    fetchList: jest.fn(),
    listShowLoading: jest.fn(),
    financeData: { branch: 'Ram', doDate: null, doNumber: null, doReceived: '9001', emi: 981, fileNumber: 'a1mN0000004R5nJIAS', financeDone: 'Deal', financier: null, financierCode: 'Ram', id: '3c2078d1-eedd-463a-b104-1bff2208a31f', loanAmount: 2000.9, otfNumber: 'OTF1690455272392' },
    isFinanceLovDataLoaded: true,
    setFormActionType: jest.fn(),
    isFinanceLovLoading: undefined,
    FinanceLovData: {
        key: 'FI002',
        parentKey: null,
        value: 'HDFC',
    },
    fetchFinanceLovList: jest.fn(),
    listFinanceLovShowLoading: jest.fn(),
    section: { displayOnList: true, id: 6, title: 'Finance Details' },
    isLoading: false,
    handleFormValueChange: jest.fn(),
    handleButtonClick: jest.fn(),
    NEXT_ACTION: jest.fn(),
};

describe('Booking finance view Details render', () => {
    const defaultBtnVisiblity = {
        editBtn: true,
        saveBtn: true,
        cancelBtn: true,
        saveAndNewBtn: true,
        saveAndNewBtnClicked: true,
        closeBtn: true,
        formBtnActive: true,
        cancelOTFBtn: true,
        transferOTFBtn: true,
        allotBtn: true,
        unAllotBtn: true,
        invoiceBtn: true,
        deliveryNote: true,
        changeHistory: true,
    };

    it('finance form input should work', () => {
        const prop2 = { formActionType: { viewMode: false } };
        customRender(<FormWrapper setFormData={jest.fn} resetData={jest.fn()} {...prop2} typeData={FNC_ARNGD} FormActionButton={FormActionButton} StatusBar={StatusBar} />);

        const financier = screen.getByRole('combobox', { name: /Finance Arranged By/i });
        fireEvent.change(financier, { target: { value: 'Self' } });
    });
    it('should render when view mode is true', async () => {
        const prop2 = { formActionType: { viewMode: true } };
        customRender(<FormWrapper setFormData={jest.fn} resetData={jest.fn()} {...prop2} typeData={FNC_ARNGD} FormActionButton={FormActionButton} StatusBar={StatusBar} />);
    });

    it('cancel button should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
        });
        customRender(
            <Provider store={mockStore}>
                <FormWrapper {...props} buttonData={defaultBtnVisiblity} onCloseAction={jest.fn()} typeData={FNC_ARNGD} FormActionButton={FormActionButton} StatusBar={StatusBar} />
            </Provider>
        );
    });

    it('save button should work with on finish', async () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
        });
        customRender(
            <Provider store={mockStore}>
                <FormWrapper {...props} StatusBar={StatusBar} buttonData={defaultBtnVisiblity} setButtonData={jest.fn()} onCloseAction={jest.fn()} onSuccess={jest.fn()} handleFormValueChange={jest.fn()} handleFieldsChange={jest.fn()} onFinish={jest.fn()} onFinishFailed={jest.fn()} typeData={FNC_ARNGD} FormActionButton={FormActionButton} />
            </Provider>
        );

        const saveBtn = screen.getByRole('button', { name: /save/i });
        fireEvent.click(saveBtn);
    });
});
