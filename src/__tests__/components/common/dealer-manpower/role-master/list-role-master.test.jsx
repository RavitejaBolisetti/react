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
        fireEvent.change(textBox, { target: { value: 'hello testing for search' } });

        const searchImg = screen.getByRole('button', { name: 'search' });
        fireEvent.click(searchImg);
    })

    it('clear button should work', async () => {
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

        const textBox = screen.getByRole('combobox', { name: "" });
        fireEvent.change(textBox, { target: { value: 'hello testing for search' } });

        const searchImg = screen.getByRole('button', { name: 'search' });
        fireEvent.click(searchImg);

        const clearBtn = screen.getByRole('button', { name: 'Clear', exact: false });
        fireEvent.click(clearBtn);

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

        await waitFor(() => { expect(screen.getByText('kai test')).toBeInTheDocument() });
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

    
});