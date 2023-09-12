/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import { AddEditForm } from '@components/Sales/OTF/SchemeDetails/AddEditForm';
afterEach(() => {
    jest.restoreAllMocks();
});
const props = {
    defaultFormActionType: { addMode: false, editMode: false, viewMode: false },
    userId: undefined,
    isDataLoaded: false,
    isLoading: false,
    schemeData: {
        otfNumber: 'OTF001test',
        schemes: [
            {
                amount: '1000000.00',
                description: 'Name4',
                id: 'testid',
                schemeCategory: 'On Booking',
                schemeName: 'scheme1',
                schemeType: 'Dealer',
                validFrom: '2020-08-08',
                validTo: '2030-08-08',
            },
            {
                amount: '10000000.00',
                description: 'Name4',
                id: 'testid1',
                schemeCategory: 'On Booking',
                schemeName: 'scheme14',
                schemeType: 'Dealerll',
                validFrom: '2020-08-08',
                validTo: '2030-08-08',
            },
        ],
    },
};

describe('Add Edit Form Components', () => {
    it('should render addeditform components', () => {
        customRender(<AddEditForm />);
    });

    it('should click when user click on button', () => {
        customRender(<AddEditForm {...props} />);
        const minusIconBtn = screen.getAllByRole('img', { name: 'plus' });
        fireEvent.click(minusIconBtn[0]);
        fireEvent.click(minusIconBtn[1]);

        const calendarbtn = screen.getAllByRole('img', { Name: 'calendar' });
        fireEvent.click(calendarbtn[0]);
        fireEvent.click(calendarbtn[1]);
        fireEvent.click(calendarbtn[2]);
        fireEvent.click(calendarbtn[3]);
    });
});
