import '@testing-library/jest-dom/extend-expect';
import { ApportionDetailForm } from '@components/Sales/Receipts/ApportionDetails/ModalApportionDetail';
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
    return <ApportionDetailForm apportionForm={myFormMock} {...props} />;
};

describe('Receipts apportion details Master components', () => {
    it('should render components', () => {
        customRender(<FormWrapper showApportionForm={true} onFinishFailed={jest.fn()} />);
    });

    it('should click on close', () => {
        customRender(<FormWrapper showApportionForm={true} onFinishFailed={jest.fn()} />);

        const addBtn = screen.getByRole('button', { name: 'Add' });
        fireEvent.click(addBtn);

        const closeBtn = screen.getByRole('button', { name: /Cancel/i });
        fireEvent.click(closeBtn);
    });

    it('should click on search', () => {
        customRender(<FormWrapper showApportionForm={true} onFinishFailed={jest.fn()} />);

        const addBtn = screen.getByRole('button', { name: 'Add' });
        fireEvent.click(addBtn);

        const docType = screen.getByRole('combobox', { name: 'Document Type' });
        fireEvent.change(docType, { target: { value: 'RRR' } });
        fireEvent.click(docType);

        const docNo = screen.getByRole('textbox', { name: 'Document Number' });
        fireEvent.change(docNo, { target: { value: '112' } });
        const closeCircle = screen.getByRole('img', { name: /close-circle/i });
        fireEvent.click(closeCircle);
        fireEvent.change(docNo, { target: { value: '11' } });

        const serchBtn = screen.getByRole('button', { name: 'search' });
        fireEvent.click(serchBtn);
    });
});
