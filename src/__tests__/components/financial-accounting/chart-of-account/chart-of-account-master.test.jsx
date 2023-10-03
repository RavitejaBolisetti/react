/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ChartOfAccountMaster } from '@components/FinancialAccounting/ChartOfAccount/ChartOfAccountMaster';
import customRender from '@utils/test-utils';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { rootReducer } from 'store/reducers';

export const createMockStore = (initialState) => {
    const mockStore = configureStore({
        reducer: rootReducer,
        preloadedState: initialState,
        middleware: [thunk],
    });

    return mockStore;
};

afterEach(() => {
    jest.restoreAllMocks();
});

describe("ChartOfAccountMaster component render", ()=>{
    
    it("GRP", ()=>{
        const COA_ACCOUNT_TYPE = {
            GROUP_ACCOUNT: {
                id: 1,
                key: 'GRP',
                title: 'Group Account',
            }
        };

        const mockStore = createMockStore({
            auth:{userId:123},
            data: {
                FinancialAccounting: {
                    ChartOfAccountMaster: {
                        ChartOfAccountHierarchy: { data: [{accountCode: "TEST",accountDescription: "CODEPE"}] },
                        ChartOfAccount: { data: {accountType:'GRP'} },
                    },
                },
            }
        })

        customRender(
            <Provider store={mockStore}>
                <ChartOfAccountMaster selectedTreeKey={["TEST"]} COA_ACCOUNT_TYPE={COA_ACCOUNT_TYPE} />
            </Provider>
        )
    })

    it("LDGR", ()=>{
        const COA_ACCOUNT_TYPE = {
            LEDGER_ACCOUNT: {
                id: 2,
                key: 'LDGR',
                title: 'Ledger Account',
            },
        };

        const mockStore = createMockStore({
            auth:{userId:123},
            data: {
                FinancialAccounting: {
                    ChartOfAccountMaster: {
                        ChartOfAccountHierarchy: { data: [{accountCode: "CODE",accountDescription: "CODE"}] },
                        ChartOfAccount: { data: {accountType:'LDGR'} },
                    },
                },
            }
        })

        customRender(
            <Provider store={mockStore}>
                <ChartOfAccountMaster selectedTreeKey={["CODE"]} COA_ACCOUNT_TYPE={COA_ACCOUNT_TYPE} />
            </Provider>
        )
    })

    it("export coaBtn",()=>{
        const mockStore = createMockStore({
            auth:{userId:123},
            data: {
                FinancialAccounting: {
                    ChartOfAccountMaster: {
                        ChartOfAccountHierarchy: { data: [{accountCode: "1212",accountDescription: "desc", accountType: "LDGR"}] },
                    },
                },
            }
        })

        customRender(
            <Provider store={mockStore}>
                <ChartOfAccountMaster disable={false} companyCode={'WP01'} />
            </Provider>
        );

        const coaBtn = screen.getByRole('button', {name:'Export COA'});
        fireEvent.click(coaBtn)
    });

    it("saveBtn",()=>{
        const formActionType={EDIT: 'edit',  SIBLING: 'sibling'};
        const buttonData = {editBtn:true, save:true}

        const mockStore = createMockStore({
            auth:{userId:123},
            data: {
                FinancialAccounting: {
                    ChartOfAccountMaster: {
                        ChartOfAccountHierarchy: { data: [{accountCode: "NKAJ",accountDescription: "NKAJ"}] },

                        ChartOfAccount: { data: {parentAccountCode:'', accountCode:"NKAJ", accountDescription:"NKAJ", accountType:"LDGR", openingBalanceCredit:'12', openingBalanceDebit:'90', status:true, financialCompany: "Wipro", id:'123', isChildAvailable: false, parentAccountDescription:'DMS' } },
                    },
                },
            }
        })

        customRender(
            <Provider store={mockStore}>
                <ChartOfAccountMaster selectedTreeKey={["NKAJ"]} buttonData={buttonData} formActionType={formActionType} disable={false}/>
            </Provider>
        )

        const codeText = screen.getByText(/NKAJ/i);
        fireEvent.click(codeText);

        const editBtn = screen.getByRole('button', {name:'Edit'});
        fireEvent.click(editBtn);

        const code = screen.getByRole('textbox', {name:'Code'});
        fireEvent.change(code, {target:{value:'NKAJ'}});

        const desc = screen.getByRole('textbox', {name:'Description'});
        fireEvent.change(desc, {target:{value:"NKAJ"}});

        const credit = screen.getByRole('textbox', {name:'Opening Balance Credit'});
        fireEvent.change(credit, {target:{value:"12"}});

        const debit = screen.getByRole('textbox', {name:'Opening Balance Debit'});
        fireEvent.change(debit, {target:{value:"90"}});

        const status = screen.getByRole('switch', {name:'Status'});
        fireEvent.click(status);

        const saveBtn = screen.getByRole('button', {name:'Save'});
        fireEvent.click(saveBtn);
    });

    it("editBtn",()=>{
        const formActionType={EDIT: 'edit'};
        const buttonData = {editBtn:true}

        const mockStore = createMockStore({
            auth:{userId:123},
            data: {
                FinancialAccounting: {
                    ChartOfAccountMaster: {
                        ChartOfAccountHierarchy: { data: [{accountCode: "CODEPE",accountDescription: "CODEPE"}] },
                    },
                },
            }
        })

        customRender(
            <Provider store={mockStore}>
                <ChartOfAccountMaster selectedTreeKey={["CODEPE"]} buttonData={buttonData} formActionType={formActionType} />
            </Provider>
        )

        const codeText = screen.getByText(/CODEPE/i);
        fireEvent.click(codeText);

        const editBtn = screen.getByRole('button', {name:'Edit'});
        fireEvent.click(editBtn);

        // const saveBtn = screen.getByRole('button', {name:'Save'});
        // fireEvent.click(saveBtn)

        const cancelBtn = screen.getByRole('button', {name:'Cancel'});
        fireEvent.click(cancelBtn)
    });

    it("isChildAvailable",()=>{
        const formActionType={EDIT: 'edit'};
        const buttonData = {editBtn:true}

        const mockStore = createMockStore({
            auth:{userId:123},
            data: {
                FinancialAccounting: {
                    ChartOfAccountMaster: {
                        ChartOfAccountHierarchy: { data: [{accountCode: "AVAILABLE",accountDescription: "AVAILABLE"}] },
                        ChartOfAccount: { data: {isChildAvailable:true} },
                    },
                },
            }
        })

        customRender(
            <Provider store={mockStore}>
                <ChartOfAccountMaster selectedTreeKey={["AVAILABLE"]} buttonData={buttonData} formActionType={formActionType} />
            </Provider>
        )

        const codeText = screen.getByText(/AVAILABLE/i);
        fireEvent.click(codeText);

        const editBtn = screen.getByRole('button', {name:'Edit'});
        fireEvent.click(editBtn);
    });

    it("childBtn",()=>{
        const formActionType={CHILD:'child'};
        const buttonData = {childBtn:true};

        const mockStore = createMockStore({
            auth:{userId:123},
            data: {
                FinancialAccounting: {
                    ChartOfAccountMaster: {
                        ChartOfAccountHierarchy: { data: [{accountCode: "DONEIT1",accountDescription: "DONEIT1"}] },
                    },
                },
            }
        })

        customRender(
            <Provider store={mockStore}>
                <ChartOfAccountMaster selectedTreeKey={["DONEIT1"]} buttonData={buttonData} formActionType={formActionType} />
            </Provider>
        )

        const codeText = screen.getByText(/DONEIT1/i);
        fireEvent.click(codeText);

        const childBtn = screen.getByRole('button', {name:'Add Child'});
        fireEvent.click(childBtn);
    });

    it("siblingBtn",()=>{
        const formActionType={SIBLING: 'sibling'};
        const buttonData = {siblingBtn:true};

        const mockStore = createMockStore({
            auth:{userId:123},
            data: {
                FinancialAccounting: {
                    ChartOfAccountMaster: {
                        ChartOfAccountHierarchy: { data: [{accountCode: "DONEIII123",accountDescription: "DONEIII123"}] },
                    },
                },
            }
        })

        customRender(
            <Provider store={mockStore}>
                <ChartOfAccountMaster selectedTreeKey={["DONEIII123"]} buttonData={buttonData} formActionType={formActionType} />
            </Provider>
        )

        const codeText = screen.getByText(/DONEIII123/i);
        fireEvent.click(codeText);

        const siblingBtn = screen.getByRole('button', {name:'Add Sibling'});
        fireEvent.click(siblingBtn);
    });

    it("parentAccountCode",()=>{
        const formActionType={SIBLING: 'sibling'};
        const buttonData = {siblingBtn:true};

        const mockStore = createMockStore({
            auth:{userId:123},
            data: {
                FinancialAccounting: {
                    ChartOfAccountMaster: {
                        ChartOfAccountHierarchy: { data: [{accountCode: "DONE",accountDescription: "DONE"}] },
                        ChartOfAccount: { data: {parentAccountCode:''} },
                    },
                },
            }
        })

        customRender(
            <Provider store={mockStore}>
                <ChartOfAccountMaster selectedTreeKey={["DONE"]} buttonData={buttonData} formActionType={formActionType} />
            </Provider>
        )

        const codeText = screen.getByText(/DONE/i);
        fireEvent.click(codeText);

        const siblingBtn = screen.getByRole('button', {name:'Add Sibling'});
        fireEvent.click(siblingBtn);
    });

    it("onSelect function", ()=>{
        const fieldNames = { value: 'companyName', key: 'companyCode' };

        const mockStore = createMockStore({
            auth:{userId:123},
            data: {
                DealerHierarchy: {
                    DealerCompany: { isLoaded: false, data: [{companyCode:'WP01', companyName:'Wipro'}] },
                },
            }
        })

        customRender(
            <Provider store={mockStore}>
                <ChartOfAccountMaster fieldNames={fieldNames} modalOpen={true} disabled={false} companyCode={'WP01'} />
            </Provider>
        )

        const companyName = screen.getByRole('combobox', { name: '',});
        act(async () => {
            fireEvent.change(companyName, { target: { value: 'Wipro' } });
            const company = screen.getByText('Wipro');
            fireEvent.click(company);
        });

        const exportBtn = screen.getByRole('button', {name:'Export COA'});
        fireEvent.click(exportBtn);
    }); 

});