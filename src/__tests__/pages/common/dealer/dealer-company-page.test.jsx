/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { DealerCompanyPage } from '@pages/common/Dealer/DealerCompanyPage';

describe('DealerCompanyPage Components', () => {
    it('should render Dealer Company Page components', () => {
        customRender(<DealerCompanyPage />);
    });
});
