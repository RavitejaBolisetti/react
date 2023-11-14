import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import ViewDetail from '@components/Sales/AMCRegistration/AMCRegistrationDetails/ViewDetail';
import { screen, fireEvent } from '@testing-library/react';
import React from "react";


describe('AMC Registration Details Master view Components', () => {
    it('Should render view details', () => {
        const setactiveKey = jest.fn();

        customRender(<ViewDetail setactiveKey={setactiveKey} onChange={jest.fn().mockResolvedValue('1')} newActivekeys={[{ id: 1, value: 'test' }]} />);

        const plusRegistrationInformation = screen.getAllByRole('img', { name: 'plus' });
        fireEvent.click(plusRegistrationInformation[0]);
        fireEvent.click(plusRegistrationInformation[1]);
    });
});
