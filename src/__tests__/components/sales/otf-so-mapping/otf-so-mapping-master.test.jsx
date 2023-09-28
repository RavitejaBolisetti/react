import React from 'react';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import { screen, fireEvent } from '@testing-library/react';
import { OtfSoMappingMaster }  from 'components/Sales/OtfSoMapping/OtfSoMappingMaster';
import customRender from '@utils/test-utils';

afterEach(() => {
  jest.restoreAllMocks();
});

jest.mock('store/actions/data/productHierarchy', () => ({
  productHierarchyDataActions: {},
}));

const data={
  ManufacturerOrgHierarchy: { data: [{ id: 106, manufactureOrgShrtName: 'Manu-Kai' }], organizationId: 109  },
  ProductHierarchy: { data: [{ prodctCode: 106, prodctShrtName: 'Kai'}], organizationId: 109 },
  OTF: {
      OtfSoMapping: { data: { orgManufactureId: 106 } },
      OtfSoUserMapping: { data: [{ key: 106, value: 'KaiOption' }] },
  }
};

describe('OtfSoMappingMaster Component', () => {

    it('should render OtfSoMappingMaster component UI', () => {
        customRender(<OtfSoMappingMaster />)
    });

    it('tree select, edit button and form fields should work', async () => {
      const mockStore = createMockStore({
          auth: { userId: 106 },
          data: data
      });
      const fetchList = jest.fn();
      const fetchProductDataList = jest.fn();

      customRender(
          <Provider store={mockStore}>
              <OtfSoMappingMaster fetchList={fetchList} fetchProductDataList={fetchProductDataList} resetData={jest.fn()} />
          </Provider>
      );

      fetchProductDataList.mock.calls[0][0].onErrorAction();

      const parentTree=screen.getByText('Kai');
      fireEvent.click(parentTree);

      const editBtn=screen.getByRole('button', { name: 'Edit' });
      fireEvent.click(editBtn);

      const variantCode=screen.getByRole('textbox', { name: 'Variant Code' });
      fireEvent.change(variantCode, { target: { value: '106' } });

      const productVariant=screen.getByRole('textbox', { name: 'Variant Code' });
      fireEvent.change(productVariant, { target: { value: 'Kai' } });

      const userFor=screen.getByRole('combobox', { name: 'User for Mapping/Unmapping' });
      fireEvent.change(userFor, { target: { value: 'KaiOption' } });
    });

    it('search should work', async () => {
      const mockStore = createMockStore({
          auth: { userId: 106 },
          data: data
      });
      const fetchList = jest.fn();
      const fetchProductDataList = jest.fn();

      customRender(
          <Provider store={mockStore}>
              <OtfSoMappingMaster fetchList={fetchList} fetchProductDataList={fetchProductDataList} resetData={jest.fn()} />
          </Provider>
      );

      const searchBox=screen.getByRole('textbox', { name: '' });
      fireEvent.change(searchBox, { target: { value: 'Kai' } });

      const searchBtn=screen.getByRole('button', { name: 'search' });
      fireEvent.click(searchBtn);
    });

});