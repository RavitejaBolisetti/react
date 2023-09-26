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

const formActionType = {
    editMode: true,
};

const buttonData = { closeBtn: true, cancelBtn: true, editBtn: true, allotBtn: true, unAllotBtn: true, invoiceBtn: true, deliveryNoteBtn: true, transferOTFBtn: true, cancelOTFBtn: true, changeHistory: true, nextBtn: true, saveBtn: true, formBtnActive: true, cancelVPOBtn: true, cancelOtfBtn: true, nextBtn: true, saveBtn: true };

const saveButtonName = 'Save';
const isLoadingOnSave = false;

describe('add edit form Components', () => {
    it('should render add edit form components', () => {
        customRender(<FormWrapper onErrorAction={jest.fn()} handleButtonClick={jest.fn()} isVisible={true} isLoadingOnSave={false} saveButtonName={saveButtonName} formActionType={formActionType} typeData={['PO_TYPE']} />);
    });

    it('vehicle purchase form input should work', () => {
        customRender(<FormWrapper onErrorAction={jest.fn()} handleButtonClick={jest.fn()} isVisible={true} setButtonData={jest.fn()} buttonData={buttonData} formActionType={formActionType} typeData={['PO_TYPE']} />);

        const purchaseOrderNumber = screen.getByRole('textbox', { name: 'Purchase Order Number' });
        fireEvent.change(purchaseOrderNumber, { target: { value: 'DmspurchaseOrder' } });
        expect(purchaseOrderNumber).toBeTruthy();

        const PurchaseOrderDate = screen.getByRole('textbox', { name: 'Purchase Order Date' });
        fireEvent.change(PurchaseOrderDate, { target: { value: 'DmspurchaseDate' } });
        expect(PurchaseOrderDate).toBeTruthy();

        const purchaseOrderStatus = screen.getByRole('textbox', { name: 'Purchase Order Status' });
        fireEvent.change(purchaseOrderStatus, { target: { value: 'Dmspurchasestatus' } });
        expect(purchaseOrderStatus).toBeTruthy();

        const productDetails = screen.getByRole('heading', { name: 'Product Details' });
        fireEvent.click(productDetails);
        expect(productDetails).toBeTruthy();
    });

    it('should check all button click events', async () => {
        customRender(<FormWrapper onErrorAction={jest.fn()} handleButtonClick={jest.fn()} buttonData={buttonData} setButtonData={jest.fn()} isLoadingOnSave={false} saveButtonName={saveButtonName} isVisible={true} formActionType={formActionType} typeData={['PO_TYPE']} />);

        const closeBtn = screen.getAllByRole('button', { name: 'Close', exact: false });
        fireEvent.click(closeBtn[0]);
        fireEvent.click(closeBtn[1]);
        const increaseBtn = screen.getByRole('button', { name: 'Increase Value', exact: false });
        fireEvent.click(increaseBtn);
        const decreaseBtn = screen.getByRole('button', { name: 'Decrease Value', exact: false });
        fireEvent.click(decreaseBtn);
        const cancelBtn = screen.getByRole('button', { name: 'Cancel', exact: false });
        fireEvent.click(cancelBtn);
        const cancelPOBtn = screen.getByRole('button', { name: 'Cancel PO', exact: false });
        fireEvent.click(cancelPOBtn);
        const cancelVPOBtn = screen.getByRole('button', { name: 'Cancel VPO', exact: false });
        fireEvent.click(cancelVPOBtn);
        const cancelOTFBtn = screen.getAllByRole('button', { name: 'Cancel Booking', exact: false });
        fireEvent.click(cancelOTFBtn[0]);
        fireEvent.click(cancelOTFBtn[1]);
        const nextBtn = screen.getByRole('button', { name: 'Next', exact: false });
        fireEvent.click(nextBtn);
        const saveBtn = screen.getByRole('button', { name: 'Save', exact: false });
        fireEvent.click(saveBtn);


        
        const closedBtn = screen.getByRole('img', { name: 'close', exact: false });
        fireEvent.click(closedBtn);
        const calendarBtn = screen.getByRole('img', { name: 'calendar', exact: false });
        fireEvent.click(calendarBtn);
        const upBtn = screen.getByRole('img', { name: 'up', exact: false });
        fireEvent.click(upBtn);
        const downBtn = screen.getByRole('img', { name: 'down', exact: false });
        fireEvent.click(downBtn);

        const orderTypeBtn = screen.getByRole('combobox', { name: 'Order Type', exact: false });
        fireEvent.click(orderTypeBtn);
        const modelBtn = screen.getByRole('combobox', { name: 'Model', exact: false });
        fireEvent.click(modelBtn);

        const quantity = screen.getByRole('spinbutton', { name: 'Quantity' });
        fireEvent.click(quantity);
    });

    it('should render text', () => {
        customRender(<FormWrapper onErrorAction={jest.fn()} buttonData={buttonData} handleButtonClick={jest.fn()} setButtonData={jest.fn()} isLoadingOnSave={false} saveButtonName={saveButtonName} isVisible={true} formActionType={formActionType} typeData={['PO_TYPE']} />);
        const orderType = screen.getByText('Order Type');
        expect(orderType).toBeTruthy();
        const defaultTitle = screen.getByText('default title');
        expect(defaultTitle).toBeTruthy();
    });
});
