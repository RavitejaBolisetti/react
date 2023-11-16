import React from 'react';
import { ThankYouMaster } from '@components/Services/ShieldSchemeRegistartion/ThankYou/ThankYouMaster';
import customRender from '@utils/test-utils';
import { screen, fireEvent, waitFor } from '@testing-library/react';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('ThankYou Component', () => {
    const mockProps = {
        FormActionButton: jest.fn(),
        handlePrintDownload: jest.fn(),
        record: {
            res: {
                responseMessage: 'some response message',
            },
        },
    };
    it('should render Shield thankyou component UI', () => {
        customRender(<ThankYouMaster {...mockProps} />);

        const invoiceBtn = screen.getByRole('button', { name: 'Invoice' });
        fireEvent.click(invoiceBtn);
    });
});
