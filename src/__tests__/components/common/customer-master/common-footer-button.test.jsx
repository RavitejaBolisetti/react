/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import customRender from '@utils/test-utils';
import CommonFooterButton from '@components/common/CustomerMaster/CommonFooterButton';
import { fireEvent, screen } from '@testing-library/react';

describe('common footer button component', () => {
    it('should render common footer button component', () => {
        customRender(<CommonFooterButton onFinish={jest.fn()} />);

        const cancelBtn = screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancelBtn);

        const saveProceedBtn = screen.getByRole('button', { name: 'Save & Proceed' });
        fireEvent.click(saveProceedBtn);
    });
});
