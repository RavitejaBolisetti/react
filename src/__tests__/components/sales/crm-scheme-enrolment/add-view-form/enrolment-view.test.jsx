/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import { screen, fireEvent } from '@testing-library/react';
import customRender from '@utils/test-utils';
import { EnrolmentView } from '@components/Sales/crmSchemeEnrolment/addViewForm/EnrolmentView';

describe('enrolment view component', () => {
    it('should render enrolment view component', () => {
        customRender(<EnrolmentView isVisible={true} />);
    });
});
