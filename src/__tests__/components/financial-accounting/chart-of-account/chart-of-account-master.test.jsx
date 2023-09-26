/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ChartOfAccountMaster } from '@components/FinancialAccounting/ChartOfAccount/ChartOfAccountMaster';
import customRender from '@utils/test-utils';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { rootReducer } from 'store/reducers';
import { Form } from 'antd';

export const createMockStore = (initialState) => {
    const mockStore = configureStore({
        reducer: rootReducer,
        preloadedState: initialState,
        middleware: [thunk],
    });

    return mockStore;
};

const FormWrapper = (props) =>{
    const [exportCoaForm] = Form.useForm();
    const myMock = {
        ...exportCoaForm,
        resetFields:jest.fn(),
        validateFields:jest.fn(),
    }

    return <ChartOfAccountMaster exportCoaForm={myMock} {...props} />
}

afterEach(() => {
    jest.restoreAllMocks();
});

describe("ChartOfAccountMaster component render", ()=>{
    const companyCode = { value: 'companyName', key: 'companyCode' };
    it("component render", ()=>{
        customRender(<FormWrapper onCoaModelOpen={jest.fn()} companyCode={companyCode} />);

        const coaBtn = screen.getByRole('button', {name:'Export COA'});
        fireEvent.click(coaBtn);
    });

    it('chartOfAccountHierarchy', ()=>{
        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                FinancialAccounting: {
                    ChartOfAccountMaster: {
                        ChartOfAccountHierarchy: { isLoaded: false, data: [{accountCode: 'UDAII'}] },
                    }  
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <ChartOfAccountMaster />
            </Provider>
        )
    })
    
});
