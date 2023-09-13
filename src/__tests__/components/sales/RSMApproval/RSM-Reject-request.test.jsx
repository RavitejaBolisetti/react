import '@testing-library/jest-dom/extend-expect';
import { RejectRequest } from '@components/Sales/RSMApproval/RejectRequest';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import { Form } from 'antd';

afterEach(() => {
    jest.restoreAllMocks();
});

const FormWrapper = (props) => {
    const [rejectForm] = Form.useForm();
    const myFormMock = {
        ...rejectForm,
        setFieldsValue: jest.fn(),
        validateFields: jest.fn().mockResolvedValue([{ name: 'Kai' }]),
        resetFields: jest.fn(),
        getFieldsValue: jest.fn().mockResolvedValue([{ name: 'Kai' }]),
    };
    return <RejectRequest rejectForm={myFormMock} {...props} />;
};

describe('RSM Reject Request components', () => {
    it('should click on submit button when approve', () => {
        customRender(<FormWrapper isVisible={true} handleFormValueChange={jest.fn()} handleFormFieldChange={jest.fn()} rejectFormButtonActive={jest.fn()} setRejectFormButtonActive={jest.fn()} />);

        const checkBox = screen.getByRole('checkbox', { name: /i accept that for the transferred vehicle , claim can be generated from the billed dealer\. if more than one transfer happens for the same vehicle then claim is not allowed for any of the dealership\./i });
        fireEvent.click(checkBox);

        const submitBtn = screen.getByRole('button', { name: 'Submit' });
        fireEvent.click(submitBtn);
    });

    it('should render components when reject request is true', () => {
        customRender(<FormWrapper isVisible={true} rejectRequest={true} handleFormValueChange={jest.fn()} handleFormFieldChange={jest.fn()} rejectFormButtonActive={jest.fn()} setRejectFormButtonActive={jest.fn()} />);

        const rejectRemark = screen.getByRole('textbox', { name: /Rejection Remarks/i });
        fireEvent.change(rejectRemark, { target: { value: 'Test' } });
        fireEvent.click(rejectRemark);

        const submitBtn = screen.getByRole('button', { name: 'Submit' });
        fireEvent.click(submitBtn);
    });
});
