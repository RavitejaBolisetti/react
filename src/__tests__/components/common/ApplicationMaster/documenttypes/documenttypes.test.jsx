import React from "react";
import { fireEvent, render, screen, waitFor, act } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
// import { act } from 'react-dom/test-utils';
import customRender from "@utils/test-utils";
import DocumentTypes from "components/common/ApplicationMaster/documentTypes/DocumentTypes";

const finalFormdata ={ documentType: [ {termAndConRequired:true, digitalSignatureRequired:true, documentTypeDescription:'Test', documentTypeCode:'Test'},
{termAndConRequired:false, digitalSignatureRequired:true, documentTypeDescription:'Test1', documentTypeCode:'Test1'},] }

describe('Document Types Component', () => {
     it('should render document types component', async () => {
        customRender(<DocumentTypes />);
     });

     it('form fields should work', async () => {
        customRender(<DocumentTypes isBtnDisabled={false} setCanFormSave={jest.fn()} />);
        await act(async () => { 
         const documentCode=screen.getByRole('textbox', {name:'Code', exact:false});
         fireEvent.change(documentCode, { target: { value: 'Test' } });
         const documentName=screen.getByRole('textbox', {name:'Document Name', exact:false});
         fireEvent.change(documentName, { target: { value: 'Test' } });
         const termAndCon=screen.getByRole('switch', {name:'T&C Required', exact:false});
         fireEvent.click(termAndCon);
         const digitalSignature=screen.getByRole('switch', {name:'T&C Required', exact:false});
         fireEvent.click(digitalSignature);
         const submitButton=screen.getByRole('button', {name:'plus Add', exact:false});
         fireEvent.click(submitButton);
      });
     });

     it('cancel button should work', async () => {
        customRender(<DocumentTypes forceUpdate={jest.fn()} setCanFormSave={jest.fn()} setIsBtnDisabled={jest.fn()} finalFormdata={finalFormdata} />);
        const buttons = screen.getAllByRole('button', { name: '', exact: false});
        fireEvent.click(buttons[0]);
        await act(async () => { 
         const cancelButton=screen.getByRole('button', { name: 'Cancel', exact:false });
         fireEvent.click(cancelButton);
         });
     });

     it('edit icon and save button should work', async () => {
      const setFinalFormdata=jest.fn();
      jest.spyOn(React, 'useState').mockReturnValue([null,setFinalFormdata]);
      render(<DocumentTypes id={null} forceUpdate={jest.fn()} setfinalFormdata={setFinalFormdata} setCanFormSave={jest.fn()} setIsBtnDisabled={jest.fn()} finalFormdata={finalFormdata} />);
      const buttons = screen.getAllByRole('button', { name: '', exact: false});
      fireEvent.click(buttons[0]);
      const saveButton=screen.getByRole('button', { name: 'Save', exact:false });
      fireEvent.click(saveButton);        
      expect(setFinalFormdata).toHaveBeenCalledWith(expect.any(Function));
      const setFinalFormdataFunction=setFinalFormdata.mock.calls[0][0];
      const prev= { 
         documentType: [ 
            {termAndConRequired:true, digitalSignatureRequired:true, documentTypeDescription:'Test', documentTypeCode:'Test'},
            {termAndConRequired:false, digitalSignatureRequired:true, documentTypeDescription:'Test1', documentTypeCode:'Test1'},
         ] 
      }
      
      setFinalFormdataFunction(prev);
   });
});