import React from "react";
import { Provider } from 'react-redux';
import { fireEvent, render, screen } from "@testing-library/react";
import customRender from "@utils/test-utils";
import createMockStore from '__mocks__/store';
import { AccessibleDealerLocations } from "components/common/ApplicationMaster/dealerLocations/AccessibleDealerLocations";
import { debounce } from "utils/debounce";

const finalFormdata = { accessibleLocation: [ { id: 1, name: "Location 1", address: "123 Main St", city: "Springfield", state: "IL", zip: "12345" }, ] };
const finalFormdata1 = { accessibleLocation: [] };

jest.mock('utils/debounce', () => ({
  debounce: jest.fn((fn) => fn),
}));

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Accessible Dealer Locations Component', () => {
      it('should render accessible dealer locations component', async () => {
         customRender(<AccessibleDealerLocations />);
      });

      it('input and select of data should work', async () => {

         const mockStore = createMockStore({
            auth: { userId: 123 },
            data:{
                ApplicationMaster:{
                    dealerLocations:[
                      { dealerLocationName:"dealer" },
                      { dealerLocationName:"test" }
                    ],
                },
            }
          });
    
          render(
            <Provider store={mockStore}>
              <AccessibleDealerLocations finalFormdata={finalFormdata} />
            </Provider>
          );

         const inputBox=screen.getByRole('combobox', {name: '', exact:false});
         fireEvent.change(inputBox, { target : { value: "test" }});
         let options = screen.getByText("test");
         fireEvent.click(options);
         const searchButton=screen.getByRole('button', {name: 'search', exact:false});
         fireEvent.click(searchButton);
      });

      it('if accessible location data is empty then function should work', async () => {

         const mockStore = createMockStore({
            auth: { userId: 123 },
            data:{
                ApplicationMaster:{
                    dealerLocations:[
                      { dealerLocationName:"dealer" },
                      { dealerLocationName:"test" }
                    ],
                },
            }
          });

          const setFinalFormdata=jest.fn();
          jest.spyOn(React, 'useState').mockReturnValue([null,setFinalFormdata]);
    
          render(
            <Provider store={mockStore}>
              <AccessibleDealerLocations finalFormdata={finalFormdata1} setFinalFormdata={setFinalFormdata} setCanFormSave={jest.fn()} />
            </Provider>
          );

         const inputBox=screen.getByRole('combobox', {name: '', exact:false});
         fireEvent.change(inputBox, { target : { value: "test" }});
         let options = screen.getByText("test");
         fireEvent.click(options);
         const searchButton=screen.getByRole('button', {name: 'search', exact:false});
         fireEvent.click(searchButton);

         expect(setFinalFormdata).toHaveBeenCalledWith(expect.any(Function));
         const setFinalFormdataFunction=setFinalFormdata.mock.calls[0][0];
         const prev={
            accessibleLocation: [
                {locationName: 'Test'}
            ]
         }
         setFinalFormdataFunction(prev);
      });

      it('search for the data should work', async () => {

         const mockStore = createMockStore({
            auth: { userId: 123 },
            data:{
                ApplicationMaster:{
                    dealerLocations:[
                      { dealerLocationName:"dealer" },
                      { dealerLocationName:"test" }
                    ],
                },
            }
          });

          const setSearchValue=jest.fn();
          debounce.mockImplementation((fn) => fn);

          render(
            <Provider store={mockStore}>
              <AccessibleDealerLocations finalFormdata={finalFormdata} setSearchValue={setSearchValue} />
            </Provider>
          );

          const inputBox=screen.getByRole('combobox', {name: '', exact:false});
          fireEvent.click(inputBox, { target: { value: 'test' } })
          const searchBtn=screen.getByRole('button', { name: 'search' });
          fireEvent.click(searchBtn);
          expect(debounce).toHaveBeenCalled();
      });

      it('delete button should work', async () => {

         const mockStore = createMockStore({
            auth: { userId: 123 },
            data:{
                ApplicationMaster:{
                    dealerLocations:[
                      {dealerLocationName:"dealer"},
                      {dealerLocationName:"test"}
                    ],
                },
            }
          });
         
         const setFinalFormdata=jest.fn();
         jest.spyOn(React, 'useState').mockReturnValue([null,setFinalFormdata]);

         render(<Provider store={mockStore}><AccessibleDealerLocations finalFormdata={finalFormdata} setFinalFormdata={setFinalFormdata} /></Provider>);

         const closeButton=screen.getByRole('button', {name: 'close', exact:false});
         fireEvent.click(closeButton);

         expect(setFinalFormdata).toHaveBeenCalledWith(expect.any(Function));
         const setFinalFormdataFunction=setFinalFormdata.mock.calls[0][0];
         const prev={
            accessibleLocation: [
                {locationName: 'Test'}
            ]
         }
         setFinalFormdataFunction(prev);
      });
});