/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import RoleMasterPage from '@pages/common/DealerManpower/RoleMasterPage';

describe('RoleMasterPage Components', () => {
    it('should render Role Master Page components', () => {
        customRender(<RoleMasterPage />);
    });
});
