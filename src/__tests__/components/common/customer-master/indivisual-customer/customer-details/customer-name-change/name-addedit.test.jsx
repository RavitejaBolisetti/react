import React from 'react';
import { screen, fireEvent, act } from '@testing-library/react';
import customRender from '@utils/test-utils';
import { AddEditForm } from '@components/common/CustomerMaster/IndividualCustomer/CustomerDetail/CustomerNameChange/AddEditForm';

import { Form } from 'antd';

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    return <AddEditForm form={form} {...props} />;
};
const prop = { formActionType: { editMode: true } };

describe('NameChange addedit   Component', () => {
    it('should render addedit component ', async () => {
        customRender(<FormWrapper {...prop} setActiveKey={jest.fn()} setEditedMode={jest.fn()} setNameChangeRequested={jest.fn()} setNameChangeHistoryItemList={jest.fn()} />);

        // const editBtn = screen.getByRole('button', { name: 'Edit' });
        // fireEvent.click(editBtn);

        const firstName = screen.getByRole('textbox', { name: 'First Name' });
        fireEvent.change(firstName, { target: { value: 'kai' } });

        const middleName = screen.getByRole('textbox', { name: 'Middle Name' });
        fireEvent.change(middleName, { target: { value: 'kai' } });

        const lastName = screen.getByRole('textbox', { name: 'Last Name' });
        fireEvent.change(lastName, { target: { value: 'kai' } });

        const saveBtn = screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn);
    });
    it('should click on cancel button', async () => {
        customRender(<FormWrapper {...prop} setActiveKey={jest.fn()} setEditedMode={jest.fn()} setNameChangeRequested={jest.fn()} setNameChangeHistoryItemList={jest.fn()} />);

        // const editBtn = screen.getByRole('button', { name: 'Edit' });
        // fireEvent.click(editBtn);

        const firstName = screen.getByRole('textbox', { name: 'First Name' });
        fireEvent.change(firstName, { target: { value: 'kai' } });

        const middleName = screen.getByRole('textbox', { name: 'Middle Name' });
        fireEvent.change(middleName, { target: { value: 'kai' } });

        const lastName = screen.getByRole('textbox', { name: 'Last Name' });
        fireEvent.change(lastName, { target: { value: 'kai' } });

        const cancelBtn = screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancelBtn);
    });
});
