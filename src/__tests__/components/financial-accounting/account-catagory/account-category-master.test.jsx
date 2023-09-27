/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AccountCategory } from '@components/FinancialAccounting/AccountCategory/AccountCategoryMaster';
import customRender from '@utils/test-utils';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { rootReducer } from 'store/reducers';
import { Form } from 'antd';

const accountCategoryData = {totalRecords:'89',paginationData:[{accountCategoryCode: 'A001', accountCategoryDescription: 'Parts Account', status: true}]};
const applicationMenuData = [{ 
        accessType: "R",
        deviceType: "W",
        displayOrder: 1,
        isFavourite: "0",
        menuIconUrl: "icon",
        menuId: "HR",
        menuTitle: "HR & MILE",
        parentMenuId: "Web",
        action: [{actionId: "U01", actionMasterId: "123",actionName:  "update",applicationActionId: "324",status: true}],
        subMenu:[{accessType: "R",action:[],deviceType: "W",displayOrder: 1,isFavourite: "0",menuIconUrl: "icon",menuId: "SACT-04",menuTitle: "Vehicle Stock",parentMenuId: "Sales",
        }]
    },]

const financialAccountData = [{id: "123",key: "UDAII", parentKey: null,value: "UDAII"}];
const accountCategoryDocumentDescription = [{accountCategoryCode: "A001",accountCategoryDescription: "Parts Account",accountDocumentMaps:[],status: true}];

const fetchAccountCategory = jest.fn();
const fetchApplicationMenu = jest.fn();
const fetchFinancialAccountHead = jest.fn();
const fetchDocumentDescription = jest.fn();
const fetchAccountCategoryDetail = jest.fn()

export const createMockStore = (initialState) => {
    const mockStore = configureStore({
        reducer: rootReducer,
        preloadedState: initialState,
        middleware: [thunk],
    });

    return mockStore;
};


const FormWrapper = (props) => {
    const [accDocMapForm] = Form.useForm();

    const myFormMock = {
        ...accDocMapForm,
        setFieldsValue: jest.fn(),
    };
    return <AccountCategory accDocMapForm={myFormMock} {...props} />;
};

afterEach(() => {
    jest.restoreAllMocks();
});

describe('AccountCategory components', () => {

    it('should render table header', () => {
        customRender(<AccountCategory />);
    });

    it('should render search input',()=>{
        customRender(<AccountCategory setPage={jest.fn()} setFilterString={jest.fn()} handleClearInSearch={jest.fn()} />);

        const inputText = screen.getByRole('textbox', {name:'Account Category Code'});
        fireEvent.change(inputText, { target:{value:'test'} });

        const searchImg = screen.getByRole('img', {name:'search'});
        fireEvent.click(searchImg);
    })

    it('should render close-circle',()=>{
        customRender(<AccountCategory  handleClearInSearch={jest.fn()} setFilterString={jest.fn()} setShowDataLoading={jest.fn()} />);

        const inputTextCode = screen.getByRole('textbox', {name:'Account Category Code'});
        fireEvent.change(inputTextCode, { target:{value:'testCategoryCode'} });

        const closeCircle = screen.getByRole('img', {name:'close-circle'});
        fireEvent.click(closeCircle);
    });

    it("Cancel button", ()=>{
        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                FinancialAccounting: {
                    AccountCategory: { isLoading:false, data:accountCategoryData },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <FormWrapper />
            </Provider>
        )
    
        const plusAdd = screen.getByRole('button', {name:'plus Add'});
        fireEvent.click(plusAdd)

        const cancelBtn = screen.getByRole('button', {name:'Cancel'});
        fireEvent.click(cancelBtn);
    });

    it("view and edit button should render", ()=>{
        const formData={accountCategoryCode:"A001"};

        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                FinancialAccounting: {
                    AccountCategory: { isLoading: false, data: accountCategoryData },
                    ApplicationMenu: { isLoaded: false, data: applicationMenuData},
                    FinancialAccountHead: { isLoaded:false, data: financialAccountData },
                    AccountCategoryDocumentDescription: { isLoaded: false, data: accountCategoryDocumentDescription },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <FormWrapper fetchAccountCategory={fetchAccountCategory} fetchApplicationMenu={fetchApplicationMenu} fetchFinancialAccountHead={fetchFinancialAccountHead} fetchDocumentDescription={fetchDocumentDescription} />
            </Provider>
        );
    });
    
});

