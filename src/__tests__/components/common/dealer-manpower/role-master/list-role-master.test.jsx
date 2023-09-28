/* eslint-disable no-unused-vars */
import '@testing-library/jest-dom/extend-expect';
import { ListRoleMaster } from '@components/common/DealerManpower/RoleMaster/ListRoleMaster';
import customRender from '@utils/test-utils';
import { screen, fireEvent, waitFor } from '@testing-library/react';
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

const buttonData = {
    closeBtn: false,
    cancelBtn: true,
    saveBtn: true,
    saveAndNewBtn: true,
    editBtn: false,
    formBtnActive: false,
};

jest.mock('store/actions/data/dealerManpower/roleMaster', () => ({
    roleMasterDataActions: {},
}));

describe('Role Master components', () => {
    it('Should render Role Master Applied Advance Filter components', () => {
        const props = {
            formActionType: { viewMode: false, editMode: false },
        }

        const roleData = [
            {
                departmentCode
                    : "DC98",
                departmentName
                    : "Employee",
                divisionCode
                    : "C",
                divisionName
                    : "COMMON",
                roleCode
                    : "RL0011",
                roleDescription
                    : "dealer roless",
                status
                    : true
            }
        ]

        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                DealerManpower: {
                    RoleMaster: { isLoaded: false, isLoading: false, data: roleData },
                },
            },
        });

        const fetchList = jest.fn()
        const fetchDivisionLovList = jest.fn()
        const fetchDepartmentLovList = jest.fn()

        customRender(
            <Provider store={mockStore}>
                <ListRoleMaster isVisible={true}
                    {...props}
                    fetchList={fetchList}
                    fetchDivisionLovList={fetchDivisionLovList}
                    fetchDepartmentLovList={fetchDepartmentLovList}
                />
            </Provider>
        )

        const textBox = screen.getByPlaceholderText('Search');
        fireEvent.change(textBox, { target: { value: '' } });
        fireEvent.change(textBox, { target: { value: 'hello testing for search' } });

        const comboBox = screen.getByRole('combobox', { name: "" });
        fireEvent.change(comboBox, { target: { value: 'hello testing for search1' } });

        const searchImg = screen.getByRole('button', { name: 'search' });
        fireEvent.click(searchImg);

        const clearBtn = screen.getByRole('button', { name: 'Clear', exact: false });
        fireEvent.click(clearBtn);
    })

    it('filter button should work', async () => {
        const props = {
            formActionType: { viewMode: false, editMode: false },
        }

        const roleData = [
            {
                departmentCode
                    : "DC98",
                departmentName
                    : "kai",
                divisionCode
                    : "C",
                divisionName
                    : "COMMON",
                roleCode
                    : "RL0011",
                roleDescription
                    : "dealer roless",
                status
                    : true
            }
        ]

        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                DealerManpower: {
                    RoleMaster: { isLoaded: false, data: roleData },
                    DealerDivisionMaster: { divisionData: [{ code: "234567", name: "sdfghjkwertyu", status: true }] },
                    DealerEmployeeDepartmentMaster: { filteredDepartmentData: [] },
                },
            },
        });

        const fetchList = jest.fn();
        const fetchDivisionLovList = jest.fn()
        const fetchDepartmentLovList = jest.fn()

        customRender(
            <Provider store={mockStore}>
                <ListRoleMaster isVisible={true}
                    {...props}
                    fetchList={fetchList}
                    fetchDivisionLovList={fetchDivisionLovList}
                    fetchDepartmentLovList={fetchDepartmentLovList}
                />
            </Provider>
        )

        const clearBtn = screen.getByRole('button', { name: 'Advanced Filters', exact: false });
        fireEvent.click(clearBtn);

        const divisionName = screen.getByRole('combobox', { name: "Division Name" });
        fireEvent.change(divisionName, { target: { value: 'hello testing for search1' } });

        const departmentName = screen.getByRole('combobox', { name: "Department Name" });
        fireEvent.change(departmentName, { target: { value: 'hello testing for search1' } });

        const comboBox = screen.getAllByRole('textbox', { name: "Role Name" });
        fireEvent.change(comboBox[0], { target: { value: 'hello testing for search1' } });
        fireEvent.change(comboBox[1], { target: { value: 'hello testing for search1' } });

        const searchBtn = screen.getByTestId("search")
        fireEvent.click(searchBtn)

    });

    it('refresh button should work', async () => {
        const props = {
            formActionType: { viewMode: false, editMode: false },
        }

        const roleData = [
            {
                departmentCode
                    : "DC98",
                departmentName
                    : "kai",
                divisionCode
                    : "C",
                divisionName
                    : "COMMON",
                roleCode
                    : "RL0011",
                roleDescription
                    : "kai test",
                status
                    : true
            }
        ]

        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                DealerManpower: {
                    RoleMaster: { isLoaded: false, isLoading: false, data: roleData },
                },
            },
        });

        const fetchList = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <ListRoleMaster isVisible={true}
                    {...props}
                    fetchList={fetchList}
                />
            </Provider>
        )
        await waitFor(() => { expect(screen.getByText('kai')).toBeInTheDocument() });
        const refreshbutton = screen.getByRole('button', { name: '', exact: false });
        fireEvent.click(refreshbutton);
        fetchList.mock.calls[0][0].onSuccessAction();
    });


    it('test for onSuccess', async () => {
        const roleData = [
            {
                departmentCode
                    : "DC98",
                departmentName
                    : "kai",
                divisionCode
                    : "C",
                divisionName
                    : "COMMON",
                roleCode
                    : "RL0011",
                roleDescription
                    : "dealer roless",
                status
                    : true
            }
        ]

        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                DealerManpower: {
                    RoleMaster: { isLoaded: false, isLoading: false, data: roleData },
                },
            },
        });

        const saveData = jest.fn();

        const res = {
            data: roleData
        };

        customRender(
            <Provider store={mockStore}>
                <ListRoleMaster saveData={saveData} setIsFormVisible={jest.fn()} handleButtonClick={jest.fn()} fetchList={jest.fn()} resetData={jest.fn()} buttonData={buttonData} setButtonData={jest.fn()} />
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


    it('Should render add edit close button', () => {
        const props = {
            formActionType: { viewMode: false, editMode: false },
        }

        const roleData = [
            {
                departmentCode
                    : "DC98",
                departmentName
                    : "kai",
                divisionCode
                    : "C",
                divisionName
                    : "COMMON",
                roleCode
                    : "RL0011",
                roleDescription
                    : "dealer roless",
                status
                    : true
            }
        ]

        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                DealerManpower: {
                    RoleMaster: { isLoaded: false, data: roleData },
                    DealerDivisionMaster: { divisionData: [{ code: "234567", name: "sdfghjkwertyu", status: true }] },
                    DealerEmployeeDepartmentMaster: { filteredDepartmentData: [] },
                },
            },
        });

        const fetchList = jest.fn();
        const fetchDivisionLovList = jest.fn()
        const fetchDepartmentLovList = jest.fn()

        customRender(
            <Provider store={mockStore}>
                <ListRoleMaster isVisible={true}
                    {...props}
                    fetchList={fetchList}
                    fetchDivisionLovList={fetchDivisionLovList}
                    fetchDepartmentLovList={fetchDepartmentLovList}
                />
            </Provider>
        )

        const addBtn = screen.getByRole('button', { name: 'plus Add', exact: false });
        fireEvent.click(addBtn);

        const closeBtn = screen.getByRole('button', { name: 'Close', exact: false });
        fireEvent.click(closeBtn);
    })


    it('Should render add edit cancel button', () => {
        const props = {
            formActionType: { viewMode: false, editMode: false },
        }

        const roleData = [
            {
                departmentCode
                    : "DC98",
                departmentName
                    : "kai",
                divisionCode
                    : "C",
                divisionName
                    : "COMMON",
                roleCode
                    : "RL0011",
                roleDescription
                    : "dealer roless",
                status
                    : true
            }
        ]

        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                DealerManpower: {
                    RoleMaster: { isLoaded: false, data: roleData },
                    DealerDivisionMaster: { divisionData: [{ code: "234567", name: "sdfghjkwertyu", status: true }] },
                    DealerEmployeeDepartmentMaster: { filteredDepartmentData: [] },
                },
            },
        });

        const fetchList = jest.fn();
        const fetchDivisionLovList = jest.fn()
        const fetchDepartmentLovList = jest.fn()

        customRender(
            <Provider store={mockStore}>
                <ListRoleMaster isVisible={true}
                    {...props}
                    fetchList={fetchList}
                    fetchDivisionLovList={fetchDivisionLovList}
                    fetchDepartmentLovList={fetchDepartmentLovList}
                />
            </Provider>
        )

        const addBtn = screen.getByRole('button', { name: 'plus Add', exact: false });
        fireEvent.click(addBtn);

        const closeBtn = screen.getByRole('button', { name: 'Cancel', exact: false });
        fireEvent.click(closeBtn);
    })

    it('Should render add edit form save button', () => {
        const props = {
            formActionType: { viewMode: false, editMode: false },
        }

        const roleData = [
            {
                departmentCode
                    : "DC98",
                departmentName
                    : "kai",
                divisionCode
                    : "C",
                divisionName
                    : "COMMON",
                roleCode
                    : "RL0011",
                roleDescription
                    : "dealer roless",
                status
                    : true
            }
        ]

        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                DealerManpower: {
                    RoleMaster: { isLoaded: false, data: roleData },
                    DealerDivisionMaster: { divisionData: [{ code: "234567", name: "sdfghjkwertyu", status: true }] },
                    DealerEmployeeDepartmentMaster: { filteredDepartmentData: [] },
                },
            },
        });

        const fetchList = jest.fn();
        const fetchDivisionLovList = jest.fn()
        const fetchDepartmentLovList = jest.fn()

        customRender(
            <Provider store={mockStore}>
                <ListRoleMaster isVisible={true}
                    {...props}
                    fetchList={fetchList}
                    fetchDivisionLovList={fetchDivisionLovList}
                    fetchDepartmentLovList={fetchDepartmentLovList}
                    setIsFormVisible={jest.fn()}
                    handleButtonClick={jest.fn()}
                    resetData={jest.fn()} buttonData={buttonData}
                    setButtonData={jest.fn()}
                />
            </Provider>
        )

        const addBtn = screen.getByRole('button', { name: 'plus Add', exact: false });
        fireEvent.click(addBtn);

        const departmentName = screen.getByRole('combobox', { name: "Department Name" });
        fireEvent.change(departmentName, { target: { value: 'hello testing for search1' } });

        const saveBtn = screen.getByRole('button', { name: 'Save', exact: false });
        fireEvent.click(saveBtn);

        const saveAddNewBtn = screen.getByRole('button', { name: 'Save & Add New', exact: false });
        fireEvent.click(saveAddNewBtn);
    })

    it('Should render filter button', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                DealerManpower: {
                    DealerDivisionMaster: { filteredDepartmentData: [{ departmentCode: "testing", divisionCode: "sdfghjkwertyu", keyword: "extraParams" }] },
                    DealerEmployeeDepartmentMaster: { filteredDepartmentData:  [{ departmentCode: "testing", divisionCode: "sdfghjkwertyu", keyword: "extraParams" }] },
                },
            },
        });

        const fetchList = jest.fn();
        const fetchDivisionLovList = jest.fn()
        const fetchDepartmentLovList = jest.fn()
        const filterString = { departmentCode: "testing", divisionCode: "sdfghjkwertyu", keyword: true, advanceFilter: true }
        const extraParams = [
            {
                key: 'divisionCode',
                title: 'Division Name',
                value: "test",
                name: "test",
                canRemove: true,
            }
           
        ];

        const setFilterString = jest.fn()
        customRender(
            <Provider store={mockStore}>
                <ListRoleMaster isVisible={true} 
                 fetchList={fetchList}
                 fetchDivisionLovList={fetchDivisionLovList}
                 fetchDepartmentLovList={fetchDepartmentLovList}
                 data={"test"}
                 userId={"test"}
                 setFilterString={setFilterString}
                 filterString={filterString}
                 extraParams={extraParams}
                />
            </Provider>
        )

        const roleName = screen.getByRole('textbox', { name: 'Role Name'})
        fireEvent.change(roleName, { target: { value: 'testing' } })

        const searchImg = screen.getByRole('img', { name: 'search' });
        fireEvent.click(searchImg);

        const removeFilter = screen.getByTestId('removeFilter');
        fireEvent.click(removeFilter);     
    })


    it('Should render filter clear button', () => {
        const roleData = [
            {
                departmentCode
                    : "DC98",
                departmentName
                    : "kai",
                divisionCode
                    : "C",
                divisionName
                    : "COMMON",
                roleCode
                    : "RL0011",
                roleDescription
                    : "dealer roless",
                status
                    : true
            }
        ]
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                DealerManpower: {
                    RoleMaster: { isLoaded: false, data: roleData },
                    DealerDivisionMaster: { filteredDepartmentData: [{ departmentCode: "testing", divisionCode: "sdfghjkwertyu", keyword: "extraParams" }] },
                    DealerEmployeeDepartmentMaster: { filteredDepartmentData:  [{ departmentCode: "testing", divisionCode: "sdfghjkwertyu", keyword: "extraParams" }] },
                },
            },
        });

        const fetchList = jest.fn();
        const fetchDivisionLovList = jest.fn()
        const fetchDepartmentLovList = jest.fn()
        const filterString = { departmentCode: "testing", divisionCode: "sdfghjkwertyu", keyword: true, advanceFilter: true }
        const extraParams = [
            {
                key: 'divisionCode',
                title: 'Division Name',
                value: "test",
                name: "test",
                canRemove: true,
            }
           
        ];

        const setFilterString = jest.fn()
        customRender(
            <Provider store={mockStore}>
                <ListRoleMaster isVisible={true} 
                 fetchList={fetchList}
                 fetchDivisionLovList={fetchDivisionLovList}
                 fetchDepartmentLovList={fetchDepartmentLovList}
                 data={"test"}
                 userId={"test"}
                 setFilterString={setFilterString}
                 filterString={filterString}
                 extraParams={extraParams}
                />
            </Provider>
        )

        const roleName = screen.getByRole('textbox', { name: 'Role Name'})
        fireEvent.change(roleName, { target: { value: 'testing' } })

        const searchImg = screen.getByRole('img', { name: 'search' });
        fireEvent.click(searchImg);      

        const clearBtn = screen.getByRole('button', { name: 'Clear' });
        fireEvent.click(clearBtn);        
    })


});