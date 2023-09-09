/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { DocumentTypeOtherChargesMaster } from '@components/FinancialAccounting/AccountTaxCharges/DocumentTypeOtherCharges/DocumentTypeOtherChargesMaster';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Render components', () => {
    it('should render components', () => {
        customRender(<DocumentTypeOtherChargesMaster />);
        
        const appMenu = screen.getByRole('columnheader', {name:'Application Menu'});
        expect(appMenu).toBeTruthy();

        const docType = screen.getByRole('columnheader', {name:'Document Type'});
        expect(docType).toBeTruthy();

        const action = screen.getByRole('columnheader', {name:'Action'});
        expect(action).toBeTruthy();
    });
});
