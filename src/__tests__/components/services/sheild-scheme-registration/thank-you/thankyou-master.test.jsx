import React from 'react';
import { ThankYouMaster } from '@components/Services/ShieldSchemeRegistartion/ThankYou/ThankYouMaster';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('ThankYou Component', () => {
    const FormActionButton = () => {};

    it('should render thankyou master component', () => {
        const record = { res: { responseMessage: 'The number 01' } };
        customRender(<ThankYouMaster FormActionButton={FormActionButton} record={record} />);
    });

    it('invoice button should work', () => {
        const record = { res: { responseMessage: 'The number is 01' } };
        customRender(<ThankYouMaster FormActionButton={FormActionButton} record={record} handlePrintDownload={jest.fn()} />);

        // const invoiceBtn = screen.getByRole('button', { name: 'Invoice' });
        // fireEvent.click(invoiceBtn);
    });
});
