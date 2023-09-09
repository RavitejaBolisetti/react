import React from 'react';
import { Provider } from 'react-redux';
import createMockStore from '__mocks__/store';
import { DigitalSignatureMaster }  from 'components/Sales/DigitalSignatureMapping/DigitalSignatureMaster';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

const data={"pageSize":10,"pageNumber":1,"totalRecords":1,"paginationData":[{"receiptNumber":"RECT0002","receiptDate":"2009-01-18T00:00:00.000+00:00","customerName":null,"partySegment":"BODYSHOP INSURANCE MASTER","receiptType":"Advance","receiptStatus":"Cancelled","id":"85e58509-c4f4-4745-aecc-b07d2f228203"}]};

describe('DigitalSignatureMaster Component', () => {
    it('should render DigitalSignatureMaster component UI', () => {
        customRender(<DigitalSignatureMaster />);
    });

    it('should render component with data', () => {
        const mockStore = createMockStore({
          auth: { userId: 123 },
          data: {
            Receipt: {
                ReceiptSearchList: { isLoaded: true, data: data, filter: {name: 'Test'} },
            },
        },
        });
        customRender(
          <Provider store={mockStore}>
            <DigitalSignatureMaster />
          </Provider>
        );
    });

});
