/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { checkAndSetDefaultValue } from '@utils/checkAndSetDefaultValue';

describe('checkAndSetDefaultValue Components', () => {
    it('should render check and set default value pages components', () => {
        customRender(<checkAndSetDefaultValue />);
    });
});
