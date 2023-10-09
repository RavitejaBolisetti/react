import React from 'react';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import { fireEvent, screen, act } from '@testing-library/react';
import { HoPriceMappingMaster } from 'components/Sales/HoPriceMappingDealer/HoPriceMappingMaster';
import customRender from '@utils/test-utils';

afterEach(() => {
  jest.restoreAllMocks();
});

jest.mock('store/actions/data/hoPriceMapping/hoPriceMapping', () => ({
  hoPriceMappingDataActions: {},
}))

jest.mock('store/actions/data/hoPriceMapping/hoPriceMappingDetails', () => ({
  hoPriceMappingDetailDataActions: {},
}))



describe('HoPriceMappingMaster Component', () => {
  it('should render HoPriceMappingMaster component UI', () => {
    customRender(<HoPriceMappingMaster />);
  });

  it('should render component with data', () => {
    const data = {
      paginationData: [{ "receiptNumber": "106", "dealerName": "Kai", "receiptDate": "2009-01-18T00:00:00.000+00:00", "customerName": null, "partySegment": "MASTER", "receiptType": "Advance", "receiptStatus": "Cancelled", "id": "106" }],
      totalRecords: 1
    };
    const typeData = {
      OTF_SER: ['Customer Name']
    }
    const mockStore = createMockStore({
      auth: { userId: 123 },
      data: {
        ConfigurableParameterEditing: { filteredListData: typeData },
        Receipt: {
          ReceiptSearchList: { isLoaded: true, data: data, filter: { fromDate: '01/01/2001', toDate: '01/01/2023' } },
        },
      }
    });
    const fetchList = jest.fn()
    customRender(
      <Provider store={mockStore}>
        <HoPriceMappingMaster fetchList={fetchList} />
      </Provider>
    );
  });

  it("advanced filters and close button should work", async () => {
    customRender(<HoPriceMappingMaster />);
    const advanceFilter = screen.getByRole('button', { name: /Advanced Filters/i });
    fireEvent.click(advanceFilter);
    const closeBtn = screen.getByRole('button', { name: 'Close' });
    fireEvent.click(closeBtn);
  });

  it("advanced filters and reset button should work", async () => {
    customRender(<HoPriceMappingMaster setFilterString={jest.fn()} />);
    const advanceFilter = screen.getByRole('button', { name: /Advanced Filters/i });
    fireEvent.click(advanceFilter);
    const resetBtn = screen.getByRole('button', { name: 'Reset' });
    fireEvent.click(resetBtn);
  });


  it("advanced filters and apply button should work", async () => {
    customRender(<HoPriceMappingMaster />);
    const advanceFilter = screen.getByRole('button', { name: /Advanced Filters/i });
    fireEvent.click(advanceFilter);

    const rsoPlantBtn = screen.getByRole('button', { name: 'RSO Plant (Non-eDCM)' });
    fireEvent.click(rsoPlantBtn);

    const exlantBtn = screen.getByRole('button', { name: 'Explant (eDCM)' });
    fireEvent.click(exlantBtn);

    const resetBtn = screen.getByRole('button', { name: 'Apply' });
    fireEvent.click(resetBtn);
  });

  it('remove filter button should work', async () => {

    const res = [{
      "id": "4a50fd6d-a788-4313-96dc-8b4fe9b8d7d1",
      "state": "Uttar Pradesh",
      "city": "KURNOOL",
      "enabledDate": "2017-07-01T00:00:00.000+00:00",
      "enabledBy": "Sakshi",
      "dealerBranch": "AM02",
      "dealerParent": "SUPREME MOBILES PVT LTD.",
      "dealerSelectOnRoadPrice": true,
      "modelDealerMapResponse": null
    }]

    const mockStore = createMockStore({
      auth: { userId: 106 },
      data: {
        HoPriceMapping: {
          HoPriceMappingSearchList:
            { isLoaded: true, data: res, filter: { advanceFilter: true, dealerParent: 'test', stateCode: "test123", cityCode: "test23", modelCode: "Toyo23" }, key: 'searchParam' },
        }
      },
    });

    const fetchList = jest.fn();

    customRender(
      <Provider store={mockStore}>
        <HoPriceMappingMaster fetchList={fetchList} setFilterString={jest.fn()} />
      </Provider>
    );

    const advanceFilter = screen.getByPlaceholderText(/Search Dealer Parent/i);
    fireEvent.change(advanceFilter, { target: { value: 'Test' } });

    const removeFilterBtn = screen.getAllByTestId('removeBtn');
    fireEvent.click(removeFilterBtn[0]);

    fetchList.mock.calls[0][0].onSuccessAction();
    fetchList.mock.calls[0][0].onErrorAction();
  });

  it('Should render search dealer parent', () => {
    customRender(<HoPriceMappingMaster setFilterString={jest.fn()} resetFields={jest.fn()} />);

    const advanceFilter = screen.getByPlaceholderText(/Search Dealer Parent/i);
    fireEvent.change(advanceFilter, { target: { value: 'Test' } });

    const searchBtn = screen.getByRole('button', { name: 'search' });
    fireEvent.click(searchBtn);
  })

  it('Should render search close circle dealer parent', () => {
    customRender(<HoPriceMappingMaster setFilterString={jest.fn()} resetFields={jest.fn()} />);

    const advanceFilter = screen.getByPlaceholderText(/Search Dealer Parent/i);
    fireEvent.change(advanceFilter, { target: { value: 'Test' } });

    const closeCircleBtn = screen.getByRole('button', { name: 'close-circle' });
    fireEvent.click(closeCircleBtn);
  })
});
