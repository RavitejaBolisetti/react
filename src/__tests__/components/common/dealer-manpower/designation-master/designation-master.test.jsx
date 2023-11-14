/* eslint-disable no-unused-vars */
import '@testing-library/jest-dom/extend-expect';
import { DesignationMaster } from '@components/common/DealerManpower/DesignationMaster/DesignationMaster';
import customRender from '@utils/test-utils';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
// eslint-disable-next-line jest/no-mocks-import
import createMockStore from '__mocks__/store';

jest.mock('store/actions/data/dealerManpower/dealerDivisionMaster', () => ({
    dealerManpowerDivisionMasterDataActions: {},
}));

jest.mock('store/actions/data/dealerManpower/designationMaster', () => ({
    dealerManpowerDesignationMasterDataActions: {},
}));

jest.mock('store/actions/data/dealerManpower/dealerEmployeeDepartmentMaster', () => ({
    dealerManpowerEmployeeDepartmentDataActions: {},
}));

jest.mock('store/actions/data/dealerManpower/roleMaster', () => ({
    roleMasterDataActions: {},
}));

jest.mock('store/actions/data/dealerManpower/mileSkill', () => ({
    MileSkillDataactions: {},
}));

jest.mock('components/common/DealerManpower/DesignationMaster/AdvancedSearch', () => {
    const AdvancedSearch = ({  onCloseAction, handleFilterChange, handleResetFilter, setFilterString }) => { 
        const onFinish = () => {
            const values={ code: 106, departmentCode: 106, roleCode: 106, keyword: 'Kai' }
            setFilterString({ ...values, advanceFilter: true });
        }
        return (
            <>
                <div><button onClick={onCloseAction}>Close</button></div>
                <div><button onClick={handleResetFilter}>Reset</button></div>
                <div><button onClick={onFinish}>Search</button></div>
                <div><button onClick={handleFilterChange('code')}>Change</button></div>
                <div><button onClick={handleFilterChange('departmentCode')}>Change 1</button></div>
            </>
        );
    }
    return {
        __esModule: true,
        AdvancedSearch,
    };
});

const props={
    fetchDivisionLovList: jest.fn(),
    fetchList: jest.fn(),
    fetchDepartmentLovList: jest.fn(),
    fetchRoleLovList: jest.fn(),
    fetchMileSkill: jest.fn()
}

describe('Designation Master components', () => {

    it('test1', async () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                DealerManpower: {
                    DesignationMaster: { isLoaded: true, data: [{ divisionCode: 106, designationCode: 106, status: 'Active', designationType: 'Hello', departmentName: 'Kai', divisionName: 'Div', designationDescription: 'Des', roleDescription: 'Role'  }] }
                },
            },
        });

        const fetchDivisionLovList=jest.fn();
        const saveData=jest.fn();

        customRender(
            <Provider store={mockStore}>
                <DesignationMaster isVisible={true} fetchDivisionLovList={fetchDivisionLovList} fetchList={jest.fn()} fetchDepartmentLovList={jest.fn()} fetchRoleLovList={jest.fn()} fetchMileSkill={jest.fn()} saveData={saveData} />
            </Provider>
        );

        fetchDivisionLovList.mock.calls[0][0].onSuccessAction();

        await waitFor(() => { expect(screen.getByText('Kai')).toBeInTheDocument() });

        const editBtn=screen.getByTestId('edit');
        fireEvent.click(editBtn);

        const status=screen.getByRole('switch', { name: 'Status' });
        fireEvent.click(status);

        const saveBtn=screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn);

        await waitFor(() => { expect(saveData).toHaveBeenCalled() });

        saveData.mock.calls[0][0].onSuccess();
        saveData.mock.calls[0][0].onError();
    });

    it('test4', async () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                DealerManpower: {
                    DesignationMaster: { isLoaded: true, data: [{ divisionCode: 106, designationCode: 106, status: 'Active', designationType: 'Hello', departmentName: 'Kai', divisionName: 'Div', designationDescription: 'Des', roleDescription: 'Role'  }] }
                },
            },
        });

        const fetchDivisionLovList=jest.fn();

        customRender(
            <Provider store={mockStore}>
                <DesignationMaster isVisible={true} fetchDivisionLovList={fetchDivisionLovList} fetchList={jest.fn()} fetchDepartmentLovList={jest.fn()} fetchRoleLovList={jest.fn()} fetchMileSkill={jest.fn()} />
            </Provider>
        );

        fetchDivisionLovList.mock.calls[0][0].onSuccessAction();

        await waitFor(() => { expect(screen.getByText('Kai')).toBeInTheDocument() });
        
        const viewBtn=screen.getByTestId('view');
        fireEvent.click(viewBtn);

        const cancelBtn=screen.getAllByRole('button', { name: 'Close' });
        fireEvent.click(cancelBtn[1]);
    });

    it('test2', async () => {

        customRender( <DesignationMaster isVisible={true} {...props} /> );

        // const advanceFilter=screen.getByText('Advance Filters');
        // fireEvent.click(advanceFilter);

        const resetBtn=screen.getByRole('button', { name: 'Reset' });
        fireEvent.click(resetBtn);

        const searchBtn=screen.getByRole('button', { name: 'Search' });
        fireEvent.click(searchBtn);

        const removeFilter=screen.getAllByTestId('removeFilter');
        fireEvent.click(removeFilter[0]);

        const changeBtn=screen.getByRole('button', { name: 'Change' });
        fireEvent.click(changeBtn);

        const change1Btn=screen.getByRole('button', { name: 'Change 1' });
        fireEvent.click(change1Btn);

        const closeBtn=screen.getByRole('button', { name: 'Close' });
        fireEvent.click(closeBtn);

    });

    it('test3', async () => {

        customRender( <DesignationMaster isVisible={true} {...props} /> );

        const searchBox=screen.getByRole('textbox', { name: 'Designation Name' });
        fireEvent.change(searchBox, { name: 'Kai Kumar' });

        const searchBtn=screen.getByRole('button', { name: 'search' });
        fireEvent.click(searchBtn);

        fireEvent.change(searchBox, { name: '' });
        fireEvent.click(searchBtn);

    });

});