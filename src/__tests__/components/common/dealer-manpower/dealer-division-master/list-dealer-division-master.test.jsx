/* eslint-disable no-unused-vars */
import '@testing-library/jest-dom/extend-expect';
import { ListDealerDivisionMaster } from '@components/common/DealerManpower/DealerDivisionMaster/ListDealerDivisionMaster';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import { Form } from 'antd';
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

let assignMock = jest.fn();

delete window.location;
window.location = { assign: assignMock };

afterEach(() => {
    assignMock.mockClear();
});

const FormWrapper = (props) => {
    const [form, listFilterForm] = Form.useForm();
    return <ListDealerDivisionMaster form={form} listFilterForm={listFilterForm} {...props} />;
}

const mockStore = createMockStore({
    auth: { userId: 106 },
    data: {
        DealerManpower: {
            DealerDivisionMaster: { isLoaded: false, isLoading: false, data: [{ key: 1, value: 'test' }, { key: 2, value: 'test' }] },
        },
    },
});

const buttonData = {
    closeBtn: false,
    cancelBtn: true,
    saveBtn: true,
    saveAndNewBtn: true,
    editBtn: false,
    formBtnActive: false,
};
const filterString = {
    keyword: 'test',
    advanceFilter: true
}
describe('Dealer division master components', () => {
    it('Should render Dealer division Applied Advance Filter components', () => {
        const props = {
            formActionType: { viewMode: false, editMode: false },
        }

        customRender(
            <Provider store={mockStore}>
                <FormWrapper isVisible={true}
                    {...props}
                    showAddButton={true}
                />
            </Provider>
        )

        const textBox = screen.getByRole('textbox', { name: 'Division Name' });
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
    })

    it('Should render Dealer division components', () => {
        const tableData = [{ key: 1, value: 'test' }, { key: 2, value: 'test' }]
        const props = {
            formActionType: { viewMode: false, editMode: true },
            setButtonData: jest.fn(),
            formData: { status: true, name: "test" }
        }
        customRender(
            <Provider store={mockStore}>
                <FormWrapper isVisible={true}
                    tableData={tableData}
                    handleButtonClick={jest.fn()}
                    showAddButton={true}
                    filterString={filterString}
                    buttonData={buttonData}
                    fetchList={jest.fn()}
                    saveButtonName={"Save"}
                    {...props}
                />
            </Provider>
        )

        const plusImg = screen.getByRole('img', { name: 'plus' });

        fireEvent.click(plusImg);


        const textBox = screen.getByPlaceholderText('Enter division code');
        fireEvent.change(textBox, { target: { value: 'kai' } });

        const typeName = screen.getByRole('textbox', { name: 'Division Name' });
        fireEvent.change(typeName, { target: { value: 'kai' } });

        const status = screen.getByRole('switch', { name: 'Status', exact: false })
        fireEvent.click(status);

        const saveBtn = screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn);

        const saveNewBtn = screen.getByRole('button', { name: 'Save & Add New' });
        fireEvent.click(saveNewBtn);

    })

    it('Should render Dealer division cancel components', () => {
        const tableData = [{ key: 1, value: 'test' }, { key: 2, value: 'test' }]
        const props = {
            formActionType: { viewMode: false, editMode: true },
            setButtonData: jest.fn(),
            formData: { status: true }
        }
        customRender(
            <Provider store={mockStore}>
                <FormWrapper isVisible={true}
                    tableData={tableData}
                    handleButtonClick={jest.fn()}
                    showAddButton={true}
                    filterString={filterString}
                    buttonData={buttonData}
                    fetchList={jest.fn()}
                    saveButtonName={"Save"}
                    {...props}
                />
            </Provider>
        )

        const plusImg = screen.getByRole('img', { name: 'plus' });
        fireEvent.click(plusImg);

        const cancelBtn = screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancelBtn);

    })

    it('Should render Dealer division close components', () => {
        const tableData = [{ key: 1, value: 'test' }, { key: 2, value: 'test' }]
        const props = {
            formActionType: { viewMode: false, editMode: true },
            setButtonData: jest.fn(),
            formData: { status: true }
        }
        customRender(
            <Provider store={mockStore}>
                <FormWrapper isVisible={true}
                    tableData={tableData}
                    handleButtonClick={jest.fn()}
                    showAddButton={true}
                    filterString={filterString}
                    buttonData={buttonData}
                    fetchList={jest.fn()}
                    saveButtonName={"Save"}
                    {...props}
                />
            </Provider>
        )

        const plusImg = screen.getByRole('img', { name: 'plus' });
        fireEvent.click(plusImg);

        const closeBtn = screen.getByRole('button', { name: 'Close' });
        fireEvent.click(closeBtn);
    })
});