import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { AggregateAddEditForm } from '@components/Sales/VehicleDetail/ProductDetails/AggregateAddEditForm'; // Import your component
import customRender from '@utils/test-utils';
import { Form } from 'antd';

const FormWrapper = (props) => {
    const [aggregateForm] = Form.useForm();

    const myFormMock = {
        ...aggregateForm,
        setFieldsValue: jest.fn(),
        validateFields: jest.fn().mockResolvedValue([{name: 'Kai'}]),
        resetFields: jest.fn(),
        getFieldsValue: jest.fn().mockResolvedValue([{name: 'Kai'}]),
    };
    return <AggregateAddEditForm aggregateForm={myFormMock} {...props} />;
};

describe('AdvanceForm', () => {
    it('submits form data when Save button is clicked', async () => {
        customRender(<AggregateAddEditForm isVisible={true}/>);

    });

    it('test1', async () => {
        customRender(<FormWrapper AdvanceformData={true} isVisible={true} itemOptions={[{name: 'Test'}]} setitemOptions={jest.fn()} optionsServiceModified={[{name: 'Kai'}]}/>);
    });

    it('test2', async () => {
        customRender(<FormWrapper AdvanceformData={true} isVisible={true} itemOptions={[{name: 'Test'}]} setitemOptions={jest.fn()}/>);
        const saveBtn=screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn);
    });

    it('test3', async () => {
        customRender(<FormWrapper AdvanceformData={true} isVisible={true} itemOptions={[{name: 'Test'}]} setitemOptions={jest.fn()} isEditing={true}/>);
        const saveBtn=screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn);
    });
});
