/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import { SchemeDetailsMaster } from 'components/Sales/OTF/SchemeDetails';

import { Form, Button } from 'antd';

afterEach(() => {
    jest.restoreAllMocks();
});

const StatusBar = () => <div>No Status Bar</div>;

const FormActionButton = () => (
    <div>
        <Button htmlType="submit" type="primary">
            Save
        </Button>
    </div>
);

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

describe('Scheme Details master Components', () => {
    it('it should render SchemeDetailsMaster components', () => {
        customRender(<SchemeDetailsMaster StatusBar={StatusBar} FormActionButton={FormActionButton} />);
    });

    it('it should click when user click on next button', () => {
        customRender(<SchemeDetailsMaster {...props} handleButtonClick={jest.fn()} StatusBar={StatusBar} FormActionButton={FormActionButton} />);
        const nextBtn = screen.getByRole('button', { Name: 'Next' });
        fireEvent.click(nextBtn);
    });
});
