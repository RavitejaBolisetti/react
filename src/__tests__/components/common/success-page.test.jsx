/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import customRender from '@utils/test-utils';
import '@testing-library/jest-dom/extend-expect';
import SuccessPage from 'components/common/SuccessPage';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Success Page Component', () => {
    it('should render left panel', async () => {
        customRender(<SuccessPage />);
    });
});
