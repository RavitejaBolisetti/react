import '@testing-library/jest-dom/extend-expect';
import AuthorityDetailMaster from '@components/common/ManufacturerAdminstrativeHierarchy/HierarchyAuthorityDetail/AuthorityDetailMaster';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import { Form } from 'antd';
import { Provider } from 'react-redux';
import createMockStore from '__mocks__/store';

jest.mock('components/common/ManufacturerAdminstrativeHierarchy/HierarchyAuthorityDetail/AddEditForm', () => {
    const AddEditForm = ({ onFinish }) => <div><button onClick={onFinish}>Save</button></div>;
    return {
        __esModule: true,
        AddEditForm,
    };
});

const FormWrapper = (props) => {
    const [actionForm] = Form.useForm();
    return <AuthorityDetailMaster actionForm={actionForm} {...props} />;
};

describe('Authority detail master components', () => {

    it('Should render authority detail master components', () => {
        customRender(<FormWrapper isVisible={true} />)
    });

    it('edit button should work', () => {
        const mockStore=createMockStore({
            data: {
                ManufacturerAdmin: {
                    ManufactureAdminValidateToken: { data: { name: 'Kai' } },
                },
            },
        });

        const documentTypesList=[{ name: 'Kai' }];

        customRender(
            <Provider store={mockStore}>
                <FormWrapper isVisible={true} documentTypesList={documentTypesList} />
            </Provider>
        );
        const editBtn=screen.getAllByRole('button', { name: '' });
        fireEvent.click(editBtn[0]);
    });

    it('delete button should work', () => {
        const mockStore=createMockStore({
            data: {
                ManufacturerAdmin: {
                    ManufactureAdminValidateToken: { data: { name: 'Kai' } },
                },
            },
        });

        const documentTypesList=[{ name: 'Kai' }];
        const setDocumentTypesList=jest.fn();

        customRender(
            <Provider store={mockStore}>
                <FormWrapper isVisible={true} documentTypesList={documentTypesList} setDocumentTypesList={setDocumentTypesList} />
            </Provider>
        );
        const deleteBtn=screen.getAllByRole('button', { name: '' });
        fireEvent.click(deleteBtn[1]);

        setDocumentTypesList.mock.calls[0][0]('Kai');
    });

    it('save button should work', () => {
        const mockStore=createMockStore({
            data: {
                ManufacturerAdmin: {
                    ManufactureAdminValidateToken: { data: { name: 'Kai' } },
                },
            },
        });

        const documentTypesList=[{ name: 'Kai' }];
        const setDocumentTypesList=jest.fn();

        customRender(
            <Provider store={mockStore}>
                <FormWrapper isVisible={true} documentTypesList={documentTypesList} setDocumentTypesList={setDocumentTypesList} />
            </Provider>
        );
        
        const saveBtn=screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn);
    });

});
