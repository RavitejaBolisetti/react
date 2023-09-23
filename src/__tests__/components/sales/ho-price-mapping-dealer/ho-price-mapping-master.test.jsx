import React from 'react';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import { fireEvent, screen, act } from '@testing-library/react';
import { HoPriceMappingMaster }  from 'components/Sales/HoPriceMappingDealer/HoPriceMappingMaster';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('HoPriceMappingMaster Component', () => {
    it('should render HoPriceMappingMaster component UI', () => {
        customRender(<HoPriceMappingMaster />);
    });

    it('should render component with data', () => {
      const data={
        paginationData: [{"receiptNumber":"106","dealerName": "Kai","receiptDate":"2009-01-18T00:00:00.000+00:00","customerName":null,"partySegment":"MASTER","receiptType":"Advance","receiptStatus":"Cancelled","id":"106"}],
        totalRecords: 1
      };
      const typeData={
        OTF_SER: ['Customer Name']
      }
      const mockStore = createMockStore({
        auth: { userId: 123 },
        data: {
          ConfigurableParameterEditing: { filteredListData: typeData },
          Receipt: {
            ReceiptSearchList: { isLoaded: true, data: data, filter: {fromDate: '01/01/2001', toDate: '01/01/2023'} },
          },
        }
      });
      customRender(
        <Provider store={mockStore}>
          <HoPriceMappingMaster />
        </Provider>
      );
  });

  it("advanced filters and close button should work",async ()=>{
    customRender(<HoPriceMappingMaster />);
    const advanceFilter=screen.getByRole('button', { name: /Advanced Filters/i });
    fireEvent.click(advanceFilter);
    const closeBtn=screen.getByRole('button', { name: 'Close' });
    fireEvent.click(closeBtn);   
  });

  it("advanced filters and reset button should work",async ()=>{
      customRender(<HoPriceMappingMaster />);
      const advanceFilter=screen.getByRole('button', { name: /Advanced Filters/i });
      fireEvent.click(advanceFilter);
      const resetBtn=screen.getByRole('button', { name: 'Reset' });
      fireEvent.click(resetBtn);
  });


  it("advanced filters and apply button should work",async ()=>{
    customRender(<HoPriceMappingMaster />);
    const advanceFilter=screen.getByRole('button', { name: /Advanced Filters/i });
    fireEvent.click(advanceFilter);
    const resetBtn=screen.getByRole('button', { name: 'Apply' });
    fireEvent.click(resetBtn);
  });

});
