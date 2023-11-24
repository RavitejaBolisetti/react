/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AdvancedSearch } from '@components/Sales/StockTransferIndent/AdvancedSearch';
import customRender from '@utils/test-utils';
import { Form } from 'antd';
// eslint-disable-next-line jest/no-mocks-import
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';

jest.mock('store/actions/data/sales/stockTransfer/StockTransferIndent', () => ({
    stockTransferIndent: {},
}));

const FornWrapper = (props) => {
    const [advanceFilterForm] = Form.useForm();

    const myMock = {
        ...advanceFilterForm,
        resetFields:jest.fn(),
        getFieldValue:jest.fn()
    }
    return <AdvancedSearch advanceFilterForm={myMock} {...props} />
}


describe("AdvancedSearch",()=>{

    it("handleResetFilter", ()=>{
        const modalProps = {
            reset: true,
            resetName: 'Reset',
        };    
        customRender(<FornWrapper isVisible={true} {...modalProps} />);

        const resetBtn = screen.getByRole('button', {name:'Reset'});
        fireEvent.click(resetBtn);
    });

    it("applyBtn", ()=>{
        const modalProps = {
            submitName: 'Apply',
        };    

        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                stockTransferIndentData: {
                    stockTransferIndent: { filter: {  advanceFilter: true, fromDate: "2023-10-30", toDate: "2023-10-31"} },
                },
            },
        });

        customRender(
            <Provider store={mockStore}>
                <FornWrapper isVisible={true} {...modalProps} />
            </Provider>
        );

        const fromDate = screen.getByRole('textbox', {name:'Indent From Date'});
        fireEvent.change(fromDate, {target:{value:'2023-10-30'}});

        const toDate = screen.getByRole('textbox', {name:'Indent To Date'});
        fireEvent.change(toDate, {target:{value:'2023-10-31'}});

        const applyBtn = screen.getByRole('button', {name:'Apply'});
        fireEvent.click(applyBtn);
    });

    it("searchList", ()=>{
        const searchList = [{key:"REC_TO", parentKey: "INDENT", value: "Receive From"}];

        customRender(<FornWrapper isVisible={true} searchList={searchList} toggleButton={'INDNT_RAISED'} />);
    });

    it("INDNT_RECV", ()=>{
        const searchList = [{key:"REC_TO", parentKey: "INDENT", value: "Receive From"}];

        customRender(<FornWrapper isVisible={true} searchList={searchList} toggleButton={'INDNT_RECV'} />);
    });
})