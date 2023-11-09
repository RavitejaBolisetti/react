/* eslint-disable no-unused-vars */
import '@testing-library/jest-dom/extend-expect';
import { AdvancedSearch } from '@components/common/DealerManpower/RoleMaster/AdvancedSearch';
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
    const [advanceFilterForm] = Form.useForm();
    const myFormMock = {
        ...advanceFilterForm,
        setFieldsValue: jest.fn(),
        validateFields: jest.fn().mockResolvedValue([{ name: 'Kai' }]),
        resetFields: jest.fn(),
        getFieldsValue: jest.fn().mockResolvedValue([{ name: 'Kai' }]),
    };
    return <AdvancedSearch advanceFilterForm={myFormMock} {...props} />;
};

describe('List Employee Department Master components', () => {
    it('Should render Applied Advance Filter click search button components', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                DealerManpower: {
                    RoleMaster: {
                        isLoaded: true,
                        filteredListData: [
                            {
                                departmentCode: 'DC98',
                                departmentName: 'kai',
                                divisionCode: 'C',
                                divisionName: 'COMMON',
                                roleCode: 'RL0011',
                                roleDescription: 'dealer roless',
                                status: true,
                            },
                        ],
                    },
                },
            },
        });

        const divisionData = [
            { key: 1, value: 'test' },
            { key: 2, value: 'test1' },
        ];
        const filteredDepartmentData = [
            { key: 1, value: 'test' },
            { key: 2, value: 'test1' },
        ];
        const filterString = { divisionCode: 'test', keyword: 'test' };

        customRender(
            <Provider store={mockStore}>
                <FormWrapper isVisible={true} divisionData={divisionData} filteredDepartmentData={filteredDepartmentData} onFinish={jest.fn()} setFilterString={jest.fn()} setAdvanceSearchVisible={jest.fn()} filterString={filterString} handleFilterChange={jest.fn()} />
            </Provider>
        );

        const divisionName = screen.getByRole('combobox', { name: 'Division Name' });
        fireEvent.change(divisionName, { target: { value: 'testing' } });

        const textBox = screen.getByRole('combobox', { name: 'Department Name' });
        fireEvent.change(textBox, { target: { value: 'kai' } });

        const searchBtn = screen.getByTestId('search');
        fireEvent.click(searchBtn);
    });

    it('Should render Applied Advance Filter click Finish Failed button components', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                DealerManpower: {
                    DealerEmployeeDepartmentMaster: {
                        isLoaded: true,
                        filteredListData: [
                            {
                                departmentCode: 'DC98',
                                departmentName: 'kai',
                                divisionCode: 'C',
                                divisionName: 'COMMON',
                                roleCode: 'RL0011',
                                roleDescription: 'dealer roless',
                                status: true,
                            },
                        ],
                    },
                },
            },
        });

        customRender(
            <Provider store={mockStore}>
                <FormWrapper isVisible={true} handleFilterChange={jest.fn()} />
            </Provider>
        );

        const searchBtn = screen.getByTestId('search');
        fireEvent.click(searchBtn);
    });

    it('Should render Applied Advance Filter click reset button components', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                DealerManpower: {
                    DealerEmployeeDepartmentMaster: {
                        isLoaded: true,
                        filteredListData: [
                            {
                                departmentCode: 'DC98',
                                departmentName: 'kai',
                                divisionCode: 'C',
                                divisionName: 'COMMON',
                                roleCode: 'RL0011',
                                roleDescription: 'dealer roless',
                                status: true,
                            },
                        ],
                    },
                },
            },
        });

        customRender(
            <Provider store={mockStore}>
                <FormWrapper isVisible={true} handleFilterChange={jest.fn()} />
            </Provider>
        );

        const resetBtn = screen.getByRole('button', { name: 'Reset' });
        fireEvent.click(resetBtn);
    });

    it('Should render Applied Advance Filter click close button components', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                DealerManpower: {
                    DealerEmployeeDepartmentMaster: {
                        isLoaded: true,
                        data: [
                            {
                                departmentCode: 'DC98',
                                departmentName: 'kai',
                                divisionCode: 'C',
                                divisionName: 'COMMON',
                                roleCode: 'RL0011',
                                roleDescription: 'dealer roless',
                                status: true,
                            },
                        ],
                    },
                },
            },
        });

        customRender(
            <Provider store={mockStore}>
                <FormWrapper isVisible={true} handleFilterChange={jest.fn()} />
            </Provider>
        );

        const closeBtn = screen.getByRole('button', { name: 'Close' });
        fireEvent.click(closeBtn);
    });
});
