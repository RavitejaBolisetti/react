import '@testing-library/jest-dom/extend-expect';
import { AddEditForm } from 'components/Sales/Receipts/ApportionDetails/AddEditForm';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import { Form } from 'antd';

afterEach(() => {
    jest.restoreAllMocks();
});

const FormWrapper = (props) => {
    const [apportionForm] = Form.useForm();
    const myFormMock = {
        ...apportionForm,
        setFieldsValue: jest.fn(),
        validateFields: jest.fn().mockResolvedValue([{ name: 'Kai' }]),
        resetFields: jest.fn(),
        getFieldsValue: jest.fn().mockResolvedValue([{ name: 'Kai' }]),
    };
    return <AddEditForm apportionForm={myFormMock} {...props} />;
};

describe('Receipts apportion details Master components', () => {
    it('should render components', () => {
        const apportionList = [
            { apportionedAmount: 0 }
        ];
        const receiptDetailData ={ apportionDetails:[{ key: '1', value: 'kai' }] };
        customRender(<FormWrapper isVisible={true} totalReceivedAmount={10} showApportionForm={true} setShowApportionForm={jest.fn()} receiptDetailData={receiptDetailData} apportionList={apportionList} setApportionList={jest.fn()} />);
        const plusAdd=screen.getByRole('button', { name: 'plus Add' });
        fireEvent.click(plusAdd);

        const cancelBtn=screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancelBtn);
    });

    it('test1', () => {
        const apportionList = [
            { apportionedAmount: 0 }
        ];
        const receiptDetailData ={ apportionDetails:[{ key: '1', value: 'kai' }] };
        customRender(<FormWrapper isVisible={true} totalReceivedAmount={10} setShowApportionForm={jest.fn()} receiptDetailData={receiptDetailData} apportionList={apportionList} setApportionList={jest.fn()} />);
        const plusAdd=screen.getByRole('button', { name: 'plus Add' });
        fireEvent.click(plusAdd);

        const closeBtn=screen.getByRole('button', { name: 'Close' });
        fireEvent.click(closeBtn);
    });

    it('test2', () => {
        const apportionList = [
            { apportionedAmount: 0 }
        ];
        const receiptDetailData ={ apportionDetails:[{ key: '1', value: 'kai' }] };
        customRender(<FormWrapper isVisible={true} totalReceivedAmount={10} showApportionForm={true} setShowApportionForm={jest.fn()} receiptDetailData={receiptDetailData} apportionList={apportionList} setApportionList={jest.fn()} />);
        const plusAdd=screen.getByRole('button', { name: 'plus Add' });
        fireEvent.click(plusAdd);

        const cancelBtn=screen.getByRole('button', { name: 'Add' });
        fireEvent.click(cancelBtn);
    });



});