import '@testing-library/jest-dom/extend-expect';
import { DealerCompany } from '@components/Mile/DealerCompany/DealerCompany';
import customRender from '@utils/test-utils';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { rootReducer } from 'store/reducers';
import { Form } from 'antd';

jest.mock('store/actions/data/dealer/dealerCompany', () => ({
    dealerCompanyDataActions: {},
}));

jest.mock('@components/Mile/DealerCompany/AddEditForm', () => {
    const AddEditForm = ({ onFinish, onCloseAction }) => (
        <div>
            <button onClick={onFinish}>Save</button>
            <button onClick={onCloseAction}>Cancel</button>
        </div>
    );
    return {
        __esModule: true,
        AddEditForm,
    };
});

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    const myFormMock = {
        ...form,
        setFieldsValue: jest.fn(),
        validateFields: jest.fn(),
    };
    return <DealerCompany form={myFormMock} {...props} />;
};

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

const data = [
    {
        id: 'ecdf3aa4-946d-4426-8a01-05284c1e47ed',
        parentId: null,
        companyCode: 'TIN01',
        companyName: 'TINSUKIA AUTOMOBILES LLP',
        dealerParentName: 'KAI',
        parentCode: 'TIN01',
        address: null,
        pinCode: null,

        companyTan: null,

        companyTin: null,

        parentGroupCode: 'TIN01',

        companyPan: null,

        cityCode: null,

        cityName: null,

        stateCode: null,

        stateName: null,

        tehsilCode: null,

        tehsilName: null,

        districtCode: null,

        districtName: null,

        status: true,
    },
];

describe('Dealer company components', () => {
    it('Should render dealer company search components', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },

            data: {
                DealerHierarchy: {
                    DealerCompany: {
                        isLoaded: true,
                        data: data,
                    },
                },
            },
        });

        const fetchList = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <DealerCompany fetchList={fetchList} />
            </Provider>
        );

        const searchInput = screen.getByPlaceholderText('Search');

        fireEvent.change(searchInput, { target: { value: 'testing for search' } });

        const searchImg = screen.getByRole('button', { name: 'search' });

        fireEvent.click(searchImg);
    });

    it('Should render dealer company api calling', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },

            data: {
                DealerHierarchy: {
                    DealerCompany: {
                        isLoaded: false,
                        data: data,
                    },
                },
            },
        });

        const fetchList = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <DealerCompany fetchList={fetchList} />
            </Provider>
        );

        // fetchList.mock.calls[0][0].onCloseAction();
        fetchList.mock.calls[0][0].onErrorAction();
    });

    it('Should render dealer company refresh button should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },

            data: {
                DealerHierarchy: {
                    DealerCompany: {
                        isLoaded: true,
                        data: data,
                    },
                },
            },
        });

        const fetchList = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <DealerCompany fetchList={fetchList} />
            </Provider>
        );

        await waitFor(() => {
            expect(screen.getByText('KAI')).toBeInTheDocument();
        });

        const refreshbutton = screen.getByRole('button', { name: '', exact: false });

        fireEvent.click(refreshbutton); 

        fetchList.mock.calls[0][0].onSuccessAction();
    });

    it('Should render dealer company click components', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },

            data: {
                DealerHierarchy: {
                    DealerCompany: {
                        isLoaded: true,
                        data: data,
                    },
                },
            },
        });

        const fetchList = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <DealerCompany fetchList={fetchList} />
            </Provider>
        );

        const searchInput = screen.getByPlaceholderText('Search');
        fireEvent.change(searchInput, { target: { value: 'testing for search' } });

        const searchImg = screen.getByRole('button', { name: 'search' });
        fireEvent.click(searchImg);

        const closeCircleBtn = screen.getByRole('button', { name: 'close-circle' });
        fireEvent.click(closeCircleBtn);
    });

    it('Should render dealer company for onSuccess', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },

            data: {
                DealerHierarchy: {
                    DealerCompany: {
                        isLoaded: true,
                        data: data,
                    },
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
            saveAndNewBtnClicked: true,
        };

        const saveData = jest.fn();

        const formData = {
            parentId: '1239',
        };

        customRender(
            <Provider store={mockStore}>
                <FormWrapper saveData={saveData} formData={formData} setIsFormVisible={jest.fn()} handleButtonClick={jest.fn()} fetchList={jest.fn()} resetData={jest.fn()} buttonData={buttonData} />
            </Provider>
        );

        const editBtn = screen.getAllByRole('button', { name: 'fa-edit' });
        fireEvent.click(editBtn[0]);

        const saveBtn = screen.getByRole('button', { name: /Save/i });
        fireEvent.click(saveBtn);
        await waitFor(() => {
            expect(saveData).toHaveBeenCalled();
        });

        saveData.mock.calls[0][0].onSuccess();
        saveData.mock.calls[0][0].onError();
    });

    it('Should render dealer company for close', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },

            data: {
                DealerHierarchy: {
                    DealerCompany: {
                        isLoaded: true,
                        data: data,
                    },
                },
            },
        });

        customRender(
            <Provider store={mockStore}>
                <FormWrapper setIsFormVisible={jest.fn()} handleButtonClick={jest.fn()} fetchList={jest.fn()} resetData={jest.fn()} />
            </Provider>
        );

        const editBtn = screen.getAllByRole('button', { name: 'fa-edit' });
        fireEvent.click(editBtn[0]);

        const saveBtn = screen.getAllByRole('button', { name: /Cancel/i });
        fireEvent.click(saveBtn[0]);
    });

    it('Should render dealer company for Add', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },

            data: {
                DealerHierarchy: {
                    DealerParent: {
                        isFilteredListLoaded: true,
                        filteredListData: data,
                    },
                    DealerCompany: {
                        isLoaded: true,
                        data: data,
                    },
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
            saveAndNewBtnClicked: true,
        };
        
        customRender(
            <Provider store={mockStore}>
                <FormWrapper buttonData={buttonData} saveData={jest.fn()} setIsFormVisible={jest.fn()} handleButtonClick={jest.fn()} fetchList={jest.fn()} resetData={jest.fn()} />
            </Provider>
        );

        const addBtn = screen.getByRole('img', { name: 'plus' });
        fireEvent.click(addBtn);

        const viewBtn = screen.getAllByRole('button', { name: 'ai-view' });
        fireEvent.click(viewBtn[0]);

        const saveBtn = screen.getByRole('button', { name: /Save/i });
        fireEvent.click(saveBtn);
    });
});
