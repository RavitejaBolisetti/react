/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen, act, fireEvent } from '@testing-library/react';
import MenuNav from '@components/Sales/VehicleDetail/LeftSidebar/MenuNav';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Render MenuNav component', () => {
    const props = {
        customerType: 'IND',
        currentSection: 1,
        setCurretSection: jest.fn(),
        formActionType: {
            addMode: false,
            editMode: true,
            viewMode: false,
        },
        selectedCustomerId: 'CUS1687506569264',
        onHandle: jest.fn(),
        setCurrentSection: jest.fn(),
    };
    it('render comoponet', () => {
        customRender(<MenuNav {...props} />);

        const VehicleDetails = screen.getByText('Vehicle Details');
        act(() => {
            fireEvent.click(VehicleDetails);
        });

        const CustomerDetails = screen.getByText('Customer Details');
        act(() => {
            fireEvent.click(CustomerDetails);
        });

        const ProductDetails = screen.getByText('Product Details');
        act(() => {
            fireEvent.click(ProductDetails);
        });

        const contacts = screen.getByText('Contacts');
        act(() => {
            fireEvent.click(contacts);
        });
    });
});
