/* eslint-disable no-unused-vars */
import '@testing-library/jest-dom/extend-expect';
import { ListEmployeeDepartmentMaster } from '@components/common/DealerManpower/DealerEmployeeDepartmentMaster/ListEmployeeDepartmentMaster';
import customRender from '@utils/test-utils';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { Form } from 'antd';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { rootReducer } from 'store/reducers';


jest.mock('store/actions/data/dealerManpower/dealerEmployeeDepartmentMaster', () => ({
    dealerManpowerEmployeeDepartmentDataActions: {},
}));



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


const buttonData = {
    closeBtn: false,
    cancelBtn: true,
    saveBtn: true,
    saveAndNewBtn: true,
    editBtn: false,
    formBtnActive: false,
};

describe('List Employee Department Master components', () => {

    it('Should render search components', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                DealerManpower: {
                    DealerEmployeeDepartmentMaster: {
                        isLoaded: true, data: [{
                            departmentCode: "DC98",
                            departmentName: "Employee",
                            divisionCode: "C",
                            divisionName: "COMMON",
                            status: true
                        }]
                    },
                },
            },
        });

        customRender(
            <Provider store={mockStore}>
                <ListEmployeeDepartmentMaster
                    isVisible={true}
                    fetchList={jest.fn()}
                    fetchDivisionLovList={jest.fn()}
                />
            </Provider>
        )

        const departmentName = screen.getByRole('textbox', { name: 'Department Name' })
        fireEvent.change(departmentName, { target: { value: "testing" } })

        const searchImg = screen.getByRole('img', { name: 'search' });
        fireEvent.click(searchImg);
    })

    it('refresh button should work', async () => {

        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                DealerManpower: {
                    DealerEmployeeDepartmentMaster: {
                        isLoaded: true, data: [{
                            departmentCode: "DC98",
                            departmentName: "Employee",
                            divisionCode: "C",
                            divisionName: "COMMON",
                            status: true
                        }]
                    },
                },
            },
        });

        customRender(
            <Provider store={mockStore}>
                <ListEmployeeDepartmentMaster fetchList={jest.fn()} fetchDivisionLovList={jest.fn()} />
            </Provider>
        );

        const refreshbutton = screen.getByRole('button', { name: '', exact: false });
        fireEvent.click(refreshbutton);
    })

    it('Should render Employee Department Master add edit form components', () => {
        const formActionType = { viewMode: false, editMode: false }
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                DealerManpower: {
                    DealerEmployeeDepartmentMaster: {
                        isLoaded: true, data: [{
                            departmentCode: "DC98",
                            departmentName: "Employee",
                            divisionCode: "C",
                            divisionName: "COMMON",
                            status: true
                        }]
                    },
                },
            },
        });

        customRender(
            <Provider store={mockStore}>
                <ListEmployeeDepartmentMaster fetchList={jest.fn()} fetchDivisionLovList={jest.fn()} />
            </Provider>
        )

        const plusAddBtn = screen.getByRole('button', { name: 'plus Add', exact: false });
        fireEvent.click(plusAddBtn);

        const divisionName = screen.getByRole('combobox', { name: 'Division Name', exact: false });
        fireEvent.change(divisionName, { target: { value: 'kai' } });

        const departmentCode = screen.getByRole('textbox', { name: 'Department Code', exact: false });
        fireEvent.change(departmentCode, { target: { value: 'kai' } });

        const status = screen.getByRole('switch', { name: 'Status', exact: false });
        fireEvent.change(status);

        const saveBtn = screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn);

        const saveNewBtn = screen.getByRole('button', { name: 'Save & Add New' });
        fireEvent.click(saveNewBtn);
    })

    it('Should render Employee Department Master add edit form close components', () => {
        const formActionType = { viewMode: false, editMode: false }
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                DealerManpower: {
                    DealerEmployeeDepartmentMaster: {
                        isLoaded: true, data: [{
                            departmentCode: "DC98",
                            departmentName: "Employee",
                            divisionCode: "C",
                            divisionName: "COMMON",
                            status: true
                        }]
                    },
                },
            },
        });

        const saveData = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <ListEmployeeDepartmentMaster saveData={saveData} setIsFormVisible={jest.fn()} handleButtonClick={jest.fn()} fetchList={jest.fn()} resetData={jest.fn()} buttonData={buttonData} setButtonData={jest.fn()} />
            </Provider>
        )

        const plusAddBtn = screen.getByRole('button', { name: 'plus Add', exact: false });
        fireEvent.click(plusAddBtn);

        const closeBtn = screen.getByRole('button', { name: 'Close', exact: false });
        fireEvent.click(closeBtn);


    })

    it('Should render Employee Department Master add edit form cancel components', () => {
        const formActionType = { viewMode: false, editMode: false }
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                DealerManpower: {
                    DealerEmployeeDepartmentMaster: {
                        isLoaded: true, data: [{
                            departmentCode: "DC98",
                            departmentName: "Employee",
                            divisionCode: "C",
                            divisionName: "COMMON",
                            status: true
                        }]
                    },
                },
            },
        });

        const saveData = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <ListEmployeeDepartmentMaster saveData={saveData} setIsFormVisible={jest.fn()} handleButtonClick={jest.fn()} fetchList={jest.fn()} resetData={jest.fn()} buttonData={buttonData} setButtonData={jest.fn()} />
            </Provider>
        )

        const plusAddBtn = screen.getByRole('button', { name: 'plus Add', exact: false });
        fireEvent.click(plusAddBtn);

        const cancelBtn = screen.getByRole('button', { name: 'Cancel', exact: false });
        fireEvent.click(cancelBtn);
    })


    it('test for onSuccess', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                DealerManpower: {
                    DealerEmployeeDepartmentMaster: {
                        isLoaded: true, data: [{
                            departmentCode: "DC98",
                            departmentName: "Employee",
                            divisionCode: "C",
                            divisionName: "COMMON",
                            status: true
                        }]
                    }
                },
            },
        });

        const saveData = jest.fn();

        const res = {
            data: [{
                departmentCode: "DC98",
                departmentName: "Employee",
                divisionCode: "C",
                divisionName: "COMMON",
                status: true
            }]
        };

        customRender(
            <Provider store={mockStore}>
                <ListEmployeeDepartmentMaster saveData={saveData} setIsFormVisible={jest.fn()} handleButtonClick={jest.fn()} fetchList={jest.fn()} resetData={jest.fn()} buttonData={buttonData} setButtonData={jest.fn()} />
            </Provider>
        );
        const editBtn = screen.getByRole('button', { name: /fa-edit/i });
        fireEvent.click(editBtn);

        const status = screen.getByRole('switch', { name: 'Status' });
        fireEvent.click(status);

        const saveBtn = screen.getByRole('button', { name: /Save/i });
        fireEvent.click(saveBtn);

        await waitFor(() => expect(saveData).toHaveBeenCalled());
        saveData.mock.calls[0][0].onSuccess(res);
        saveData.mock.calls[0][0].onError();
    });

});