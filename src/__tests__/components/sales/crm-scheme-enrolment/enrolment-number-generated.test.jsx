/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import { screen, fireEvent } from '@testing-library/react';
import customRender from '@utils/test-utils';
import { EnrolmentNumberGenerated } from '@components/Sales/crmSchemeEnrolment/EnrolmentNumberGenerated';

describe('enrolment number generated component', () => {
    it('should render enrolment number generatedr component', () => {
        customRender(<EnrolmentNumberGenerated />);
    });
});
