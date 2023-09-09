import React from 'react';
import { ViewDetail } from '@components/Sales/VehicleRecieptChecklist/SupportingDocument/ViewDetail';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Supporting document master container', () => {
    it('Should render supporting document master view details components', () => {
        const props = {
            formActionType: { viewMode: false },
            supportingData: [{ key: 1, id: 1, value: 'test' },{ key: 2, id: 2, value: 'test' }]
        }
        customRender(
            <ViewDetail {...props} isVisible={true} downloadFileFromButton={jest.fn()} deleteFile={jest.fn()} />
        )
    })
})