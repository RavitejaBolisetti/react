/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import { screen, fireEvent } from '@testing-library/react';
import customRender from '@utils/test-utils';
import EnrolmentAdd from '@components/Sales/crmSchemeEnrolment/addViewForm/EnrolmentAdd';

const typeData = {
    PARAM_MASTER: {
        CRM_SCHEME_TYPE: { key: '123', type: 'test123' },
    },
    id: '321',
};
describe('enrolment add component', () => {
    it('should render enrolment add component', () => {
        customRender(<EnrolmentAdd isVisible={true} typeData={[typeData]} />);
    });
});
