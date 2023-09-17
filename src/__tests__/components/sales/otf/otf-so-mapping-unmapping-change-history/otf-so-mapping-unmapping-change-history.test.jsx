import React from 'react';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import {OtfSoMappingUnmappingChangeHistory}  from 'components/Sales/OTF/OtfSoMappingUnmappingChangeHistory/OtfSoMappingUnmappingChangeHistory';
import customRender from '@utils/test-utils';

afterEach(() => {
  jest.restoreAllMocks();
});

describe('OtfSoMappingUnmappingChangeHistory Component', () => {

    it('should render OtfSoMappingUnmappingChangeHistory component UI', () => {
        customRender(<OtfSoMappingUnmappingChangeHistory isVisible={true} selectedOrderId={106} />)
    });

    it('search should work', async () => {
      const mockStore = createMockStore({
          auth: { userId: 106 },
          data: {
            OTF: {
                OtfSearchList: { changeHistoryData: { paginationData: [{ actionDate: '01/01/2001', soDate: '01/01/2001' }] } },
            },
        },
      });

      customRender(
          <Provider store={mockStore}>
              <OtfSoMappingUnmappingChangeHistory isVisible={true} />
          </Provider>
      );
    });

});