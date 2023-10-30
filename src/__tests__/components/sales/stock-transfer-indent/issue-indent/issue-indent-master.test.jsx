/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { IssueIndentMaster } from '@components/Sales/StockTransferIndent/IssueIndent/IssueIndentMaster';
import customRender from '@utils/test-utils';
import { Form } from 'antd';

const FormWrapper = (props) => {
    const [issueForm] = Form.useForm();

    const myMock = {
        ...issueForm,
        resetFields:jest.fn()
    }
    return <IssueIndentMaster issueForm={myMock} {...props}/>
};

const fetchIssueList = jest.fn();
const resetIssueList = jest.fn();

describe("IssueIndentMaster component", ()=>{
    it("printBtn", ()=>{
        <FormWrapper isVisible={true} />
    });

    it("indentIssueDataLoaded", ()=>{
        const indentIssueData = [{issueNumber:'23', vin:'t23', issueStatus:'active', }];

        customRender(
            <FormWrapper indentIssueDataLoaded={true} isVisible={true} indentIssueData={indentIssueData} indentIssueDataLoading={false} typeData={['PARAM_MASTER']} fetchIssueList={fetchIssueList} resetIssueList={resetIssueList} />
        );
    });

    it("issueModalOpen", ()=>{
        const vehicleVinData = [{paginationData:[{oemInvoiceDate:'12', grnDate:'3'}]}];

        customRender(
            <FormWrapper issueModalOpen={true} isVisible={true} typeData={['PARAM_MASTER']} fetchIssueList={fetchIssueList} vehicleVinData={vehicleVinData} resetIssueList={resetIssueList} />
        );
    });

    it("ViewDetailProps", ()=>{
        const props = {
            formData:{
                // indentNumber:'12',
                // modelCode:'98',
                // issueDate:"23",
                // oemInvoiceDate:"7",
                // issueStatus:'test',
                // grnDate:'4'
            
                
                balancedQuantity:'100',
                modelDescription:'test',
                receivedQuantity:'0',
                cancelledQuantity: 0,
                vehicleDetails:[{modelDescription:'test', cancelledQuantity: 0, balancedQuantity:'100', receivedQuantity:'0'}]
            },
            typeData:['PARAM_MASTER']
        }
        
        customRender(<IssueIndentMaster isVisible={true} {...props}  fetchIssueList={jest.fn()} resetIssueList={jest.fn()}/>);

        const closeBtn = screen.getByRole('button', {name:'Close'});
        fireEvent.click(closeBtn);
    });

    it("ADD button", ()=>{
        const props = {
            cancellationData :{balancedQuantity: '10',}
        }
        
        customRender(<IssueIndentMaster isVisible={true} {...props} typeData={['PARAM_MASTER']} fetchIssueList={jest.fn()} handleBtnVisibility={jest.fn()} resetIssueList={jest.fn()} />);

        const addBtn = screen.getByRole('button', {name:'ADD'});
        fireEvent.click(addBtn);
    });

    it("search Img", ()=>{
        const props = {
            cancellationData :{balancedQuantity: '10',}
        }
        
        customRender(<IssueIndentMaster isVisible={true} {...props} typeData={['PARAM_MASTER']} fetchIssueList={jest.fn()} handleBtnVisibility={jest.fn()} resetIssueList={jest.fn()} />);

        const addBtn = screen.getByRole('button', {name:'ADD'});
        fireEvent.click(addBtn);

        const vinTextBox = screen.getByRole('textbox', {name:'VIN'});
        fireEvent.change(vinTextBox, {target:{value:'test'}});

        const searchImg = screen.getByRole('img', {name:'search'});
        fireEvent.click(searchImg);
    });

    it("Cancel button", ()=>{
        const props = {
            cancellationData :{balancedQuantity: '10',}
        }
        
        customRender(<FormWrapper isVisible={true} {...props} typeData={['PARAM_MASTER']} fetchIssueList={jest.fn()} handleBtnVisibility={jest.fn()} resetIssueList={jest.fn()} resetVinDetails={jest.fn()} setIssueModal={jest.fn(0)}/>);

        const addBtn = screen.getByRole('button', {name:'ADD'});
        fireEvent.click(addBtn);

        const cancelBtn = screen.getByRole('button', {name:'Cancel'});
        fireEvent.click(cancelBtn);
    });

    it("Submit button", ()=>{
        const props = {
            cancellationData :{balancedQuantity: '10',}
        }
        
        customRender(<IssueIndentMaster isVisible={true} {...props} typeData={['PARAM_MASTER']} fetchIssueList={jest.fn()} handleBtnVisibility={jest.fn()} resetIssueList={jest.fn()} />);

        const addBtn = screen.getByRole('button', {name:'ADD'});
        fireEvent.click(addBtn);

        const vinTextBox = screen.getByRole('textbox', {name:'VIN'});
        fireEvent.change(vinTextBox, {target:{value:'test'}});

        const issueChargesBox = screen.getByRole('textbox', {name:'Issue Charges'});
        fireEvent.change(issueChargesBox, {target:{value:'test1'}});

        const submitBtn = screen.getByRole('button', {name:'Submit'});
        fireEvent.click(submitBtn);
    });

    it("onErrorAction", ()=>{
        const props = {
            issueData :[{issueNumber: '8'}]
        }
        customRender(<IssueIndentMaster isVisible={true} {...props} typeData={['PARAM_MASTER']} fetchIssueList={fetchIssueList} handleBtnVisibility={jest.fn()} resetIssueList={jest.fn()} handleCollapses={jest.fn(0)} showGlobalNotification={jest.fn()} />);

        fetchIssueList.mock.lastCall[0].onErrorAction();
    });

    it("IssueVehicleDetailsProps", ()=>{
        const props = {
            issueModalOpen:true,
            isVisible:true,
            // onCloseAction:jest.fn(),
            // titleOverride:'Issue vehicle Details',
            // onFinish:jest.fn(),
            // cancellationData :{balancedQuantity: '10',},
            // handleVinSearch:jest.fn(),
            vehicleVinData:[{paginationData:[{oemInvoiceDate:'23', grnDate:'12'}]}],
        }

        customRender(<FormWrapper {...props} typeData={['PARAM_MASTER']} fetchIssueList={jest.fn()} resetIssueList={jest.fn()} />);
    });

    const cancelIssueProps = {
        isConfirmationModal:true,
        handleCloseConfirmation:jest.fn(),
        titleOverride:'Cancel Issue',
        handdleYes:jest.fn(),
        fetchIssueList:jest.fn(),
        resetIssueList:jest.fn(),
        isVisible:true,
    }

    it("ModalButtonName = Yes", ()=>{

        customRender(<IssueIndentMaster {...cancelIssueProps} typeData={['PARAM_MASTER']}  ModalButtonName={'Yes'} />);
    });

    it("cancelIssueProps = Yes Return", ()=>{

        customRender(<IssueIndentMaster {...cancelIssueProps} typeData={['PARAM_MASTER']}  ModalButtonName={'Yes Return'} />);
    });

    it("cancelIssueProps = Yes Recieve", ()=>{

        customRender(<IssueIndentMaster {...cancelIssueProps} typeData={['PARAM_MASTER']}  ModalButtonName={'Yes Recieve'} />);
    });

    
})

