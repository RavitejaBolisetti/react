/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { CreditDebitNoteFormButton } from '@components/FinancialAccounting/CreditDebitNote/CreditDebitFormButton/index';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('CreditDebitNoteFormButton components', () => {

    it('closeBtn', () => {
        const buttonData = {
            closeBtn:true
        }
        customRender(<CreditDebitNoteFormButton buttonData={buttonData} onCloseAction={jest.fn()} />);
        const closeBtn = screen.getByRole('button', {name:'Close'})
        fireEvent.click(closeBtn);
    });

    it('cancelBtn', () => {
        const buttonData = {
            cancelBtn:true
        }
        customRender(<CreditDebitNoteFormButton buttonData={buttonData} onCloseAction={jest.fn()} />);

        const cancelBtn = screen.getByRole('button', {name:'Cancel'})
        fireEvent.click(cancelBtn);
    });

    it('editBtn', () => {
        const buttonData = {
            editBtn:true
        }
        customRender(<CreditDebitNoteFormButton buttonData={buttonData} handleButtonClick={jest.fn()} />);

        const editBtn = screen.getByRole('button', {name:'Edit'})
        fireEvent.click(editBtn);
    });

    it('cancelVoucher', () => {
        const buttonData = {
            cancelVoucher:true
        }
        customRender(<CreditDebitNoteFormButton buttonData={buttonData} handleButtonClick={jest.fn()} />);

        const cancelVoucher = screen.getByRole('button', {name:'Cancel'})
        fireEvent.click(cancelVoucher);
    });

    it('nextBtn', () => {
        const buttonData = {
            nextBtn:true
        }
        customRender(<CreditDebitNoteFormButton buttonData={buttonData} isLastSection={false} handleButtonClick={jest.fn()} />);

        const nextBtn = screen.getByRole('button', {name:'Next'})
        fireEvent.click(nextBtn);
    });

    it('saveBtn', () => {
        const buttonData = {
            saveBtn:true
        }
        customRender(<CreditDebitNoteFormButton buttonData={buttonData} setButtonData={jest.fn()} loading={false} isLastSection={true}/>);

        const saveBtn = screen.getByRole('button', {name:'Save & Next'})
        fireEvent.submit(saveBtn);
    });

    it('printBtn', () => {
        const buttonData = {
            printBtn:true
        }
        const handlePrintDownload = jest.fn();
        const record={id:'123'}
        customRender(<CreditDebitNoteFormButton buttonData={buttonData} handleButtonClick={jest.fn(() => handlePrintDownload(record))}  />);
        
        const printBtn = screen.getByRole('button', {name:'Print Receipt'})
        fireEvent.click(printBtn);
    });
});
