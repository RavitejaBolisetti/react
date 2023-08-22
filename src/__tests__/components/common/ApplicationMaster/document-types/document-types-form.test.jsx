import React from "react";
import { fireEvent, screen, act } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import customRender from "@utils/test-utils";
import DocumentTypesForm from "components/common/ApplicationMaster/documentTypes/DocumentTypesForm";

afterEach(() => {
   jest.restoreAllMocks();
});

describe('Document Types Form Component', () => {
   it('should render document types form component', async () => {
      customRender(<DocumentTypesForm />);
      const documentCode=screen.getByRole('textbox', {name:'Code', exact:false});
      fireEvent.change(documentCode, { target: { value: '123456' } });
      const submitButton=screen.getByRole('button', {name:'plus Add', exact:false});
      await act(async () => { 
         fireEvent.click(submitButton);
      });   
   });

});