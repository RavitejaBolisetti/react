import '@testing-library/jest-dom/extend-expect';
import customRender from "@utils/test-utils";
import { screen, fireEvent } from '@testing-library/react';
import { ThankYouMaster } from 'components/Services/ShieldSchemeRegistartion/ThankYou';

const FormActionButton = () => { };

describe("Thankyou Master Component", () => {

    it("should render thankyou master component", () => {
        const record={ res: { responseMessage: 'The number 01' } }
        customRender(<ThankYouMaster FormActionButton={FormActionButton} record={record} />);
    });

    it("invoice button should work", () => {
        const record={ res: { responseMessage: 'The number is 01' } }
        customRender(<ThankYouMaster FormActionButton={FormActionButton} record={record} handlePrintDownload={jest.fn()} />);

        const invoiceBtn=screen.getByRole('button', { name: 'Invoice' });
        fireEvent.click(invoiceBtn);
    });

});