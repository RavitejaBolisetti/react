/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { IssueVehicleDetailsModal } from '@components/Sales/StockTransferIndent/IssueIndent/Modals/IssueVehicleModal';
import customRender from '@utils/test-utils';
import { Form } from 'antd';

const FormWrapper = (props) => {
    const [issueForm] = Form.useForm();
    const myMock = {
        ...issueForm,
        resetFields:jest.fn(),
        getFieldValue:jest.fn()
    }
    return <IssueVehicleDetailsModal issueForm={myMock} {...props} />
}

describe("IssueVehicleDetailsModal component", ()=>{
    const modalProps = {
        reset: true,
        submit: true,
        resetName: 'Cancel',
        submitName: 'Submit',
        handleResetFilter: jest.fn(),
    };

    it("VIN textbox", ()=>{
        customRender(<FormWrapper isVisible={true}  handleDependentReset={jest.fn()} handleVinSearch={jest.fn()}/>);

        const vinTextBox = screen.getByRole('textbox', {name:'VIN'});
        fireEvent.change(vinTextBox, {target:{value:'test'}})

        const searchBtn = screen.getByRole('button', {name:'search'});
        fireEvent.click(searchBtn);
    });

    it("Issue Charges Fieldtext", ()=>{
        customRender(<FormWrapper isVisible={true} {...modalProps} isIssuePriceValid={jest.fn()}/>);

        const issueCharges = screen.getByRole('textbox', {name:'Issue Charges'});
        fireEvent.change(issueCharges, {target:{value:'test1'}})
    });

    it("disabledProps", ()=>{
        customRender(<FormWrapper isVisible={true} disabledProps={{}} />);
    });
})