import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { fireEvent, screen, logRoles, act, render} from "@testing-library/react";
// import { act } from 'react-dom/test-utils';
import customRender from "@utils/test-utils";
import createMockStore from '__mocks__/store';
import { ApplicationMaster } from "@components/common/ApplicationMaster";

describe('Application Master Component', () => {

    it('should render Application Master', async () => {
        customRender(<ApplicationMaster />);
    });

    it('web and mobile button should work', async () => {
        customRender(<ApplicationMaster />);
        const web = screen.getByRole("button", { name: 'Web', exact: false});
        const mobile = screen.getByRole("button", { name: 'Mobile', exact: false});
        fireEvent.click(mobile);
        fireEvent.click(web);
    });

    it('search should work', async () => {
      customRender(<ApplicationMaster />);
      const inputBox = screen.getByPlaceholderText('Search');
      fireEvent.change(inputBox, { target: { value: 'Test' } });
      expect(inputBox.value).toBe('Test');
      await act(async () => {
          const searchButton = screen.getByRole('button', { name: "search", exact:false });
          fireEvent.click(searchButton);
      });
    });

    it('add button should work', async () => {
      const mockStore = createMockStore({
        auth: { userId: 123 },
        data:{
            ApplicationMaster:{
                applicationData:[],
                applicationCriticalityGroupData:[
                  {id: 1, name:'A', activeIndicator:true},
                  {id: 2, name:'C', activeIndicator:false},
                  {id: 3, name:'B', activeIndicator:true},
                ],
            },
        }
      });

      customRender(
        <Provider store={mockStore}>
          <ApplicationMaster />
        </Provider>
      );
      const addButton = await screen.findByRole("button", { name: 'plus Add', exact:false });
      expect(addButton).toBeInTheDocument();
      fireEvent.click(addButton);
    });

    it('HierarchyFormButton should work', async () => {
      const mockStore = createMockStore({
        auth: { userId: 123 },
        data:{
            ApplicationMaster:{
              applicationDetailsData:[{"id":"79eaef50-ecca-4e0c-9b07-a583b9d0ab1a","applicationId":"TESTAD","parentApplicationId":"Web","applicationName":"ADMINTEST","applicationType":"Module","applicationTitle":"ADMINTEST","documentNumRequired":true,"status":true,"nodeType":" ","criticalityGroupName":"criticality","criticalityGroupMasterId":"8ec901d0-4b8a-4c30-9ba1-a08d0c2df984","accessableIndicator":0,"deviceType":"W","documentType":[{"id":"8324eda1-639f-48bb-8ff6-11358f389925","documentTypeCode":"342","digitalSignatureRequired":true,"documentTypeDescription":"NEW DOC","termAndConRequired":true}],"accessibleLocation":[],"applicationAction":[{"id":"2457c966-a6ce-4543-886f-ae5ee8bc6c8f","actionMasterId":"e34eda20-d186-4c54-9647-187306095d2e","actionName":"view","status":true,"actionId":"V01"}]}],
              criticalityGroupData:[]
            },
        },
      });
      customRender(
        <Provider store={mockStore}>
          <ApplicationMaster selectedTreeKey={1} setSelectedTreeKey={jest.fn()}/>
        </Provider>
      );      
    });
    
});