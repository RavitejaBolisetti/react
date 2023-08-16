/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd. 
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen } from '@testing-library/react';
import { CustomerDetailsMaster } from '@components/Sales/OTF/CustomerDetails/CustomerDetailsMaster';


describe('CustomerDetailsMaster Components', () => {
    it('should check CustomerDetailsMaster screen render ', () => {
        customRender(<CustomerDetailsMaster />);
        const allotted = screen.getByText('Allotted');
        expect(allotted).toBeInTheDocument
        const booked = screen.getByText('Booked');
        expect(booked).toBeInTheDocument 
    });
});