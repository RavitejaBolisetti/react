import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { ManufacturerAdminstrativeHierarchy } from '@components/common/ManufacturerAdminstrativeHierarchy/ManufacturerAdminstrativeHierarchy';
import customRender from '@utils/test-utils';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';


jest.mock('@components/common/ManufacturerAdminstrativeHierarchy/AddEditForm', () => {
    const AddEditForm = ({ onFinish }) => (
        <div>
            <button onClick={onFinish}>Save</button>
        </div>
    );
    return {
        __esModule: true,
        AddEditForm,
    };
});

jest.mock('store/actions/data/manufacturerAdminHierarchy/manufacturerAdminHierarchy', () => ({
    ManufacturerAdminHierarchyDataActions: {},
}));


describe('ManufacturerAdminstrativeHierarchyMain', () => {
    it('renders without errors', () => {
        customRender(<ManufacturerAdminstrativeHierarchy />);
    });

    it('displays the organization select field', () => {
        customRender(<ManufacturerAdminstrativeHierarchy />);
        const organizationSelect = screen.getByRole("combobox", { name: '' });
        expect(organizationSelect).toBeInTheDocument();
    });

    it('displays the search input when an organization is selected', async() => {
        const manufacturerAdminHierarchyData = [{
            attributeKey: null,
            id: "19ec8958-f007-4835-be24-4bc9bd332719",
            manufactureAdminCode: "6e85eee5-4cfc-40cf-90e7-0dce9acbc2e4",
            manufactureAdminLongName: "testing",
            manufactureAdminParntId: "null",
            manufactureAdminShortName: "test",
            manufactureOrganizationId: "91398ed9-9128-4a8d-8165-9dac67e91f61",
            status: true
        }];

        const mockStore = createMockStore({
            auth: { userId: 1232 },
            data: {
                ManufacturerOrgHierarchy: { isLoaded: true, data: manufacturerAdminHierarchyData },
                ManufacturerAdmin: {
                    ManufacturerAdminHierarchy: { data: ['Tax Test', 'Charges Test'] }
                },
            },
        })

        const fetchList = jest.fn();
        const fetchDetailList = jest.fn();
        const saveData = jest.fn()


        customRender(
            <Provider store={mockStore}>
                <ManufacturerAdminstrativeHierarchy isVisible={true} saveData={saveData} handleButtonClick={jest.fn()} resetData={jest.fn()} fetchDetailList={fetchDetailList} fetchList={fetchList} />
            </Provider>
        );

        const organizationSelect = screen.getByRole("combobox", { name: '' });
        fireEvent.change(organizationSelect, { target: { value: 'some value' } });

        const save = screen.getByRole('button', { name: 'Save' })
        fireEvent.click(save)

        await waitFor(() => {
            expect(saveData).toHaveBeenCalled();
        });
        
        saveData.mock.calls[0][0].onSuccess();
        saveData.mock.calls[0][0].onError();
    });
});