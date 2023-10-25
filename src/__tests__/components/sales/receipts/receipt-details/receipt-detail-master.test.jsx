import '@testing-library/jest-dom/extend-expect';
import { ReceiptDetailMaster } from '@components/Sales/Receipts/ReceiptDetails/ReceiptDetailMaster';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import { Form } from 'antd';
import { Provider } from 'react-redux';
import createMockStore from '__mocks__/store';

afterEach(() => {
    jest.restoreAllMocks();
});

jest.mock('store/actions/data/receipt/partyDetails', () => ({
    partyDetailDataActions: {},
}));

jest.mock('store/actions/data/partyMaster', () => ({
    partyMasterDataActions: {},
}));

const buttonData = {
    closeBtn: true,
    cancelBtn: true,
    editBtn: true,
    allotBtn: true,
    unAllotBtn: true,
    invoiceBtn: true,
    deliveryNoteBtn: true,
    transferOTFBtn: true,
    cancelOTFBtn: true,
    changeHistory: true,
    nextBtn: true,
    saveBtn: true,
    formBtnActive: true,
    cancelReceiptBtn: true,
};

const FormWrapper = (props) => {
    const [receiptForm] = Form.useForm();
    const myFormMock = {
        ...receiptForm,
        setFieldsValue: jest.fn(),
        validateFields: jest.fn().mockResolvedValue([{ name: 'Kai' }]),
        resetFields: jest.fn(),
        getFieldsValue: jest.fn().mockResolvedValue([{ name: 'Kai' }]),
    };
    return <ReceiptDetailMaster receiptForm={myFormMock} {...props} />;
};

describe('Receipts details Master components', () => {
    it('should render components', () => {
        customRender(<FormWrapper />);
    });
    it('should render components when view mode is true', () => {
        const formActionType = {
            viewMode: true,
        };
        customRender(<FormWrapper formActionType={formActionType} handleCollapse={jest.fn()} />);

        const plusImg = screen.getAllByRole('img', { name: /plus/i });
        fireEvent.click(plusImg[0]);
    });

    it('should click next button', () => {
        const props = {
            saveButtonName: 'Save & Next',
        };
        const receiptType = [{ key: 106, value: 'Kai' }];

        customRender(<FormWrapper {...props} setButtonData={jest.fn()} buttonData={buttonData} handleButtonClick={jest.fn()} receiptType={receiptType} />);

        const saveBtn = screen.getByRole('button', { name: 'Save & Next' });
        fireEvent.click(saveBtn);
    });

    it('test1', async () => {
        const props = { formActionType: { editMode: true } };
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                PartyMaster: {
                    isLoaded: true,
                    data: [
                        {
                            receiptDate: '2023-10-04',
                            receiptNumber: 'REC1696487024044',
                            receiptStatus: 'O',
                            receiptType: 'A',
                            remarks: 'Test123',
                            totalApportionAmount: null,
                            totalReceivedAmount: 1000,
                            totalWriteOffAmount: null,
                            paymentDetails: [
                                { bankLocationName: 'delhi', bankName: 'PNB', ccServiceChargeAmount: 100, ccServiceChargePercentage: 80, creditCardNumber: '1212121', creditCardTransNumber: '121', creditCardType: 'COR', ddCheckDate: '21/2/2000', ddCheckNumber: 1121, dealerBankCode: 101, dealerBankName: 'ICICI', digitalTransferFlag: null, id: '81642e9a-c03c-4efd-95a0-a608673a8a9d', paymentBankLocation: 'delhi', paymentBankName: 'PAYTM', paymentBankPartyId: 'CU1121', paymentMode: 'C', receivedAmount: 1000, taxChargeAmount: 120, transactionDate: '2023-10-05', transactionNumber: '121212' },
                            ],
                        },
                    ],
                },
            },
        });
        const receiptType = [{ key: 1, value: 'kai' }];

        const fetchCustomerDetail = jest.fn();
        const fetchPartyDetail = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <FormWrapper {...props} handleButtonClick={jest.fn()} setButtonData={jest.fn()} receiptType={receiptType} fetchCustomerDetail={fetchCustomerDetail} fetchPartyDetail={fetchPartyDetail} />
            </Provider>
        );

        const plusBtn = screen.getAllByRole('img', { name: /plus/i });
        fireEvent.click(plusBtn[0]);

        const actDate = screen.getByRole('textbox', { name: /Actual Receipt Date/i });

        fireEvent.change(actDate, { target: { value: '21/12/2000' } });

        const reciptType = screen.getByRole('combobox', { name: /Receipt Type/i });
        fireEvent.change(reciptType, { target: { value: 'Advance' } });
    });
});
