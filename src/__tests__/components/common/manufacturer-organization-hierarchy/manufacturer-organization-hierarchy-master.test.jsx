import '@testing-library/jest-dom/extend-expect';
import { ManufacturerOrgHierarchy } from 'components/common/ManufacturerOrganizationHierarchy';
import customRender from '@utils/test-utils';
import { Provider } from 'react-redux';
import createMockStore from '__mocks__/store';
import { screen, fireEvent, waitFor } from '@testing-library/react';

afterEach(() => {
    jest.restoreAllMocks();
});

jest.mock('store/actions/data/manufacturerOrgHierarchy', () => ({
    manufacturerOrgHierarchyDataActions: {},
}));

describe('Manufacturer Org Hierarchy Change History components', () => {
    it('should render ManufacturerOrgHierarchy components', async () => {
        customRender(<ManufacturerOrgHierarchy />);

        const addBtn = screen.getByRole('button', { name: /Add/i });
        fireEvent.click(addBtn);

        const cancelBtn = screen.getByRole('button', { name: /Cancel/i });
        fireEvent.click(cancelBtn);
    });

    it('test for search', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                ManufacturerOrgHierarchy: {
                    isLoaded: true,
                    data: [{ id: '106', manufactureOrgLongName: 'MAHINDRA', manufactureOrgShrtName: 'Kai', manufactureOrgCode: 'Kai', manufactureOrgParntId: 'null', active: true, attributeKey: '106', subManufactureOrg: [] }],
                },
                HierarchyAttributeMaster: {
                    isLoaded: true,
                    data: [
                        { key: '1', value: 'kai' },
                        { key: '2', value: 'kai' },
                    ],
                },
            },
        });

        const saveData = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <ManufacturerOrgHierarchy saveData={saveData} />
            </Provider>
        );

        const searchBox = screen.getByPlaceholderText(/Search/i);
        fireEvent.change(searchBox, { target: { value: 'Test' } });
        const searchBtn = screen.getByRole('img', { name: /search/i });
        fireEvent.click(searchBtn);

        const changeHistoryBtn = screen.getByRole('button', { name: /Change History/i });
        fireEvent.click(changeHistoryBtn);
    });

    it('test for onSuccess', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                ManufacturerOrgHierarchy: {
                    isLoaded: true,
                    data: [{ id: '106', manufactureOrgLongName: 'MAHINDRA', manufactureOrgShrtName: 'Kai', manufactureOrgCode: 'Kai', manufactureOrgParntId: 'null', active: true, attributeKey: '106', subManufactureOrg: [] }],
                },
                HierarchyAttributeMaster: {
                    isLoaded: true,
                    data: [
                        { key: '1', value: 'kai' },
                        { key: '2', value: 'kai' },
                    ],
                },
            },
        });

        const saveData = jest.fn();
        const res = { data: [{ id: 106, name: 'Kai' }] };

        customRender(
            <Provider store={mockStore}>
                <ManufacturerOrgHierarchy saveData={saveData} fetchList={jest.fn()} fetchChangeHistoryList={jest.fn()} />
            </Provider>
        );

        const treeText = screen.getByText('Kai');
        fireEvent.click(treeText);

        const editBtn = screen.getByRole('button', { name: 'Edit' });
        fireEvent.click(editBtn);

        const status = screen.getByRole('switch', { name: 'Status' });
        fireEvent.click(status);

        const saveBtn = screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn);

        await waitFor(() => expect(saveData).toHaveBeenCalled());
        saveData.mock.calls[0][0].onSuccess(res);
    });

    it('test for addSibling button', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                ManufacturerOrgHierarchy: {
                    isLoaded: true,
                    data: [{ id: '106', manufactureOrgLongName: 'MAHINDRA', manufactureOrgShrtName: 'Kai', manufactureOrgCode: 'Kai', manufactureOrgParntId: 'null', active: true, attributeKey: '106', subManufactureOrg: [] }],
                },
                HierarchyAttributeMaster: {
                    isLoaded: true,
                    data: [{ key: '1', value: 'kai', status: 'Active' }],
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <ManufacturerOrgHierarchy />
            </Provider>
        );

        const treeText = screen.getByText('Kai');
        fireEvent.click(treeText);

        const editBtn = screen.getByRole('button', { name: 'Edit' });
        fireEvent.click(editBtn);

        const addSibling = screen.getByRole('button', { name: 'Add Sibling' });
        fireEvent.click(addSibling);

        const cancelBtn = screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancelBtn);
    });
});
