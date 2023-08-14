import React, {useState} from "react";
import { Provider } from 'react-redux';
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import customRender from "@utils/test-utils";
import createMockStore from '__mocks__/store';
import userEvent from '@testing-library/user-event';
import { AccessibleDealerLocations } from "components/common/ApplicationMaster/dealerLocations/AccessibleDealerLocations";

const finalFormdata = { accessibleLocation: [ { id: 1, name: "Location 1", address: "123 Main St", city: "Springfield", state: "IL", zip: "12345" }, ] };
const finalFormdata1 = { accessibleLocation: [] };


describe('Application Actions Component', () => {
      it('should render application actions component', async () => {
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

          render(
            <Provider store={mockStore}>
              <AccessibleDealerLocations finalFormdata={finalFormdata} setSearchValue={setSearchValue} />
            </Provider>
          );

          const inputBox=screen.getByRole('combobox', {name: '', exact:false});
          userEvent.type(inputBox, 'test');
          await waitFor(() => expect(setSearchValue).toHaveBeenCalled(), { timeout: 350 });           
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