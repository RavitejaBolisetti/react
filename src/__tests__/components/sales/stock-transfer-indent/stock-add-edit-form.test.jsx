/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AddEditForm } from '@components/Sales/StockTransferIndent/AddEditForm';
import customRender from '@utils/test-utils';

describe("AddEditForm",()=>{
    it("indentLocationList", ()=>{
        const indentLocationList = [{ locationCode: "NB01" }];

        customRender(<AddEditForm isVisible={true} tableDataItem={[]} indentLocationList={indentLocationList} />);
    });

    it("Close Button", ()=>{
        customRender(<AddEditForm isVisible={true} tableDataItem={[]}/>);

        const closeBtn = screen.getByRole('button', {name:'Close'});
        fireEvent.click(closeBtn);
    });

    it("close image", ()=>{
        customRender(<AddEditForm isVisible={true} tableDataItem={[]}/>);

        const closeImg = screen.getByRole('img', {name:'close'});
        fireEvent.click(closeImg);
    });

    it("plus image", ()=>{
        customRender(<AddEditForm isVisible={true} tableDataItem={[]} setOpenAccordian={jest.fn()} />);

        const plusImg = screen.getByRole('img', {name:'plus'});
        fireEvent.click(plusImg);
    });

    it("Combobox", ()=>{
        customRender(<AddEditForm isVisible={true} tableDataItem={[]}/>);

        const indent = screen.getByRole('combobox', {name:'Indent To Location'});
        fireEvent.change(indent, {target:{value:'test'}});

        const requested = screen.getByRole('combobox', {name:'Requested by'});
        fireEvent.change(requested, {target:{value:'test1'}});
    });

    it("Remarks Textbox", ()=>{
        customRender(<AddEditForm isVisible={true} tableDataItem={[]}/>);

        const remarks = screen.getByRole('textbox', {name:'Remarks'});
        fireEvent.change(remarks, {target:{value:'test2'}});
    });

    it("cancelBtn", ()=>{
        customRender(<AddEditForm isVisible={true} tableDataItem={[]}/>);

        const addBtn = screen.getByRole('button', {name:'Add'});
        fireEvent.click(addBtn);

        const cancelBtn = screen.getByRole('button', {name:'Cancel'});
        fireEvent.click(cancelBtn);
    });

    it("saveBtn", ()=>{
        const values = {index: undefined, modelCode: "ALTSMM81813337437", modelDescription: "ALTSMM81813337437", modelDescriptionName: "ALTURAS G4 2WD BSVI REGAL BLUE", requestedQuantity: "6"};

        customRender(<AddEditForm isVisible={true} tableDataItem={[]} values={values} />);

        const addBtn = screen.getByRole('button', {name:'Add'});
        fireEvent.click(addBtn);

        const saveBtn = screen.getByRole('button', {name:'Save'});
        fireEvent.click(saveBtn);
    });
})