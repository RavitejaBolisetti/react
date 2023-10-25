import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import {ThankYouMaster} from '@components/Sales/AMCRegistration/ThankYou/ThankYouMaster';
import { screen, fireEvent } from '@testing-library/react';
import { Button } from 'antd';

afterEach(() => {
    jest.restoreAllMocks();
});

const FormActionButton = () => (
    <div>
        <Button htmlType="submit" type="primary">
            Save
        </Button>
    </div>
);

describe('Thank You Master Components', () => {
    it('Should render Thank You Master basic render', () => {
        customRender(<ThankYouMaster FormActionButton={FormActionButton}/>);
    });

    it('Should render Thank You Master render', () => {
        customRender(<ThankYouMaster FormActionButton={FormActionButton} handlePrintDownload={jest.fn()} />);
       
        const invoice = screen.getByRole('button', { name: "Invoice" });
        fireEvent.click(invoice)

        const registrationCertificate = screen.getByRole('button', { name: "Registration Certificate" });
        fireEvent.click(registrationCertificate)

        const registrationIncentiveClaim = screen.getByRole('button', { name: "Registration Incentive Claim" });
        fireEvent.click(registrationIncentiveClaim)

        const save = screen.getByRole('button', { name: "Save" });
        fireEvent.click(save)
    });

});
