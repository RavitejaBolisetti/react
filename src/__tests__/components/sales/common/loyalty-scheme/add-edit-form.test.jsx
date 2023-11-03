import React from 'react';
import { AddEditForm } from 'components/Sales/Common/LoyaltyScheme/AddEditForm';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import { Form } from 'antd';


const FormWrapper = (props) => {
    const [form] = Form.useForm();
    const myForm = {
        ...form,
        setFieldsValue: jest.fn().mockReturnValue(),
    };
    return <AddEditForm form={myForm} {...props} />;
};

describe('Loyalty scheme master render', () => {
    it('Should render add edit form component', () => {
        const typeData = {
            VEHCL_MFG: [{ id: 106, key: 1, value: 'test' }],
        };

        const mockHandleFilterChange = jest.fn();
        customRender(<FormWrapper isVisible={true} typeData={typeData} formData={true} handleFilterChange={mockHandleFilterChange}/>);

        const makeSelect = screen.getByRole('combobox', { name: 'Make' })
        fireEvent.change(makeSelect, { target: { value: 'Toyota' } });
    });
});
