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

        const res = {
            data: [
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
            ],
        };

        const formData = {
            parentId: '1239',
        };

        customRender(
            <Provider store={mockStore}>
                <FormWrapper saveData={saveData} formData={formData} setIsFormVisible={jest.fn()} handleButtonClick={jest.fn()} fetchList={jest.fn()} resetData={jest.fn()} buttonData={buttonData} setButtonData={jest.fn()} />
            </Provider>
        );

        const editBtn = screen.getAllByRole('button', { name: 'fa-edit' });

        fireEvent.click(editBtn[0]);

        const companyCode = screen.getByRole('textbox', { name: 'Company Code' });

        fireEvent.change(companyCode, { target: { value: 'test' } });

        const saveBtn = screen.getByRole('button', { name: /Save/i });

        fireEvent.click(saveBtn);
    });

    it('Should render dealer company add edit form components', async () => {
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

        const formData = {
            parentId: '1239',
        };

        const formActionType = {
            viewMode: false,

            editMode: true,
        };

        const pincodeData = [
            { id: 1, value: 'test' },
            { id: 2, value: 'test1' },
        ];

        customRender(
            <Provider store={mockStore}>
                <FormWrapper saveButtonName={'Save'} setIsFormVisible={jest.fn()} pincodeData={pincodeData} onFinishFailed={jest.fn()} onFinish={jest.fn()} isVisible={true} fetchPincodeDetail={jest.fn()} setFormActionType={jest.fn()} formActionType={formActionType} formData={formData} data={data} handleButtonClick={jest.fn()} fetchList={jest.fn()} resetData={jest.fn()} buttonData={buttonData} setButtonData={jest.fn()} />
            </Provider>
        );

        const plusImg = screen.getByRole('button', { name: 'plus Add' });

        fireEvent.click(plusImg);

        const pinCode = screen.getAllByPlaceholderText('Search');

        fireEvent.change(pinCode[0], { target: { value: '123456' } });

        fireEvent.change(pinCode[1], { target: { value: '123456' } });

        const groupCode = screen.getByRole('combobox', { name: 'Group Code' });

        fireEvent.change(groupCode, { target: { value: 'test' } });

        const groupName = screen.getByRole('textbox', { name: 'Group Name' });

        fireEvent.change(groupName, { target: { value: 'test' } });

        const companyCode = screen.getByRole('textbox', { name: 'Company Code' });

        fireEvent.change(companyCode, { target: { value: 'test' } });

        const companyAddress = screen.getByRole('textbox', { name: 'Company Address' });

        fireEvent.change(companyAddress, { target: { value: 'test' } });

        const city = screen.getByRole('textbox', { name: 'City' });

        fireEvent.change(city, { target: { value: 'test' } });

        const tehsil = screen.getByRole('textbox', { name: 'Tehsil' });

        fireEvent.change(tehsil, { target: { value: 'test' } });

        const dist = screen.getByRole('textbox', { name: 'District' });

        fireEvent.change(dist, { target: { value: 'test' } });

        const state = screen.getByRole('textbox', { name: 'State' });

        fireEvent.change(state, { target: { value: 'test' } });

        const tin = screen.getByRole('textbox', { name: 'TIN' });

        fireEvent.change(tin, { target: { value: 'test' } });

        const tan = screen.getByRole('textbox', { name: 'TAN' });

        fireEvent.change(tan, { target: { value: 'test' } });

        const pan = screen.getByRole('textbox', { name: 'PAN' });

        fireEvent.change(pan, { target: { value: 'test' } });

        const status = screen.getByRole('switch', { name: 'Status' });

        fireEvent.click(status);

        const save = screen.getByRole('button', { name: 'Save' });

        fireEvent.click(save);
    });

    it('Should render dealer company add edit form close components', async () => {
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

        customRender(
            <Provider store={mockStore}>
                <DealerCompany saveData={saveData} setIsFormVisible={jest.fn()} handleButtonClick={jest.fn()} fetchList={jest.fn()} resetData={jest.fn()} buttonData={buttonData} setButtonData={jest.fn()} />
            </Provider>
        );

        const plusImg = screen.getByRole('button', { name: 'plus Add' });

        fireEvent.click(plusImg);

        const closeBtn = screen.getByRole('button', { name: 'Close' });

        fireEvent.click(closeBtn);
    });

    it('Should render dealer company add edit form cancel components', async () => {
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

        customRender(
            <Provider store={mockStore}>
                <DealerCompany saveData={saveData} setIsFormVisible={jest.fn()} handleButtonClick={jest.fn()} fetchList={jest.fn()} resetData={jest.fn()} buttonData={buttonData} setButtonData={jest.fn()} />
            </Provider>
        );

        const plusImg = screen.getByRole('button', { name: 'plus Add' });

        fireEvent.click(plusImg);

        const cancelBtn = screen.getByRole('button', { name: 'Cancel' });

        fireEvent.click(cancelBtn);
    });
});
