import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { ModalForm } from '@components/Sales/Common/ChecklistDetails/ModalForm';
import customRender from '@utils/test-utils';
import { Form } from 'antd';

const FormWrapper = (props) => {
    const [aggregateForm] = Form.useForm();
    const myMock = {
        ...aggregateForm,
        setFieldsValue: jest.fn(),
        resetFields: jest.fn(),
    };
    return <ModalForm aggregateForm={myMock} {...props} />;
};

describe('Modal form Component', () => {
    it('Should render modal form components', () => {
        const mockProps = {
            isEditing: false,
            setIsReadOnly: jest.fn(),
            isReadOnly: false,
            isVisible: true,
        };

        const AdvanceformData = { checkResult: {} };
        customRender(<FormWrapper {...mockProps} AdvanceformData={AdvanceformData} setcheckListDataModified={jest.fn()} />);
    });

    it('Should render modal form components close', () => {
        const mockProps = {
            isEditing: false,
            setIsReadOnly: jest.fn(),
            isReadOnly: false,
            isVisible: true,
        };

        const AdvanceformData = { checkResult: {}, matchKey: 'test' };
        customRender(<FormWrapper {...mockProps} AdvanceformData={AdvanceformData} setcheckListDataModified={jest.fn()} />);

        const close = screen.getByRole('button', { name: 'Close' });
        fireEvent.click(close);
    });

    it('Should render modal form components reset', () => {
        const checkListDataModified = [
            { key: 1, value: 'test' },
            { key: 2, value: 'test1' },
        ];
        const mockProps = {
            isEditing: false,
            setIsReadOnly: jest.fn(),
            isReadOnly: false,
            isVisible: true,
            checkListDataModified: checkListDataModified,
        };
        const AdvanceformData = { checkResult: {} };

        customRender(<FormWrapper {...mockProps} AdvanceformData={AdvanceformData} setRequestPayload={jest.fn(()=>Promise.resolve("provide-dummy-response-payload"))} checklistType={'DELIVERY_NOTE'} setcheckListDataModified={jest.fn()} />);

        const resetBtn = screen.getByRole('button', { name: 'Reset' });
        fireEvent.click(resetBtn);
    });

    it('Should render modal form components save', () => {
        const mockProps = {
            isEditing: false,
            setIsReadOnly: jest.fn(),
            isReadOnly: false,
            isVisible: true,
        };
        const checkListDataModified = [{ key: 1, value: 'test' }];

        const AdvanceformData = { checkResult: { key: 1 } };
        customRender(<FormWrapper {...mockProps} AdvanceformData={AdvanceformData} UniqueAnsType={'dr'} checkListDataModified={checkListDataModified} setAdvanceSearchVisible={jest.fn()} handleFormValueChange={jest.fn()} setRequestPayload={jest.fn().mockResolvedValue({ key: 1, value: 'test' })} checklistType={'RECEIPT_CHECKLIST'} />);

        const na = screen.getByRole('textbox', { name: 'NA' });
        fireEvent.change(na, { target: { value: 'test' } });

        const remarks = screen.getByRole('textbox', { name: 'Remarks' });
        fireEvent.change(remarks, { target: { value: 'test' } });

        const saveBtn = screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn);
    });
});
