
/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import { AdvancedSearch } from '@components/FinancialAccounting/CreditDebitNote/AdvancedSearch';
import customRender from '@utils/test-utils';
import { Form } from 'antd';

const FormWrapper = (props) => {
    const [advanceFilterForm] = Form.useForm();
    const myMock = {
        ...advanceFilterForm,
        resetFields:jest.fn(),
    }
    return <AdvancedSearch advanceFilterForm={myMock} {...props} />
}

afterEach(() => {
    jest.restoreAllMocks();
});

describe("AdvancedSearch", ()=>{
    it("resetBtn", ()=>{
        const pageSize = undefined;
        customRender(<FormWrapper isVisible={true} typeData={['VOUCHR_TYPE']} handleResetFilter={jest.fn()} setFilterString={jest.fn()} pageSize={pageSize} />);
    })

    it("closeBtn", ()=>{
        customRender(<FormWrapper isVisible={true} typeData={['VOUCHR_TYPE']} onCloseAction={jest.fn()}/>);
    })
})