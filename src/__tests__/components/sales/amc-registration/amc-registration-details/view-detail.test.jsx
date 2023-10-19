import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import ViewDetail from '@components/Sales/AMCRegistration/AMCRegistrationDetails/ViewDetail';
import { screen, fireEvent } from '@testing-library/react';
import { Form, Button } from 'antd';

describe('AMC Registration Details Master view Components', () => {
    it('Should render view details', () => {
        customRender(<ViewDetail />);

        const plusRegistrationInformation = screen.getByRole('button', { name: "plus Registration Information" })
        fireEvent.click(plusRegistrationInformation)

        const plusSchemeDetails = screen.getByRole('button', { name: "plus Scheme Details" })
        fireEvent.click(plusSchemeDetails)
    });
});
