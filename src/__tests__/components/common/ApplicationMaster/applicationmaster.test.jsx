import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import React, { useState } from 'react';
import { fireEvent, screen, logRoles, act, render} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
// import { act } from 'react-dom/test-utils';
import customRender from "@utils/test-utils";
import { ApplicationMaster } from "@components/common/ApplicationMaster";
import { AddEditForm } from 'components/common/ApplicationMaster/AddEditForm';
import { ContentHeader } from 'utils/ContentHeader';

describe('Application Master Component', () => {

    it('should render Application Master', async () => {
        customRender(<ApplicationMaster />);
        const checkRender = screen.getByTestId('applicationMaster');
        logRoles(screen.getByTestId("applicationMaster"));
        expect(checkRender).toBeInTheDocument();
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

    // it('handleAdd button should work', async () => {
    //     customRender(<ApplicationMaster />);
    //     console.log("Menu Data: "+screen.menuData+"Application Data: "+screen.applicationData)
    //     const addButton = await screen.findByRole("button", { name: 'Add', exact:false });
    //     expect(addButton).toBeInTheDocument();
    //     fireEvent.click(addButton);
    // });

    it('content header', async () => {
        customRender(
          <AddEditForm />
        );
        logRoles(screen.getByTestId("applicationMaster"));
  });
    


});
