/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ExportCOA } from '@components/FinancialAccounting/ChartOfAccount/ExportCOA';
import customRender from '@utils/test-utils';
import { Form } from 'antd';

const FormWrapper = (props) =>{
    const [exportCoaForm] = Form.useForm();
    const myMock = {
        ...exportCoaForm,
        resetFields:jest.fn(),
        validateFields:jest.fn(),
    }

    return <ExportCOA exportCoaForm={myMock} {...props} />
}

afterEach(() => {
    jest.restoreAllMocks();
});

describe("ExportCOA component render", ()=>{
    it("component render", ()=>{
        const props = {
            modalOpen:true,
            onCoaFinish:jest.fn(),
            onFinishFailed:jest.fn(),
            setModalOpen:jest.fn(),
        }
        customRender(<ExportCOA  {...props}/>);
        
        const cancelBtn = screen.getByRole('button', {name:'Cancel'});
        fireEvent.click(cancelBtn)
    });

    it("component render", ()=>{
        const props = {
            modalOpen:true,
            onCoaFinish:jest.fn(),
            onFinishFailed:jest.fn(),
            setModalOpen:jest.fn(),
        }
        customRender(<ExportCOA  {...props}/>);
        
        const downloadBtn = screen.getByRole('button', {name:'Download'});
        fireEvent.click(downloadBtn)
    });
});
