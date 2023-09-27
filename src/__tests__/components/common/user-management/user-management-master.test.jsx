import '@testing-library/jest-dom/extend-expect';
import { UserManagementMaster } from '@components/common/UserManagement/UserManagementMaster';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

jest.mock('components/common/UserManagement/LeftSidebar', () => {
    return {
        __esModule: true,
        LeftSidebar: () => null,
    }
});

jest.mock('store/actions/data/userManagement/searchUser', () => ({
    searchUserDataActions: {
        innerDataActions: {
            fetchList: jest.fn(),
        },
    },
}));

const userDataList = {"pageSize":10,"pageNumber":1,"totalRecords":1,"userNotExist":null,"userSearchResponse":{"userType":null,"userLoginId":"sushil","userDetails":[{"employeeCode":"50003730","dealerName":null,"dealerCode":null,"dealerParentGroupCode":null,"userName":"50003730","designation":null,"mobileNumber":"+919896100046","email":"prks-feb@2023","userRoleCount":2,"branchMapping":0,"productMapping":null,"manufacturerUserName":"Prateek Kumar","dmsUserNotExist":false}]}};
const userDataListEmpty = { userSearchResponse: { userDetails : [{ dmsUserNotExist: true } ]}};
const dealerDataList= [{dealerCode: 106, dealerName: 'Kai'}];

describe('User Management Master components', () => {
    it('should render User Management Master components', () => {
        const fetchUserDataList=jest.fn();
        customRender(<UserManagementMaster fetchUserDataList={fetchUserDataList} />);
    });

    it('dealer and manufacturer tabs should work', () => {
        const fetchUserDataList=jest.fn();
        customRender(<UserManagementMaster fetchUserDataList={fetchUserDataList} />);
        const dealer=screen.getByRole('button', { name: 'Dealer' });
        fireEvent.click(dealer);
        const manufacturer=screen.getByRole('button', { name: 'Manufacturer' });
        fireEvent.click(manufacturer);
    });

    it('manage access button should work', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                UserManagement: {
                    SearchUser: { data: userDataListEmpty },
                },
            },
        });
        const fetchUserDataList=jest.fn();
        customRender(
            <Provider store={mockStore}>
                <UserManagementMaster fetchUserDataList={fetchUserDataList} />
            </Provider>
        );
        const manageAccess=screen.getByRole('button', { name: 'plus Manage Access' });
        fireEvent.click(manageAccess);
    });

    it('select should work in dealer', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                UserManagement: {
                    SearchUser: { data: userDataListEmpty },
                    UserDealerList: { isLoaded: true, data: dealerDataList },
                    RoleList: { data: [{status: 'Active'}] },
                },
            },
        });
        const fetchUserDataList=jest.fn();
        customRender(
            <Provider store={mockStore}>
                <UserManagementMaster fetchUserDataList={fetchUserDataList} />
            </Provider>
        );
        const dealer=screen.getByRole('button', { name: 'Dealer' });
        fireEvent.click(dealer);
        const selectField=screen.getByRole('combobox', { name: '' });
        fireEvent.change(selectField, { target: { value: 106 } });
        await waitFor(()=> {
            expect(screen.getByText('Kai')).toBeInTheDocument();
        });
        fireEvent.click(screen.getByText('Kai'));
    });

    it('edit, close and view buttons should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                UserManagement: {
                    SearchUser: { data: userDataList }
                },
            },
        });
        const fetchUserDataList=jest.fn();
        customRender(
            <Provider store={mockStore}>
                <UserManagementMaster fetchUserDataList={fetchUserDataList} />
            </Provider>
        );
        
        fetchUserDataList.mock.calls[0][0].onSuccessAction();
        fetchUserDataList.mock.calls[0][0].onErrorAction('Kai');
        const editBtn=screen.getByTestId('edit');
        fireEvent.click(editBtn);
        const closeBtn=screen.getByRole('button', { name: 'Close' });
        fireEvent.click(closeBtn);
        const viewBtn=screen.getByTestId('view');
        fireEvent.click(viewBtn);
    });

});