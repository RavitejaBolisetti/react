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
}

describe("IssueIndentMaster component", ()=>{

    it("ViewDetailProps", ()=>{
        const props = {
            formData:{
                balancedQuantity:'100',
                modelDescription:'test',
                receivedQuantity:'0',
                cancelledQuantity: 0,
                vehicleDetails:[{modelDescription:'test', cancelledQuantity: 0, balancedQuantity:'100', receivedQuantity:'0'}]
            }
        }
        
        customRender(<IssueIndentMaster isVisible={true} {...props} typeData={['PARAM_MASTER']} fetchIssueList={jest.fn()} resetIssueList={jest.fn()}/>);

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


    it("issueData", ()=>{
        const props = {
            issueData :[{issueNumber: '8'}]
        }
        customRender(<IssueIndentMaster isVisible={true} {...props} typeData={['PARAM_MASTER']} fetchIssueList={jest.fn()} handleBtnVisibility={jest.fn()} resetIssueList={jest.fn()} handleCollapses={jest.fn(0)}/>);
    });

    it("IssueVehicleDetailsProps", ()=>{
        const props = {
            isVisible:true,
            onCloseAction:jest.fn(),
            titleOverride:'Issue vehicle Details',
            onFinish:jest.fn(),
            cancellationData :{balancedQuantity: '10',},
            handleVinSearch:jest.fn(),
            vehicleVinData:[{vehicleSearch:[{invoiceDate:'23', grnDate:'12'}]}],
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

