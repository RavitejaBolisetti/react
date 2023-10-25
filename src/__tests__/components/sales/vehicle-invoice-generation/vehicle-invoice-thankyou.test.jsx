import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import customRender from '@utils/test-utils';
import { Form, Button } from 'antd';

import { ThankYouMaster } from '@components/Sales/VehicleInvoiceGeneration/ThankYou/ThankYouMaster';

const StatusBar = () => <div>No Status Bar</div>;

const FormActionButton = () => (
    <div>
        <Button htmlType="submit" type="primary">
            Save
        </Button>
    </div>
);
describe('ThankYouMaster Component', () => {
    const mockOnPrintInvoice = jest.fn();
    const mockDefaultBtnVisiblity = {
        editBtn: false,
        saveBtn: false,
        closeBtn: true,
    };

    const props = {
        selectedOrder: {
            invoiceNumber: 'INV123',
        },
        onPrintInvoice: mockOnPrintInvoice,
        defaultBtnVisiblity: mockDefaultBtnVisiblity,
    };

    it('should render ThankYouMaster component with the correct title', () => {
        customRender(<ThankYouMaster {...props} StatusBar={StatusBar} FormActionButton={FormActionButton} setButtonData={jest.fn()} />);
        const titleElement = screen.getByText('Invoice number created successfully');

        expect(titleElement).toBeInTheDocument();
    });

    it('should call onPrintInvoice when the "Download/Print Invoices" button is clicked', () => {
        customRender(<ThankYouMaster {...props} StatusBar={StatusBar} FormActionButton={FormActionButton} setButtonData={jest.fn()} />);
        const printDownloadButton = screen.getByText('Download/Print Invoice');

        fireEvent.click(printDownloadButton);

    });
});
