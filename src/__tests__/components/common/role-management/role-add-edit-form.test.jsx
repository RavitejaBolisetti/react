import '@testing-library/jest-dom/extend-expect';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import customRender from '@utils/test-utils';
import { AddEditForm } from 'components/common/RoleManagement/AddEditForm';
import { Form } from 'antd';

afterEach(() => {
    jest.restoreAllMocks();
});

jest.mock('store/actions/data/roleManagement/roleMenu', ()=> ({
    RoleManagementMenuDataActions: {}
}));

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    return <AddEditForm onUpdate={jest.fn()} form={form} {...props} />;
};

const roleManagementData=[{"id":"106","roleId":"ROL106","roleName":"Manager","roleDescription":"Description","status":true,"accessProvided":null}];
const rolemenuData= [{"id":"106","value":"test106","label":"Kai","type":"Application","parentId":"Web","checked":false,"status":null,"children":[{"id":"106","value":"test106","label":"Update","type":"Action","parentId":"test106","checked":false,"status":null,"children":null}]}];
const unFilteredMenuData= { W: [{"id":"106","value":"test106","label":"Kai","type":"Application","parentId":"Web","checked":false,"status":null,"children":[{"id":"106","value":"test106","label":"Update","type":"Action","parentId":"test106","checked":false,"status":null,"children":null}]}]};

describe('AddEditForm Components', () => {

    it('should render AddEditForm components', () => {
        const formActionType={
            viewMode: true
        }
        customRender(<AddEditForm isVisible={true} formActionType={formActionType} />);
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

        const fetchMenuList=jest.fn();
        const saveData=jest.fn();

        const response={
            data: rolemenuData,
        }

        const formActionType={
            viewMode: false,
        }

        const buttonData={
            saveBtn: true,
            formBtnActive: true
        }

        const formData={
            id: 106
        }

        customRender(
            <Provider store={mockStore}>
                <FormWrapper fetchMenuList={fetchMenuList} fetchList={jest.fn()} saveData={saveData} isVisible={true} formActionType={formActionType} formData={formData} setUnFilteredMenuData={jest.fn()} unFilteredMenuData={unFilteredMenuData} buttonData={buttonData} setButtonData={jest.fn()} setIsFormVisible={jest.fn()}  />
            </Provider>
        );

        await waitFor(() => { expect(fetchMenuList).toHaveBeenCalled() });
        fetchMenuList.mock.calls[0][0].onSuccessAction(response);
        fetchMenuList.mock.calls[0][0].onErrorAction();

        await waitFor(() => { expect(screen.getByText('Kai')).toBeInTheDocument() })

        const collapseBtn=screen.getByRole('img', { name: 'plus' });
        fireEvent.click(collapseBtn);

        fireEvent.click(screen.getByText('Update'));

        const roleId=screen.getByRole('textbox', { name: 'Role Id' });
        fireEvent.change(roleId, { target: { value: 106 } });

        const roleName=screen.getByRole('textbox', { name: 'Role Name' });
        fireEvent.change(roleName, { target: { value: 'Kai' } });

        const roleDescription=screen.getByRole('textbox', { name: 'Role Description' });
        fireEvent.change(roleDescription, { target: { value: 'Kai' } });

        const saveBtn=screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn);

        await waitFor(() => { expect(saveData).toHaveBeenCalled() });
        saveData.mock.calls[0][0].onSuccess();
        saveData.mock.calls[0][0].onError();

        const closeBtn=screen.getByRole('button', { name: 'Close' });
        fireEvent.click(closeBtn);

    });

});
