/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { AddressCommonForm } from '@components/Sales/Common/CustomerDetails/AddressCommonForm';

describe('address common form Components', () => {
    it('should render form components', () => {
        customRender(<AddressCommonForm typeData={['GENDER']} />);
    });

    it('should render form input field components', () => {
        customRender(<AddressCommonForm formType="billingCustomer" typeData={['GENDER']} isvisible={true} />);        
    });
});
