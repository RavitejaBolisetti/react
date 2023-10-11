import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { AddEditForm } from 'components/Sales/OnRoadPriceMaster/AddEditForm';
import customRender from '@utils/test-utils';
import { Form } from 'antd';

const FormWrapper = (props) => {
    const [form] = Form.useForm();

    const myFormMock = {
        ...form,
        setFieldsValue: jest.fn(),
    };
    return <AddEditForm form={myFormMock} {...props} />;
};

describe('Add Edit Form Component', () => {

    it('should render add edit form component', () => {
        customRender( <FormWrapper isVisible={true} /> );
    });

    it('fields and save button should work', () => {
        const buttonData={ saveBtn: true, formBtnActive: true };
        const vehiclePrice={ odDiscount: '100%', dealerDiscountWithTax: '100%', otherCharges: '100K', essentialKitWithTax: '500K' };

        customRender( <FormWrapper isVisible={true} vehiclePrice={vehiclePrice} isReadOnly={false} buttonData={buttonData} setButtonData={jest.fn()} /> );
        
        const model=screen.getByRole('textbox', { name: 'Model' });
        fireEvent.change(model, { target: { value: 'GT-200' } });
        
        const odDiscount=screen.getByRole('spinbutton', { name: 'OD Discount%' });
        fireEvent.change(odDiscount, { target: { value: '50%' } });

        const dealerDiscountWithTax=screen.getByRole('textbox', { name: 'Dealer Discount with Tax' });
        fireEvent.change(dealerDiscountWithTax, { target: { value: '50%' } });

        const otherCharges=screen.getByRole('textbox', { name: 'Other Charges' });
        fireEvent.change(otherCharges, { target: { value: '50K' } });

        const essentialKitWithTax=screen.getByRole('textbox', { name: 'Essential Kit with Tax' });
        fireEvent.change(essentialKitWithTax, { target: { value: '200K' } });

        const saveBtn=screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn);

    });

});