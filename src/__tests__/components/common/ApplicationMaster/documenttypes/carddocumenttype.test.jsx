import React, {useState} from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
// import { act } from 'react-dom/test-utils';
import customRender from "@utils/test-utils";
import CardDocumentType from "components/common/ApplicationMaster/documentTypes/CardDocumentType";

const finalFormdata ={ documentType: [ {termAndConRequired:true, digitalSignatureRequired:true, documentTypeDescription:'Test', documentTypeCode:'Test'},
{termAndConRequired:false, digitalSignatureRequired:true, documentTypeDescription:'Test1', documentTypeCode:'Test1'}, ] }

describe('Card Document Type Component', () => {
     it('should render card document type component', async () => {
        customRender(<CardDocumentType setIsBtnDisabled={jest.fn()} />);
     });

     it('should delete icon button', async () => {
        const setfinalFormdata=jest.fn();
        jest.spyOn(React, 'useState').mockReturnValue([null,setfinalFormdata]);
        render(<CardDocumentType id={null} setCanFormSave={jest.fn()} setfinalFormdata={setfinalFormdata} setIsBtnDisabled={jest.fn()} finalFormdata={finalFormdata} status={'Active'} />);
        const buttons = screen.getAllByRole('button', { name: '', exact: false});
        fireEvent.click(buttons[1]);
        expect(setfinalFormdata).toHaveBeenCalledWith(expect.any(Function));
        const setFinalFormdataFunction=setfinalFormdata.mock.calls[0][0];
        const prev={
            documentType: [
                {termAndConRequired:true, digitalSignatureRequired:true, documentTypeDescription:'Test', documentTypeCode:'Test'},
                {termAndConRequired:false, digitalSignatureRequired:true, documentTypeDescription:'Test1', documentTypeCode:'Test1'},
            ]
        }
        setFinalFormdataFunction(prev);
     });

     it('edit icon and save button should work', async () => {
        const setFinalFormdata = jest.fn();
        jest.spyOn(React, 'useState').mockReturnValue([null, setFinalFormdata]);

        const mockValidateFields = jest.fn().mockResolvedValue({ finalFormdata });
        const form = { validateFields: mockValidateFields };
    
        render( <CardDocumentType id={null} forceUpdate={jest.fn()} setfinalFormdata={setFinalFormdata} setCanFormSave={jest.fn()} setIsBtnDisabled={jest.fn()} finalFormdata={finalFormdata} form={form} /> );
    
        const buttons = screen.getAllByRole('button', { name: '', exact: false });
        fireEvent.click(buttons[0]);
        const saveButton = screen.getByRole('button', { name: 'Save', exact: false });
        fireEvent.click(saveButton);
    
        expect(setFinalFormdata).toHaveBeenCalledWith(expect.any(Function));
        const setFinalFormdataFunction = setFinalFormdata.mock.calls[0][0];
        const prev = {
            documentType: [
                { termAndConRequired: true, digitalSignatureRequired: true, documentTypeDescription: 'Test', documentTypeCode: 'Test' },
                { termAndConRequired: false, digitalSignatureRequired: true, documentTypeDescription: 'Test1', documentTypeCode: 'Test1'},
            ],
        };
    
        setFinalFormdataFunction(prev);
    });
    
});