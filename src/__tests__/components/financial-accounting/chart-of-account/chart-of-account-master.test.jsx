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
    it("component render", ()=>{
        customRender(<FormWrapper onCoaModelOpen={jest.fn()} setModalOpen={jest.fn(true)} onCoaFinish={jest.fn()} onFinishFailed={jest.fn()} />);

        const coaBtn = screen.getByRole('button', {name:'Export COA'});
        fireEvent.click(coaBtn);
    });

    it("download button  render", ()=>{
        customRender(<FormWrapper onCoaModelOpen={jest.fn()} setModalOpen={jest.fn(true)} onCoaFinish={jest.fn()}/>);

        const coaBtn = screen.getByRole('button', {name:'Export COA'});
        fireEvent.click(coaBtn);

        const downloadBtn = screen.getByRole('button', {name:'Download'});
        fireEvent.click(downloadBtn);
    });
    
    it("calender image  render", ()=>{
        const setModalOpen = jest.fn();
        customRender(<FormWrapper onCoaModelOpen={jest.fn()} />);

        const coaBtn = screen.getByRole('button', {name:'Export COA'});
        fireEvent.click(coaBtn);
        setModalOpen(true);

        const calenderImg = screen.getAllByRole('img', {name:'calendar'});
        fireEvent.click(calenderImg[0]);
    });

    it("cancel button  render", ()=>{ 
        const setModalOpen = jest.fn();
        customRender(<FormWrapper onCoaModelOpen={jest.fn()} onCloseAction={jest.fn()} setIsFormVisible={jest.fn()}/>);

        const coaBtn = screen.getByRole('button', {name:'Export COA'});
        fireEvent.click(coaBtn);
        setModalOpen(true);

        const cancelBtn = screen.getByRole('button', {name:'Cancel'});
        fireEvent.click(cancelBtn);
        setModalOpen(false)
    });

    it('formActionType=child',()=>{
        const formActionType = 'child';
        customRender(<FormWrapper  formActionType={formActionType} />);
    })

    it('formActionType=sibling',()=>{
        const formActionType = 'sibling';
        customRender(<FormWrapper formActionType={formActionType} />);
    })

    it('formActionType=edit',()=>{
        const formActionType = 'edit';
        customRender(<FormWrapper formActionType={formActionType} />);
    })

    it('render', ()=>{
        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                DealerHierarchy: {
                    DealerCompany: { isDealerCompanyDataLoaded:true,},
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <ChartOfAccountMaster fetchDealerCompanyLov={jest.fn()} />
            </Provider>
        )
    })

    it('companyCode', ()=>{
        const selectProps = {
            optionFilterProp: 'children',
            showSearch: true,
            allowClear: true,
            loading:false,
            disabled:false,
        };
        const chartOfAccountHierarchy = [{accountCode: 'UDAII'}];
        const title = 'Financial Company';
        const companyFieldNames = { value: 'companyName', key: 'companyCode' };

        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                DealerHierarchy: {
                    DealerCompany: { isDealerCompanyDataLoaded : false,  dealerCompanyLovData : [{
                        address: "adress1", companyCode: "WP01"
                    }] },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <ChartOfAccountMaster companyCode={'CC02'} chartOfAccountHierarchy={chartOfAccountHierarchy} {...selectProps} title={title} companyFieldNames={companyFieldNames} />
            </Provider>
        )

    })
    
});
