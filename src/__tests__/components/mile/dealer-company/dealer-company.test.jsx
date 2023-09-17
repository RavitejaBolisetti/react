import '@testing-library/jest-dom/extend-expect';
import { DealerCompany } from '@components/Mile/DealerCompany/DealerCompany';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from "@testing-library/react";
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
    const [listFiltformerForm, form] = Form.useForm();
    const myFormMock = {
        ...listFiltformerForm,
        setFieldsValue: jest.fn(),
    };
    return <DealerCompany form={form} listFiltformerForm={myFormMock} {...props} />;
};

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Dealer company components', () => {
    it('should render dealer company search components', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                DealerHierarchy: {
                    DealerCompany: { data: [{ key: 1, value: 'test' }, { key: 1, value: 'test' }] },
                    DealerParent: { dealerParentData: [{ key: 1, value: 'test' }, { key: 1, value: 'test' }] }
                },
            },
        });
        const tableData = [{ key: 1, value: 'test' }, { key: 2, value: 'test' }]
        const props = {
            formActionType: { viewMode: false, editMode: true },
            setButtonData: jest.fn(),
            formData: { status: true, name: "test" }
        }

        const filterString = {
            keyword: 'test',
            advanceFilter: true
        }
        customRender(
            <Provider store={mockStore}>
                <FormWrapper isVisible={true}
                    tableData={tableData}
                    handleButtonClick={jest.fn()}
                    showAddButton={true}
                    filterString={filterString}
                    fetchList={jest.fn()}
                    isLoading={false}
                    {...props}
                    setSearchdata={jest.fn()}
                    saveData={jest.fn()}
                    fetchDealerParentLovList={jest.fn()}
                    setFormData={jest.fn()}
                />
            </Provider>
        )
     
        const textBox = screen.getByPlaceholderText('Search');
        fireEvent.change(textBox, { target: { value: 'kai' } });

        const searchImg = screen.getByRole('button', { name: 'search' });
        fireEvent.click(searchImg);
    });

    it('should render dealer company search close circal components', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                DealerHierarchy: {
                    DealerCompany: { data: [{ key: 1, value: 'test' }, { key: 1, value: 'test' }] },
                    DealerParent: { dealerParentData: [{ key: 1, value: 'test' }, { key: 1, value: 'test' }] }
                },
            },
        });
        const tableData = [{ key: 1, value: 'test' }, { key: 2, value: 'test' }]
        const props = {
            formActionType: { viewMode: false, editMode: true },
            setButtonData: jest.fn(),
            formData: { status: true, name: "test" }
        }

        const filterString = {
            keyword: 'test',
            advanceFilter: true
        }
        customRender(
            <Provider store={mockStore}>
                <FormWrapper isVisible={true}
                    tableData={tableData}
                    handleButtonClick={jest.fn()}
                    showAddButton={true}
                    filterString={filterString}
                    fetchList={jest.fn()}
                    isLoading={false}
                    {...props}
                    setSearchdata={jest.fn()}
                    saveData={jest.fn()}
                    fetchDealerParentLovList={jest.fn()}
                    setFormData={jest.fn()}
                />
            </Provider>
        )        

        const textBox = screen.getByPlaceholderText('Search');
        fireEvent.change(textBox, { target: { value: 'kai' } });

        const searchImg = screen.getByRole('button', { name: 'search' });
        fireEvent.click(searchImg);

        const closeImg = screen.getByRole('button', { name: 'close-circle' });
        fireEvent.click(closeImg);
    });


    it('should render dealer company search add button components', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                DealerHierarchy: {
                    DealerCompany: { data: [{ key: 1, value: 'test' }, { key: 1, value: 'test' }] },
                    DealerParent: { dealerParentData: [{ key: 1, value: 'test' }, { key: 1, value: 'test' }] }
                },
            },
        });
        const tableData = [{ key: 1, value: 'test' }, { key: 2, value: 'test' }]
        const props = {
            formActionType: { viewMode: false, editMode: true },
            setButtonData: jest.fn(),
            formData: { status: true, name: "test" }
        }

        const filterString = {
            keyword: 'test',
            advanceFilter: true
        }
        customRender(
            <Provider store={mockStore}>
                <FormWrapper isVisible={true}
                    tableData={tableData}
                    handleButtonClick={jest.fn()}
                    showAddButton={true}
                    filterString={filterString}
                    fetchList={jest.fn()}
                    isLoading={false}
                    {...props}
                    setSearchdata={jest.fn()}
                    saveData={jest.fn()}
                    fetchDealerParentLovList={jest.fn()}
                    setFormData={jest.fn()}
                />
            </Provider>
        )        

        const searchInput = screen.getByPlaceholderText('Search');
        fireEvent.change(searchInput, { target: { value: '123456' } })

        const searchImg = screen.getByRole('button', { name: 'search' });
        fireEvent.click(searchImg);       

        const closeImg = screen.getByRole('button', { name: 'close-circle' });
        fireEvent.click(closeImg);

        const plusImg = screen.getByRole('button', { name: 'plus Add' });
        fireEvent.click(plusImg);        

        const pinCode = screen.getByRole('combobox', { name: 'Pin Code' });
        fireEvent.change(pinCode, { target: { value: '123456' } })

        const groupCode = screen.getByRole('combobox', { name: 'Group Code' });
        fireEvent.change(groupCode, { target: { value: 'test' } })

        const groupName = screen.getByRole('textbox', { name: 'Group Name' });
        fireEvent.change(groupName, { target: { value: 'test' } })

        const companyCode = screen.getByRole('textbox', { name: 'Company Code' });
        fireEvent.change(companyCode, { target: { value: 'test' } })

        const companyAddress = screen.getByRole('textbox', { name: 'Company Address' });
        fireEvent.change(companyAddress, { target: { value: 'test' } })

        const city = screen.getByRole('textbox', { name: 'City' });
        fireEvent.change(city, { target: { value: 'test' } })

        const tehsil = screen.getByRole('textbox', { name: 'Tehsil' });
        fireEvent.change(tehsil, { target: { value: 'test' } })

        const dist = screen.getByRole('textbox', { name: 'District' });
        fireEvent.change(dist, { target: { value: 'test' } })

        const state = screen.getByRole('textbox', { name: 'State' });
        fireEvent.change(state, { target: { value: 'test' } })

        const tin = screen.getByRole('textbox', { name: 'TIN' });
        fireEvent.change(tin, { target: { value: 'test' } })

        const tan = screen.getByRole('textbox', { name: 'TAN' });
        fireEvent.change(tan, { target: { value: 'test' } })

        const pan = screen.getByRole('textbox', { name: 'PAN' });
        fireEvent.change(pan, { target: { value: 'test' } })

        const status = screen.getByRole('switch', { name: 'Status' });
        fireEvent.click(status)

        const saveAnd = screen.getByRole('button', { name: 'Save & Add New' });
        fireEvent.click(saveAnd);

        const save = screen.getByRole('button', { name: 'Save' });
        fireEvent.click(save);
    });

    it('should render dealer company add form components', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                DealerHierarchy: {
                    DealerCompany: { data: [{ key: 1, value: 'test' }, { key: 1, value: 'test' }] },

                },
            },
        });     

        const formActionType = { viewMode: false, editMode: true }
        const buttonData = { saveAndNewBtn: true, cancelBtn: true, closeBtn: true }
        const formData = { companyCode: "test", parentCode: "test", status: true, parentId: 11 }
        const pincodeData = [{ key: 1, id: 1, value: "test", pinCode: "4545" }, { key: 2, id: 2, pinCode: "4545", value: "test" }]
        const filterString = { keyword: 'test' }
        
        customRender(
            <Provider store={mockStore}>
                <FormWrapper isVisible={true}
                    formActionType={formActionType}
                    formData={formData}
                    buttonData={buttonData}
                    handleButtonClick={jest.fn()} 
                    onCloseAction={jest.fn()} 
                    setButtonData={jest.fn()} 
                    handleFormValueChange={jest.fn()} 
                    setFormData={jest.fn()}
                    setFormActionType={jest.fn()}
                    onFinish={jest.fn()}
                    onFinishFailed={jest.fn()}
                    fetchPincodeDetail={jest.fn()}
                    pincodeData={pincodeData}
                    dealerParentData={pincodeData}
                    titleOverride={jest.fn()}
                    filterString={filterString}
                    fetchList={jest.fn()}
                    saveData={jest.fn()}
                    fetchDealerParentLovList={jest.fn()}
                />
            </Provider>
        )

        const textBox = screen.getByPlaceholderText('Search');
        fireEvent.change(textBox, { target: { value: 'kai' } });

        const searchImg = screen.getByRole('img', { name: 'search' });
        fireEvent.click(searchImg);

        const leftImg = screen.getByRole('img', { name: 'left' });
        fireEvent.click(leftImg);

        const rightImg = screen.getByRole('img', { name: 'right' });
        fireEvent.click(rightImg);

        const closeImg = screen.getByRole('img', { name: 'close-circle' });
        fireEvent.click(closeImg);

        const plusImg = screen.getByRole('img', { name: 'plus' });
        fireEvent.click(plusImg);

        const saveAnd = screen.getByRole('button', { name: 'Save & Add New' });
        fireEvent.click(saveAnd);

        const save = screen.getByRole('button', { name: 'Save' });
        fireEvent.click(save);

        const closeBtn = screen.getByRole('button', { name: 'Close' });
        fireEvent.click(closeBtn);
    }); 
    
    it('should render dealer company add form cancel components', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                DealerHierarchy: {
                    DealerCompany: { data: [{ key: 1, value: 'test' }, { key: 1, value: 'test' }] },

                },
            },
        });     

        const formActionType = { viewMode: false, editMode: true }
        const buttonData = { saveAndNewBtn: true, cancelBtn: true, closeBtn: true }
        const formData = { companyCode: "test", parentCode: "test", status: true, parentId: 11 }
        const pincodeData = [{ key: 1, id: 1, value: "test", pinCode: "4545" }, { key: 2, id: 2, pinCode: "4545", value: "test" }]
        const filterString = { keyword: 'test' }
        
        customRender(
            <Provider store={mockStore}>
                <FormWrapper isVisible={true}
                    formActionType={formActionType}
                    formData={formData}
                    buttonData={buttonData}
                    handleButtonClick={jest.fn()} 
                    onCloseAction={jest.fn()} 
                    setButtonData={jest.fn()} 
                    handleFormValueChange={jest.fn()} 
                    setFormData={jest.fn()}
                    setFormActionType={jest.fn()}
                    onFinish={jest.fn()}
                    onFinishFailed={jest.fn()}
                    fetchPincodeDetail={jest.fn()}
                    pincodeData={pincodeData}
                    dealerParentData={pincodeData}
                    titleOverride={jest.fn()}
                    filterString={filterString}
                    fetchList={jest.fn()}
                    saveData={jest.fn()}
                    fetchDealerParentLovList={jest.fn()}
                />
            </Provider>
        )

        const textBox = screen.getByPlaceholderText('Search');
        fireEvent.change(textBox, { target: { value: 'kai' } });

        const searchImg = screen.getByRole('img', { name: 'search' });
        fireEvent.click(searchImg);

        const leftImg = screen.getByRole('img', { name: 'left' });
        fireEvent.click(leftImg);

        const rightImg = screen.getByRole('img', { name: 'right' });
        fireEvent.click(rightImg);

        const closeImg = screen.getByRole('img', { name: 'close-circle' });
        fireEvent.click(closeImg);

        const plusImg = screen.getByRole('img', { name: 'plus' });
        fireEvent.click(plusImg);

        const saveAnd = screen.getByRole('button', { name: 'Save & Add New' });
        fireEvent.click(saveAnd);

        const save = screen.getByRole('button', { name: 'Save' });
        fireEvent.click(save);

        const cancelBtn = screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancelBtn);
    }); 
});
