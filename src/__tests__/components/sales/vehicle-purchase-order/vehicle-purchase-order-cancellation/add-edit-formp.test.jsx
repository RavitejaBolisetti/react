/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import { AddEditForm } from '@components/Sales/VehiclePurchaseOrder/VehiclePurchaseOrderCancellation/AddEditForm';

describe('Add Edit Form Components', () => {
    it('should render add edit form components', () => {
        customRender(<AddEditForm isVisible={true} typeData={['PO_CNCL_RSN']} />);
    });

    it('should check all button click events', () => {
        customRender(<AddEditForm isVisible={true} typeData={['PO_CNCL_RSN']} />);
        const closeBtn = screen.getByRole('button', { name: 'Close' });
        fireEvent.click(closeBtn);
        const btnClose = screen.getByRole('img', { name: 'close' });
        fireEvent.click(btnClose);
        const cancellationReasonBtn = screen.getByRole('combobox', { name: 'Cancellation Reason' });
        fireEvent.click(cancellationReasonBtn);
        const dialogBtn = screen.getByRole('dialog', { name: '' });
        fireEvent.click(dialogBtn);
        const defaultTitle = screen.getByText('default title');
        fireEvent.click(defaultTitle);
        const cancellationReason = screen.getByText('Cancellation Reason');
        fireEvent.click(cancellationReason);
        const selectCancellationReason = screen.getByText('Select cancellation reason');
        fireEvent.click(selectCancellationReason);
    });
});
