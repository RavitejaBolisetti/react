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
        validateFields: jest.fn().mockResolvedValue([{ name: 'Kai' }]),
        resetFields: jest.fn(),
        getFieldsValue: jest.fn().mockResolvedValue([{ name: 'Kai' }]),
    };
    return <AggregateAddEditForm aggregateForm={myFormMock} {...props} />;
};

describe('AdvanceForm', () => {
    it('should render component', async () => {
        customRender(<AggregateAddEditForm isVisible={true} />);
    });

    it('should render fields', async () => {
        customRender(<FormWrapper AdvanceformData={true} isVisible={true} itemOptions={[{ name: 'Test' }]} setitemOptions={jest.fn()} optionsServiceModified={[{ name: 'Kai' }]} />);
    });

    it('Save button should work', async () => {
        customRender(<FormWrapper AdvanceformData={true} isVisible={true} itemOptions={[{ name: 'Test' }]} setitemOptions={jest.fn()} />);
        const saveBtn = screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn);
    });

    it('OnFinish should work', async () => {
        customRender(<FormWrapper AdvanceformData={true} isVisible={true} itemOptions={[{ name: 'Test' }]} setitemOptions={jest.fn()} isEditing={true} />);

        const Item = screen.getByRole('combobox', { name: 'Item' });
        fireEvent.change(Item, { target: { value: 'front tyre' } });

        const make = screen.getByRole('combobox', { name: 'Make' });
        fireEvent.change(make, { target: { value: 'appolo' } });

        const serialNo = screen.getByRole('textbox', { name: 'Serial No.' });
        fireEvent.change(serialNo, { target: { value: 123 } });

        const saveBtn = screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn);
    });
});
