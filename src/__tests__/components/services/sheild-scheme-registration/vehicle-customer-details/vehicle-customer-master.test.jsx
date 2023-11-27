import React from 'react';
import { VehicleCustomerDetailMaster } from '@components/Services/ShieldSchemeRegistartion/VehicleCustomerDetail/VehicleCustomerDetailMaster';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Master Component', () => {
    it('test1', () => {
        const formActionType = { viewMode: true };
        customRender(<VehicleCustomerDetailMaster formActionType={formActionType} />);

        const searchBtn = screen.getAllByRole('img', { name: 'plus' });
        fireEvent.click(searchBtn[0]);
        fireEvent.click(searchBtn[1]);
    });

    it('test2', () => {
        const formActionType = { viewMode: false };
        customRender(<VehicleCustomerDetailMaster formActionType={formActionType} />);

        const searchBtn = screen.getAllByRole('img', { name: 'plus' });
        fireEvent.click(searchBtn[0]);
        fireEvent.click(searchBtn[1]);
    });
});
