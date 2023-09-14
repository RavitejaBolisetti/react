import React from 'react';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import { screen, fireEvent } from '@testing-library/react';
import { OtfListMaster } from 'components/Sales/OtfSoMappingUnmapping/OtfListMaster';
import customRender from '@utils/test-utils';

afterEach(() => {
  jest.restoreAllMocks();
});

jest.mock('store/actions/data/otfSoMappingUnmapping', () => ({
  OtfSoMappingDealerParentActions: {},
  OtfSoMappingDealerLocationDataActions: {},
  otfSoMappingDataActions: {},
  otfSoMappingSearchDataActions: {}
}));

const auth= { userId: 106 };
const data= {
  ConfigurableParameterEditing: { 
    filteredListData: { 
      SO_MAP: [
        { key: 'BTBSO', value: 'Billed To Billed SO' },
        { key: 'BTLSO', value: 'Billed To Live SO' },
        { key: 'LTLSO', value: 'Live To Live SO' },
        { key: 'RQ', value: 'Reserve Quota' },
        { key: 'SOCAU', value: 'SO Cancellation and Unmapping' },
        { key: 'SOM', value: 'SO Mapping' },
        { key: 'SOU', value: 'SO Unmapping' },
      ],
      undefined: [
        { key: 106, value: 'ReasonCategory' },
        { key: 107, value: 'ReasonDesc' }
      ] 
    } 
  },
  OTFSoMapping: {
    DealerParent: { isFilteredListLoaded: true, filteredListData: [{ key: 106, value: 'Kai' }] },
    DealerParentLocation: { isLoaded: true, isLoading: false, data: [{ locationCode: 106, dealerLocationName: 'Agra' }] },
    OtfSoMapping: { isLoaded: true, data: [{ name: 'Kai' }] },
  },
};
const common= {
  Header: { data: { userRoles: [{ roleCode: 'R0L003' }], userType: 'DLR' } },
};

const props={
  resetDealerParentData: jest.fn(),
  resetData: jest.fn(),
  resetDealerLocationData: jest.fn(), 
  fetchDealerParentLov: jest.fn(),
  fetchDealerLocation: jest.fn(),
  fetchList: jest.fn(),
}

describe('OTF List Master Component', () => {

    it('should render otf list master component UI', () => {
        customRender(<OtfListMaster {...props} />)
    });

    it('select should work with render all components', async () => {
      const mockStore = createMockStore({
        auth: auth,
        data: data,
        common: common
      });

      const fetchList=jest.fn();

      customRender(
          <Provider store={mockStore}>
              <OtfListMaster {...props} fetchList={fetchList} />
          </Provider>
      );
      const code=screen.getByRole('combobox', { name: '' });
      fireEvent.change(code, { target: { value: 'Billed To Billed SO' } });
      const btbso=screen.getAllByText('Billed To Billed SO');
      fireEvent.click(btbso[1]);

      fireEvent.change(code, { target: { value: 'Billed To Live SO' } });
      const btlso=screen.getAllByText('Billed To Live SO');
      fireEvent.click(btlso[1]);

      fireEvent.change(code, { target: { value: 'Live To Live SO' } });
      const ltlso=screen.getAllByText('Live To Live SO');
      fireEvent.click(ltlso[1]);

      fireEvent.change(code, { target: { value: 'Reserve Quota' } });
      const rq=screen.getAllByText('Reserve Quota');
      fireEvent.click(rq[1]);

      fireEvent.change(code, { target: { value: 'SO Cancellation and Unmapping' } });
      const socau=screen.getAllByText('SO Cancellation and Unmapping');
      fireEvent.click(socau[1]);

      fetchList.mock.calls[0][0].onSuccessAction();
      fetchList.mock.calls[0][0].onErrorAction();

      fireEvent.change(code, { target: { value: 'SO Mapping' } });
      const som=screen.getAllByText('SO Mapping');
      fireEvent.click(som[1]);

      fireEvent.change(code, { target: { value: 'SO Unmapping' } });
      const sou=screen.getAllByText('SO Unmapping');
      fireEvent.click(sou[1]);

    });

    it('form should work and submit successfully', async () => {
      const mockStore = createMockStore({
        auth: auth,
        data: data,
        common: common
      });

      customRender(
          <Provider store={mockStore}>
              <OtfListMaster {...props} />
          </Provider>
      );
      const code=screen.getByRole('combobox', { name: '' });
      fireEvent.change(code, { target: { value: 'Reserve Quota' } });
      const btbso=screen.getAllByText('Reserve Quota');
      fireEvent.click(btbso[1]);

      const dealerParent=screen.getByRole('combobox', { name: 'Dealer Parent' });
      fireEvent.change(dealerParent, { target: { value: 'Kai' } });
      fireEvent.click(screen.getAllByText('Kai')[1]);

      const dealerLocation=screen.getByRole('combobox', { name: 'Dealer Location' });
      fireEvent.change(dealerLocation, { target: { value: 'Agra' } });
      fireEvent.click(screen.getByText('Agra'));

      const reasonCategory=screen.getByRole('combobox', { name: 'Reason Category' });
      fireEvent.change(reasonCategory, { target: { value: 'ReasonCategory' } });
      fireEvent.click(screen.getAllByText('ReasonCategory')[1]);

      const reasonDesc=screen.getByRole('combobox', { name: 'Reason Description' });
      fireEvent.change(reasonDesc, { target: { value: 'ReasonDesc' } });
      fireEvent.click(screen.getAllByText('ReasonDesc')[1]);

      const soNo=screen.getByRole('textbox', { name: 'SO No.' });
      fireEvent.change(soNo, { target: { value: 'Kai' } });

      const bookingNo=screen.getByRole('textbox', { name: 'Booking No.' });
      fireEvent.change(bookingNo, { target: { value: 'Kai' } });

      const searchBtn=screen.getAllByRole('button', { name: 'search' });
      fireEvent.click(searchBtn[0]);
      fireEvent.click(searchBtn[1]);

      const saveBtn=screen.getByRole('button', { name: 'Save' });
      fireEvent.click(saveBtn);

      const cancelBtn=screen.getByRole('button', { name: 'Cancel' });
      fireEvent.click(cancelBtn);
      
    });

    it('clear button should work', async () => {
      const mockStore = createMockStore({
        auth: auth,
        data: data,
        common: {
          Header: { data: { userRoles: [{ roleCode: 'R0L003' }], userType: 'ADMN' } },
        }
      });

      customRender(
          <Provider store={mockStore}>
              <OtfListMaster {...props} />
          </Provider>
      );
      const code=screen.getByRole('combobox', { name: '' });

      fireEvent.change(code, { target: { value: 'Billed To Billed SO' } });
      const btbso=screen.getAllByText('Billed To Billed SO');
      fireEvent.click(btbso[1]);

      const clearBtn=screen.getByRole('button', { name: 'Clear' });
      fireEvent.click(clearBtn);
      
    });

    it('data should pass successfully', async () => {
      const mockStore = createMockStore({
        auth: auth,
        data: data,
        common: {
          Header: { data: { userRoles: [{ roleCode: 'R0L003' }], userType: 'Kai' } },
        }
      });

      customRender(
          <Provider store={mockStore}>
              <OtfListMaster {...props} />
          </Provider>
      );
      
    });

});