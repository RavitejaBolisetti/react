/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import FormNotificationDetail from '@components/Sales/VehicleAllotmentPriorityMaster/NotificationDetails/FormNotificationDetail';

describe('Form Notification Detail component', () => {
    it('should render form notification detail component', () => {
        customRender(<FormNotificationDetail />);
    });
});
