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
        resetFields:jest.fn()
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

    it("vin-id", ()=>{
        customRender(<FormWrapper isVisible={true} disabledProps={{}} handleDependentReset={jest.fn()} />);

        // const vinTextbox = screen.getByTestId('vin-id');
        // fireEvent.change(vinTextbox, {target:{value:'test1'}})
    });

    it("modalProps", ()=>{
        customRender(<IssueVehicleDetailsModal isVisible={true} {...modalProps}/>);
    });
})