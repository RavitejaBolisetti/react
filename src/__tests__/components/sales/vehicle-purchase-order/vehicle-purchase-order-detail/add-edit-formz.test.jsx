/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import { Form } from 'antd';
import { AddEditForm } from '@components/Sales/VehiclePurchaseOrder/VehiclePurchaseOrderDetail/AddEditForm';

afterEach(() => {
    jest.restoreAllMocks();
});

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    return <AddEditForm form={form} {...props} />;
};
const buttonData = { closeBtn: true, cancelBtn: true, editBtn: true, allotBtn: true, unAllotBtn: true, invoiceBtn: true, deliveryNoteBtn: true, transferOTFBtn: true, cancelOTFBtn: true, changeHistory: true, nextBtn: true, saveBtn: true, formBtnActive: true, cancelVPOBtn: true, cancelOtfBtn: true,  };

const saveButtonName = 'Save';
// const isLoadingOnSave = false;

describe('add edit form Components', () => {
    it('should render add edit form components', () => {
        const formActionType = { editMode: true };
        customRender(<FormWrapper onErrorAction={jest.fn()} setButtonData={jest.fn()} handleButtonClick={jest.fn()} isVisible={true} isLoadingOnSave={false} saveButtonName={saveButtonName} formActionType={formActionType} typeData={['PO_TYPE']} />);
    });

    it('vehicle purchase form input should work', () => {
        const formActionType = { editMode: true };
        customRender(<FormWrapper onErrorAction={jest.fn()} handleButtonClick={jest.fn()} isVisible={true} setButtonData={jest.fn()} buttonData={buttonData} formActionType={formActionType} typeData={['PO_TYPE']} />);

        const purchaseOrderNumber = screen.getByRole('textbox', { name: 'Purchase Order Number' });
        fireEvent.change(purchaseOrderNumber, { target: { value: 'DmspurchaseOrder' } });
        const PurchaseOrderDate = screen.getByRole('textbox', { name: 'Purchase Order Date' });
        fireEvent.change(PurchaseOrderDate, { target: { value: 'DmspurchaseDate' } });
        const purchaseOrderStatus = screen.getByRole('textbox', { name: 'Purchase Order Status' });
        fireEvent.change(purchaseOrderStatus, { target: { value: 'Dmspurchasestatus' } });
        const productDetails = screen.getByRole('heading', { name: 'Product Details' });
        fireEvent.click(productDetails);
        expect(productDetails).toBeTruthy();
    });

    it('should render combobox components', () => {
        const formActionType = { editMode: true };
        customRender(<FormWrapper onErrorAction={jest.fn()} setButtonData={jest.fn()} handleButtonClick={jest.fn()} isVisible={true} isLoadingOnSave={false} saveButtonName={saveButtonName} formActionType={formActionType} typeData={['PO_TYPE']} />);
        const orderTypeBtn = screen.getByRole('combobox', { name: 'Order Type' });
        fireEvent.change(orderTypeBtn, { target: { value: 'deliver' } });
        fireEvent.click(orderTypeBtn);

        const modelBtn = screen.getByRole('combobox', { name: 'Model Description' });
        fireEvent.change(modelBtn, { target: { value: 'deliver' } });
    });

    it('should render columnheader text', () => {
        const formActionType = { viewMode: true };
        customRender(<FormWrapper onErrorAction={jest.fn()} setButtonData={jest.fn()} buttonData={buttonData} handleButtonClick={jest.fn()} isLoadingOnSave={false} saveButtonName={saveButtonName} isVisible={true} formActionType={formActionType} typeData={['PO_TYPE']} />);
    });

    it('order type should work', () => {
        const formActionType = { viewMode: false };
        const dealerFlag = true;
        customRender(<FormWrapper dealerFlag={dealerFlag} setButtonData={jest.fn()} onErrorAction={jest.fn()} handleButtonClick={jest.fn()} isVisible={true} isLoadingOnSave={false} saveButtonName={saveButtonName} formActionType={formActionType} typeData={['PO_TYPE']} />);
        const orderTypeBtn = screen.getByRole('combobox', { name: 'Order Type' });
        fireEvent.change(orderTypeBtn, { target: { value: 'deliver' } });
        fireEvent.click(orderTypeBtn);
    });
});
