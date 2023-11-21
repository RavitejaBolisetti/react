import '@testing-library/jest-dom/extend-expect';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import customRender from '@utils/test-utils';
import { RoleManagement } from 'components/common/RoleManagement/RoleManagement';

afterEach(() => {
    jest.restoreAllMocks();
});

jest.mock('store/actions/data/roleManagement/roleMenu', () => ({
    RoleManagementMenuDataActions: {},
}));

jest.mock('store/actions/data/roleManagement/roleList', () => ({
    RoleListDataActions: {},
}));

const roleManagementData = [{ id: '106', roleId: 'ROL106', roleName: 'Manager', roleDescription: 'Description', status: true, accessProvided: null }];
const rolemenuData = [{ id: '106', value: 'test106', label: 'Kai', type: 'Application', parentId: 'Web', checked: false, status: null, children: [{ id: '106', value: 'test106', label: 'Update', type: 'Action', parentId: 'test106', checked: false, status: null, children: null }] }];

describe('RoleManagement Components', () => {
    it('should render RoleManagement components', () => {
        customRender(<RoleManagement />);
    });

    it('edit form and close button should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                RoleManagementData: {
                    RoleList: { isLoaded: true, data: roleManagementData },
                    RoleMenu: { isLoaded: true, data: rolemenuData },
                },
            },
        });

        const fetchMenuList = jest.fn();
        const fetchList = jest.fn();

        const response = {
            data: rolemenuData,
        };

        customRender(
            <Provider store={mockStore}>
                <RoleManagement fetchMenuList={fetchMenuList} fetchList={fetchList} />
            </Provider>
        );

        await waitFor(() => {
            expect(fetchMenuList).toHaveBeenCalled();
        });
        fetchMenuList.mock.calls[0][0].onSuccessAction(response);
        fetchMenuList.mock.calls[0][0].onErrorAction();

        await waitFor(() => {
            expect(screen.getByText('Kai')).toBeInTheDocument();
        });

        const viewBtn = screen.getByTestId('edit');
        fireEvent.click(viewBtn);

        const collapseBtn = screen.getAllByRole('img', { name: 'plus' });
        fireEvent.click(collapseBtn[1]);

        fireEvent.click(screen.getByText('Update'));

        const roleName = screen.getAllByRole('textbox', { name: 'Role Name' });
        fireEvent.change(roleName[1], { target: { value: 'Kai' } });

        const saveBtn = screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn);

        const closeBtn = screen.getByRole('button', { name: 'Close' });
        fireEvent.click(closeBtn);
    });

    it('test1', async () => {
        const tableData = [{ accessProvided: null, id: '4aa01296-46b5-4891-94bc-7c450dad86e0', roleDescription: 'test', roleId: 'test', roleName: 'test', roleType: 'MNM', status: true }];
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                RoleManagementData: {
                    RoleList: { isLoaded: true, data: [{ accessProvided: null, id: '4aa01296-46b5-4891-94bc-7c450dad86e0', roleDescription: 'test', roleId: 'test', roleName: 'test', roleType: 'MNM', status: true }] },
                },
            },
        });

        const fetchList = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <RoleManagement fetchList={fetchList} fetchMenuList={jest.fn()} tableData={tableData} />
            </Provider>
        );

        fetchList.mock.calls[0][0].onSuccessAction();
        fetchList.mock.calls[0][0].onErrorAction();

        const searchPlac = screen.getByPlaceholderText('Search');
        fireEvent.change(searchPlac, { target: { value: 'Test' } });

        const searchBtn = screen.getByRole('button', { name: 'search' });
        fireEvent.click(searchBtn);

        const refreshBtn = screen.getByRole('button', { name: '' });
        fireEvent.click(refreshBtn);

        const plusImg = screen.getByRole('img', { name: /plus/i });
        fireEvent.click(plusImg);

        const closeBtn = screen.getByRole('button', { name: /cancel/i });
        fireEvent.click(closeBtn);
    });
});
