/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import { ConfirmationModal } from '@components/Sales/VehiclePurchaseOrder/VehiclePurchaseOrderCancellation/ConfirmationModal';
import { Form } from 'antd';

const FormWrapper = (props) => {
    const [vpoCancellationForm] = Form.useForm();

    const myFormMock = {
        ...vpoCancellationForm,
        resetFields: jest.fn()
    };
    return <ConfirmationModal vpoCancellationForm={myFormMock} {...props} />;
};

describe('confirmation modal Components', () => {
    it('should render confirmation modal components', () => {
        customRender(<FormWrapper setIsCancelVisible={jest.fn()} isVisible={true} typeData={['PO_CNCL_RSN']} setButtonData={jest.fn()} onFieldsChange={jest.fn()} />);
    });

    it('should check all button click events', async () => {
        customRender(<FormWrapper setIsCancelVisible={jest.fn()} isVisible={true} typeData={['PO_CNCL_RSN']} setButtonData={jest.fn()} onFieldsChange={jest.fn()} />);
        const closeBtn = screen.getByRole('button', { name: 'Close' });
        fireEvent.click(closeBtn);
        const cancelBtn = screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancelBtn);
        const sumitBtn = screen.getByRole('button', { name: 'Submit' });
        fireEvent.click(sumitBtn);
        const btnClose = screen.getByRole('img', { name: 'close' });
        fireEvent.click(btnClose);
        const cancellationReasonBtn = screen.getByRole('combobox', { name: 'Cancellation Reason' });
        fireEvent.click(cancellationReasonBtn);
        const dialogBtn = screen.getByRole('dialog', { name: '' });
        fireEvent.click(dialogBtn);
    });
});
