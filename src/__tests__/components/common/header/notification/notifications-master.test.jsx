/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { fireEvent, screen } from '@testing-library/react';
import { NotificationsMaster } from '@components/common/Header/Notification/NotificationsMaster';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Notifications Master Components', () => {
    it('should render Notifications Master components', () => {
        customRender(<NotificationsMaster resetNotification={jest.fn()} />)

        const button = screen.getByRole("button", { name: 'Mark all as read' })
        fireEvent.click(button)

        const tab = screen.getByRole("tab", { name: 'Inbox' })
        fireEvent.click(tab)

        const archive = screen.getByRole("tab", { name: 'Archive' })
        fireEvent.click(archive)
    });

});
