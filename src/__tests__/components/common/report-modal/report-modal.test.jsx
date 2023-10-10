/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import { ReportModal } from 'components/common/ReportModal/ReportModal';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Report Modal Components', () => {

    it('should render report modal components', async () => {

        const mockStore=createMockStore({
            auth: { userId: 106 },
            data: {
                Report: {
                    Reports: { isLoaded: true, data: {embedToken: 'Kai', embedReports: [{embedUrl: 'Kai', reportId: 'KaiKaiKaiKaiKaiKaiKaiKaiKaiKaiKaiKaiKaiKaiKaiKaiKaiKai'}]} },
                },
            },
        });

        customRender(
            <Provider store={mockStore} >
                <ReportModal isVisible={true} reportDetail={{ key: 106, type: 'Detail' }} additionalParams={[{ key: 106, value: 'Kai' }]} />
            </Provider>
        );

    });

});