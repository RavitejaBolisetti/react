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
        const formData = { companyCode: "test", parentCode: "test", status: true }

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

        const cancel = screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancel);
    });
});
