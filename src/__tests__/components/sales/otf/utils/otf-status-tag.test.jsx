import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen, fireEvent, act } from '@testing-library/react';
import { OTFStatusTag } from 'components/Sales/OTF/utils/OTFStatusTag';

describe('OTF Form Button Component', () => {
    it('should render otf form button component', () => {
        customRender(<OTFStatusTag />);
    });

    it('if status is booked', () => {
        customRender(<OTFStatusTag status={'O'} />);
    });

    it('if status is alloted', () => {
        customRender(<OTFStatusTag status={'A'} />);
    });

    it('if status is cancelled', () => {
        customRender(<OTFStatusTag status={'C'} />);
    });

    it('if status is invoiced', () => {
        customRender(<OTFStatusTag status={'I'} />);
    });

    it('if status is delivered', () => {
        customRender(<OTFStatusTag status={'D'} />);
    });

    it('if status is transferred', () => {
        customRender(<OTFStatusTag status={'T'} />);
    });

    it('if status is pending for cancellation', () => {
        customRender(<OTFStatusTag status={'Pending for cancellation'} />);
    });

    it('if status is cancellation requested', () => {
        customRender(<OTFStatusTag status={'Cancellation Requested'} />);
    });

    it('if status is rejected', () => {
        customRender(<OTFStatusTag status={'Rejected'} />);
    });

    it('if status is delivery note', () => {
        customRender(<OTFStatusTag status={'N'} />);
    });
});