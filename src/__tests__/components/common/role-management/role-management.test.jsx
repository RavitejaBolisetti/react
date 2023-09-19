import '@testing-library/jest-dom/extend-expect';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import customRender from '@utils/test-utils';
import { RoleManagement } from 'components/common/RoleManagement/RoleManagement';

afterEach(() => {
    jest.restoreAllMocks();
});

jest.mock('store/actions/data/roleManagement/roleMenu', ()=> ({
    RoleManagementMenuDataActions: {}
}));

jest.mock('store/actions/data/roleManagement/roleList', ()=> ({
    RoleListDataActions: {}
}));

const roleManagementData=[{"id":"106","roleId":"ROL106","roleName":"Manager","roleDescription":"Description","status":true,"accessProvided":null}];

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
                },
            },
        });

        const fetchMenuList=jest.fn();

        const response={
            data: [{ checked: true }]
        }

        customRender(
            <Provider store={mockStore}>
                <RoleManagement fetchMenuList={fetchMenuList} fetchList={jest.fn()} />
            </Provider>
        );

        await waitFor(() => { expect(screen.getByText('Manager')).toBeInTheDocument() });

        const viewBtn=screen.getByTestId('edit');
        fireEvent.click(viewBtn);

        await waitFor(() => expect(fetchMenuList).toHaveBeenCalled() );
        fetchMenuList.mock.calls[0][0].onSuccessAction(response);
        fetchMenuList.mock.calls[0][0].onErrorAction();

        const collapseItem=screen.getByRole('img', { name: 'plus' });
        fireEvent.click(collapseItem);

        const roleName=screen.getByRole('textbox', { name: 'Role Name' });
        fireEvent.change(roleName, { target: { value: 'Kai' } });

        const saveBtn=screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn);

        const closeBtn=screen.getByRole('button', { name: 'Close' });
        fireEvent.click(closeBtn);

    });

    it('search should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                RoleManagementData: {
                    RoleList: { isLoaded: true, data: roleManagementData },
                },
            },
        });

        const fetchList=jest.fn();

        customRender(
            <Provider store={mockStore}>
                <RoleManagement fetchList={fetchList} />
            </Provider>
        );

        fetchList.mock.calls[0][0].onSuccessAction();
        fetchList.mock.calls[0][0].onErrorAction();

        await waitFor(() => { expect(screen.getByText('Manager')).toBeInTheDocument() });

        const searchBox=screen.getByRole('textbox', { name: 'Role List' });
        fireEvent.change(searchBox, { target: { value: 'Manager' } });

        const searchBtn=screen.getByRole('button', { name: 'search' });
        fireEvent.click(searchBtn);

        fireEvent.change(searchBox, { target: { value: '' } });
        fireEvent.click(searchBtn);

    });

});
