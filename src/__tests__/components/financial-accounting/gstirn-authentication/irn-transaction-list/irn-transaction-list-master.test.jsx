/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
// eslint-disable-next-line jest/no-mocks-import
import createMockStore from '__mocks__/store';
import { IrnTransactionListMaster } from "components/FinancialAccounting/GSTIRNAuthentication/IrnTransactionList";
import { Provider } from 'react-redux';
import { fireEvent, screen } from "@testing-library/react";
import { Form } from 'antd';

const FormWrapper = (props) => {
    const [form] = Form.useForm();

    const myMock = {
        ...form,
        resetFields:jest.fn()
    }
    return(<IrnTransactionListMaster form={myMock} {...props}/>)
}

afterEach(() => {
    jest.restoreAllMocks();
});

describe("IrnTransactionListMaster components", ()=>{

    it("treeText", ()=>{
        const mockStore = createMockStore({
            auth:{userId:'123'},
            data:{
                ApplicationMaster: { applicationDetailsData:[{applicationId: "HR", applicationName: "HR & MILE"}]},
                FinancialAccounting: {
                    GstIrnTransactionDetails: { data: [{ menuId: "HR", menuTitle: "HR & MILE" }] },
                },
            }
        });

        customRender(
            <Provider store={mockStore}>
                <FormWrapper isTreeViewVisible={true} isVisible={true} />
            </Provider>
        );

        const treeText = screen.getAllByText('HR & MILE')
        fireEvent.click(treeText[0]);
    });

})