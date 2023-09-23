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

        const srl = screen.getByRole('columnheader', {name:'Srl.'});
        expect(srl).toBeTruthy();

        const accountCategory = screen.getByRole('columnheader', {name:'Account Category Code'});
        expect(accountCategory).toBeTruthy();

        const description = screen.getByRole('columnheader', {name:'Description'});
        expect(description).toBeTruthy();

        const status = screen.getByRole('columnheader', {name:'Status'});
        expect(status).toBeTruthy();

        const action = screen.getByRole('columnheader', {name:'Action'});
        expect(action).toBeTruthy();
    });

    it('should render search input',()=>{
        customRender(<AccountCategory setPage={jest.fn()} setFilterString={jest.fn()} handleClearInSearch={jest.fn()} />);

        const inputText = screen.getByRole('textbox', {name:'Account Category Code'});
        fireEvent.change(inputText, { target:{value:'test'} });

        const searchImg = screen.getByRole('img', {name:'search'});
        fireEvent.click(searchImg);
    })

    it('seacrh icon should work when textbox is empty',()=>{
        customRender(<AccountCategory setPage={jest.fn()} setFilterString={jest.fn()} />);

        const inputText = screen.getByRole('textbox', {name:'Account Category Code'});
        fireEvent.change(inputText, { target:{value:''} });

        const searchImg = screen.getByRole('img', {name:'search'});
        fireEvent.click(searchImg);
    })

    it('should render close-circle',()=>{
        customRender(<AccountCategory  handleClearInSearch={jest.fn()} setFilterString={jest.fn()} setShowDataLoading={jest.fn()} />);

        const inputTextCode = screen.getByRole('textbox', {name:'Account Category Code'});
        fireEvent.change(inputTextCode, { target:{value:'testCategoryCode'} });

        const closeCircle = screen.getByRole('img', {name:'close-circle'});
        fireEvent.click(closeCircle);
    })

    it('pass user id', ()=>{
        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                FinancialAccounting: {
                    AccountCategory: { isAccountCategoryLoaded:false, accountCategoryData : [] },
                    ApplicationMenu: { isApplicationMenuLoaded:false, applicationMenuData : [] },
                    FinancialAccountHead: { isFinancialAccountHeadLoaded:false, financialAccountData : [] },
                    AccountCategoryDocumentDescription: { isAccountCategoryDocumentDescriptionLoaded:false, accountCategoryDocumentDescription : [] },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <AccountCategory fetchAccountCategory={jest.fn()} fetchApplicationMenu={jest.fn()} />
            </Provider>
        )
    })

    it('tableProps pass', ()=>{
        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                FinancialAccounting: {
                    AccountCategory: { isAccountCategoryLoaded:true, isAccountCategoryLoading:true, accountCategoryData : [{accountCategoryCode: 'A001', accountCategoryDescription: 'Parts Account', status: true}] },
                    ApplicationMenu: { isApplicationMenuLoaded:true, applicationMenuData : [
                        {menuId: 'Finac', menuTitle: 'Financial Accounting', parentMenuId: 'Web', menuIconUrl: 'icon', isFavourite: '0'}] },
                    FinancialAccountHead: { isFinancialAccountHeadLoaded:true, financialAccountData : [] },
                    AccountCategoryDocumentDescription: { isAccountCategoryDocumentDescriptionLoaded:true, accountCategoryDocumentDescription : [] },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <FormWrapper showAddButton={true} />
            </Provider>
        )
    })

    it('formProps pass', ()=>{
        const formProps = {
            ADD_ACTION: "add",
            EDIT_ACTION: "edit",
            VIEW_ACTION: "view",
            accountCategoryData:[{accountCategoryCode: 'AC001'}],
            applicationMenuData:[{menuId: 'Finac'}],
            buttonData: {editBtn:false, saveBtn:true, saveAndNewBtn:false, saveAndNewBtnClicked:false, closeBtn:false,cancelBtn:true,formBtnActive:false},
            formActionType: {addMode: false, editMode: true, viewMode: false},
            formData:{accountCategoryCode: 'AC001'},
            formEdit:false,
            isVisible:true,
            titleOverride:"Edit Account Category",
        }

        customRender(<FormWrapper {...formProps} />);
    })

    it('advanceFilterResultProps pass',()=>{
        const advanceFilterResultProps = {
            advanceFilter:false,
            filterString:undefined,
            handleButtonClick:jest.fn(),
            tableData:[{accountCategoryCode: 'A001', accountCategoryDescription: 'Parts Account', status: true}]
        }

        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                FinancialAccounting: {
                    AccountCategory: { isAccountCategoryLoaded:true, isAccountCategoryLoading:true, accountCategoryData : [{accountCategoryCode: 'A001', accountCategoryDescription: 'Parts Account', status: true}] },
                    ApplicationMenu: { isApplicationMenuLoaded:true, applicationMenuData : [
                        {menuId: 'Finac', menuTitle: 'Financial Accounting', parentMenuId: 'Web', menuIconUrl: 'icon', isFavourite: '0'}] },
                    FinancialAccountHead: { isFinancialAccountHeadLoaded:true, financialAccountData : [] },
                    AccountCategoryDocumentDescription: { isAccountCategoryDocumentDescriptionLoaded:true, accountCategoryDocumentDescription : [] },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <FormWrapper {...advanceFilterResultProps} showAddButton={true} />
            </Provider>
        )
    })
});

