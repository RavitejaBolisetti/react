import '@testing-library/jest-dom/extend-expect';
import { ReceiptDetailMaster } from '@components/Sales/Receipts/ReceiptDetails/ReceiptDetailMaster';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import { Form } from 'antd';

afterEach(() => {
    jest.restoreAllMocks();
});

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
});
