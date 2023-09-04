/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import StatePage  from '@pages/common/Geo/StatePage';

describe('StatePage Components', () => {
    it('should render State Page components', () => {
        customRender(<StatePage />);
    });
});
