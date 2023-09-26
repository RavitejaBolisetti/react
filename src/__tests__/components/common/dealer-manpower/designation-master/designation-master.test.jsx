/* eslint-disable no-unused-vars */
import '@testing-library/jest-dom/extend-expect';
import { DesignationMaster } from '@components/common/DealerManpower/DesignationMaster/DesignationMaster';
import customRender from '@utils/test-utils';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { rootReducer } from 'store/reducers';

jest.mock('store/actions/data/dealerManpower/dealerDivisionMaster', () => ({
    dealerManpowerDivisionMasterDataActions: {},
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

const data = [{
    departmentCode: null,
    departmentName: null,
    designationCode: "DS0029",
    designationDescription: "My Designation 2",
    designationType: "SM",
    divisionCode: "C",
    divisionName: "COMMON",
    isAccountsDataIndicatorRequired: true,
    isCapabilityIndicatorRequired: true,
    isCreateUserIdRequired: true,
    isManpowerIndicatorRequired: true,
    mileSkillId: null,
    roleCode: null,
    roleDescription: null,
    status: true
}]

describe('Designation Master components', () => {
    it('Should render Designation Master search and clear components', () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                DealerManpower: {
                    DesignationMaster: {
                        isLoaded: true, data: data
                    }
                },
            },
        });

        const fetchList = jest.fn();
        const fetchDivisionLovList = jest.fn()

        customRender(
            <Provider store={mockStore}>
                <DesignationMaster
                    isVisible={true}
                    fetchList={fetchList}
                    setIsLoading={jest.fn()}
                    fetchDivisionLovList={fetchDivisionLovList}
                />
            </Provider>
        )

        const textBox = screen.getByRole('textbox', { name: 'Designation Name' });
        fireEvent.change(textBox, { target: { value: 'kai' } });

        const searchBtn = screen.getByRole('button', { name: 'search' });
        fireEvent.click(searchBtn);
    })

    it('refresh button should work', async () => {

        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                DealerManpower: {
                    DesignationMaster: {
                        isLoaded: true, data: [{
                            departmentCode: null,
                            departmentName: null,
                            designationCode: "DS0029",
                            designationDescription: "My Designation 2",
                            designationType: "SM",
                            divisionCode: "C",
                            divisionName: "kai",
                            isAccountsDataIndicatorRequired: true,
                            isCapabilityIndicatorRequired: true,
                            isCreateUserIdRequired: true,
                            isManpowerIndicatorRequired: true,
                            mileSkillId: null,
                            roleCode: null,
                            roleDescription: null,
                            status: true
                        }]
                    },
                },
            },
        });

        const fetchList = jest.fn()
        const fetchDivisionLovList = jest.fn()
        customRender(
            <Provider store={mockStore}>
                <DesignationMaster
                    isVisible={true}
                    fetchList={jest.fn()}
                    setIsLoading={jest.fn()}
                    fetchDivisionLovList={fetchDivisionLovList} />
            </Provider>
        );

        await waitFor(() => { expect(screen.getByText('kai')).toBeInTheDocument() });
        const refreshbutton = screen.getByRole('button', { name: '', exact: false });
        fireEvent.click(refreshbutton);
    })

    it('Should render Designation Master Applied Advance Filter search button components', () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                DealerManpower: {
                    DesignationMaster: {
                        isLoaded: true, data: data
                    }
                },
            },
        });
        const fetchList = jest.fn()
        const fetchDivisionLovList = jest.fn()

        customRender(
            <Provider store={mockStore}>
                <DesignationMaster isVisible={true}
                    fetchList={fetchList}
                    setIsLoading={jest.fn()}
                    fetchDivisionLovList={fetchDivisionLovList} />
            </Provider>
        )

        const advancedFilter = screen.getByRole('button', { name: 'Advanced Filters' });
        fireEvent.click(advancedFilter);

        const departmentName = screen.getByRole('combobox', { name: 'Department Name' });
        fireEvent.change(departmentName, { target: { value: 'kai' } });

        const roleName = screen.getByRole('combobox', { name: 'Role Name' });
        fireEvent.change(roleName, { target: { value: 'kai' } });

        const searchBtn = screen.getByRole('button', { name: 'Search' });
        fireEvent.click(searchBtn);

    })

    it('Should render Designation Master Applied Advance Filter reset button components', () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                DealerManpower: {
                    DesignationMaster: {
                        isLoaded: true, data: data
                    },
                },
            },
        });
        const fetchList = jest.fn()
        const fetchDivisionLovList = jest.fn()

        customRender(
            <Provider store={mockStore}>
                <DesignationMaster isVisible={true} fetchList={fetchList} setIsLoading={jest.fn()} fetchDivisionLovList={fetchDivisionLovList} />
            </Provider>
        )

        const advancedFilter = screen.getByRole('button', { name: 'Advanced Filters' });
        fireEvent.click(advancedFilter);

        const resetBtn = screen.getByRole('button', { name: 'Reset' });
        fireEvent.click(resetBtn);
    })

    it('Should render Designation Master Applied Advance Filter close button components', () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                DealerManpower: {
                    DesignationMaster: {
                        isLoaded: true, data: data
                    },
                },
            },
        });

        const fetchList = jest.fn()
        const fetchDivisionLovList = jest.fn()

        customRender(
            <Provider store={mockStore}>
                <DesignationMaster isVisible={true} fetchList={fetchList} setIsLoading={jest.fn()} fetchDivisionLovList={fetchDivisionLovList} />
            </Provider>
        )

        const advancedFilter = screen.getByRole('button', { name: 'Advanced Filters' });
        fireEvent.click(advancedFilter);

        const closeBtn = screen.getByRole('button', { name: 'Close' });
        fireEvent.click(closeBtn);
    })

    it('test for onSuccess', async () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                DealerManpower: {
                    DesignationMaster: {
                        isLoaded: true, data: data
                    },
                },
            },
        });

        const saveData = jest.fn();

        const res = {
            data: [{
                departmentCode: null,
                departmentName: null,
                designationCode: "DS0029",
                designationDescription: "My Designation 2",
                designationType: "SM",
                divisionCode: "C",
                divisionName: "COMMON",
                isAccountsDataIndicatorRequired: true,
                isCapabilityIndicatorRequired: true,
                isCreateUserIdRequired: true,
                isManpowerIndicatorRequired: true,
                mileSkillId: null,
                roleCode: null,
                roleDescription: null,
                status: true
            }]
        };

        const fetchList = jest.fn()
        const fetchDivisionLovList = jest.fn()
        customRender(
            <Provider store={mockStore}>
                <DesignationMaster saveData={saveData} setIsLoading={jest.fn()} fetchDivisionLovList={fetchDivisionLovList} setIsFormVisible={jest.fn()} handleButtonClick={jest.fn()} fetchList={fetchList} resetData={jest.fn()} buttonData={buttonData} setButtonData={jest.fn()} />
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

    it('Should render Designation Master add edit form components', () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                DealerManpower: {
                    DesignationMaster: {
                        isLoaded: true, data: data
                    },
                },
            },
        });

        const fetchList = jest.fn()
        const fetchDivisionLovList = jest.fn()
        customRender(
            <Provider store={mockStore}>
                <DesignationMaster isVisible={true} setIsLoading={jest.fn()} fetchDivisionLovList={fetchDivisionLovList} setIsFormVisible={jest.fn()} handleButtonClick={jest.fn()} fetchList={fetchList} resetData={jest.fn()} buttonData={buttonData} setButtonData={jest.fn()} />
            </Provider>
        )

        const plusImg = screen.getByRole('img', { name: 'plus' });
        fireEvent.click(plusImg);

        const divisionName = screen.getByRole('combobox', { name: 'Division Name' });
        fireEvent.click(divisionName);

        const departmentName = screen.getByRole('combobox', { name: 'Department Name' });
        fireEvent.click(departmentName);

        const roleDesc = screen.getByRole('combobox', { name: 'Role Description' });
        fireEvent.click(roleDesc);

        const designationType = screen.getByRole('combobox', { name: 'Designation Type' });
        fireEvent.click(designationType);

        const mileSkill = screen.getByRole('combobox', { name: 'Mile Skill' });
        fireEvent.click(mileSkill);

        const status = screen.getByRole('switch', { name: 'Status' });
        fireEvent.click(status);

        const manpower = screen.getByRole('checkbox', { name: 'Manpower Required' });
        fireEvent.click(manpower);

        const accountData = screen.getByRole('checkbox', { name: 'Accounts Data' });
        fireEvent.click(accountData);

        const capability = screen.getByRole('checkbox', { name: 'Capability (L1/L2/L3)' });
        fireEvent.click(capability);

        const userId = screen.getByRole('checkbox', { name: 'Create User Id' });
        fireEvent.click(userId);
    })

    it('Should render Designation Master add edit form close components', () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                DealerManpower: {
                    DesignationMaster: {
                        isLoaded: true, data: data
                    },
                },
            },
        });

        const fetchList = jest.fn()
        const fetchDivisionLovList = jest.fn()
        customRender(
            <Provider store={mockStore}>
                <DesignationMaster isVisible={true} setIsLoading={jest.fn()} fetchDivisionLovList={fetchDivisionLovList} setIsFormVisible={jest.fn()} handleButtonClick={jest.fn()} fetchList={fetchList} resetData={jest.fn()} buttonData={buttonData} setButtonData={jest.fn()} />
            </Provider>
        )

        const plusImg = screen.getByRole('img', { name: 'plus' });
        fireEvent.click(plusImg);

        const closeBtn = screen.getByRole('button', { name: 'Close', exact: false });
        fireEvent.click(closeBtn);
    })

    it('Should render Designation Master add edit form cancel components', () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                DealerManpower: {
                    DesignationMaster: {
                        isLoaded: true, data: data
                    },
                },
            },
        });

        const fetchList = jest.fn()
        const fetchDivisionLovList = jest.fn()
        customRender(
            <Provider store={mockStore}>
                <DesignationMaster isVisible={true} setIsLoading={jest.fn()} fetchDivisionLovList={fetchDivisionLovList} setIsFormVisible={jest.fn()} handleButtonClick={jest.fn()} fetchList={fetchList} resetData={jest.fn()} buttonData={buttonData} setButtonData={jest.fn()} />
            </Provider>
        )

        const plusImg = screen.getByRole('img', { name: 'plus' });
        fireEvent.click(plusImg);

        const cancelBtn = screen.getByRole('button', { name: 'Cancel', exact: false });
        fireEvent.click(cancelBtn);
    })
});