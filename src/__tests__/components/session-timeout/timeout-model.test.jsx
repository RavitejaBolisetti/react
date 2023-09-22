import React from 'react';
import { SessionTimeoutModal } from '@components/SessionTimeout/SessionTimeoutModal';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('SessionTimeoutModel Component', () => {
    it('should render SessionTimeoutModel component UI', () => {
        customRender(<SessionTimeoutModal isVisible={true} />);
    });
});
