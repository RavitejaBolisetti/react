/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { btnVisiblity } from '@utils/btnVisiblity';

describe('btnVisiblity Components', () => {
    it('should render btn visiblity pages components', () => {
        customRender(<btnVisiblity />);
    });
});
