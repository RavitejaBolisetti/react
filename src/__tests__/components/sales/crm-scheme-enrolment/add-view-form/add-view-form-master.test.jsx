/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import '@testing-library/jest-dom/extend-expect';
import { screen, fireEvent, getByRole } from '@testing-library/react';
import customRender from '@utils/test-utils';
import { AddViewFormMaster } from '@components/Sales/crmSchemeEnrolment/addViewForm/AddViewFormMaster';

const typeData = {
    PARAM_MASTER: {
        CRM_SCHEME_TYPE: { key: '123', type: 'test123' },
    },
    id: '321',
};

describe('add view form master component', () => {
    it('should render add view form master component', () => {
        customRender(<AddViewFormMaster isVisible={true} setButtonData={jest.fn()} onValuesChange={jest.fn()} onFieldsChange={jest.fn()} typeData={typeData} onChange={jest.fn()} />);
        const plusIcon = screen.getAllByRole('img', { value: 'plus' });
        fireEvent.click(plusIcon[0]);
        fireEvent.click(plusIcon[1]);
        fireEvent.click(plusIcon[2]);
    });
});
