import React from 'react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { ManufacturerAdminstrativeHierarchy } from '@components/common/ManufacturerAdminstrativeHierarchy/ManufacturerAdminstrativeHierarchy';
import customRender from '@utils/test-utils';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';

jest.mock('@components/common/ManufacturerAdminstrativeHierarchy/AddEditForm', () => {
    const AddEditForm = ({ onFinish, onCloseAction, handleSelectTreeClick }) => { 

        const handleButtonClick= () => {
            onFinish();
            handleSelectTreeClick();
        }

        return (
            <div>
                <button onClick={handleButtonClick}>Save</button>
                <button onClick={onCloseAction}>Cancel</button>            
            </div>
        )
    };
    return {
        __esModule: true,
        AddEditForm,
    };
});

jest.mock('utils/Upload', () => {
    const UploadUtil = ({ onFinish }) => { 

        return (
            <div>
                <button onClick={onFinish}>Upload Authority Form</button>
            </div>
        )
    };
    return {
        __esModule: true,
        UploadUtil,
    };
});

jest.mock('store/actions/data/manufacturerAdminHierarchy/manufacturerAdminHierarchy', () => ({
    ManufacturerAdminHierarchyDataActions: {}
}));

jest.mock('store/actions/data/manufacturerAdminHierarchy/manufacturerAdminUpload', () => ({
    manufacturerAdminUploadDataActions: {}
}));

const data={
    auth: { userId: 106 },
    data: {
        HierarchyAttributeMaster: { isLoaded: true, data: [{ hierarchyAttribueName: 'Kai', id: 106 }], isDetailLoaded: true },
        ManufacturerOrgHierarchy: { isLoaded: true, data: [{ manufactureOrgShrtName: 'Kai', id: 106 }] },
        ManufacturerAdmin: {
            ManufacturerAdminHierarchy: { isLoaded: true, data: [{ manufactureAdminShortName: 'AdminName', id: 106 }] },
            ManufacturerAdminHierarchyDetailData: { isLoaded: true, data: { attributeKey: 106, adminAuthority: [{ name: 'Kai' }] } },
        },
    },
};


describe('ManufacturerAdminstrativeHierarchyMain', () => {

    it('should render manufacturer administrative hierarchy component', () => {
        customRender(<ManufacturerAdminstrativeHierarchy />);
    });

    it('add should work', async() => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                HierarchyAttributeMaster: { isLoaded: true, data: [{ hierarchyAttribueName: 'Kai', id: 106 }], isDetailLoaded: true },
                ManufacturerOrgHierarchy: { isLoaded: true, data: [{ manufactureOrgShrtName: 'Kai', id: 106 }] },
            },
        });

        customRender(
            <Provider store={mockStore}>
                <ManufacturerAdminstrativeHierarchy setIsLoading={jest.fn()} fetchList={jest.fn()} />
            </Provider>
        );

        const selectHierarchy=screen.getByRole('combobox', { name: '' });
        fireEvent.change(selectHierarchy, { target: { value: 'Kai' } });
        const parentTree=screen.getByText('Kai');
        fireEvent.click(parentTree);

        const plusAdd=screen.getByRole('button', { name: 'plus Add' });
        fireEvent.click(plusAdd);

        const cancelBtn=screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancelBtn);

    });

    it('add child, and sibling should work', async() => {
        const mockStore = createMockStore(data);

        customRender(
            <Provider store={mockStore}>
                <ManufacturerAdminstrativeHierarchy setIsLoading={jest.fn()} fetchList={jest.fn()} />
            </Provider>
        );

        const selectHierarchy=screen.getByRole('combobox', { name: '' });
        fireEvent.change(selectHierarchy, { target: { value: 'Kai' } });
        const parentTree=screen.getByText('Kai');
        fireEvent.click(parentTree);

        const selectAdminHierarchy=screen.getByText('AdminName');
        fireEvent.click(selectAdminHierarchy);

        const addChild=screen.getByRole('button', { name: 'Add Child' });
        fireEvent.click(addChild);

        const cancelBtn1=screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancelBtn1);

        const addSibling=screen.getByRole('button', { name: 'Add Sibling' });
        fireEvent.click(addSibling);

        const cancelBtn2=screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancelBtn2);

    });

    it('edit and save should work', async() => {
        const mockStore = createMockStore(data);

        const saveData=jest.fn();
        const res={
            data: 'Kai'
        }

        customRender(
            <Provider store={mockStore}>
                <ManufacturerAdminstrativeHierarchy setIsLoading={jest.fn()} saveData={saveData} fetchList={jest.fn()} />
            </Provider>
        );

        const selectHierarchy=screen.getByRole('combobox', { name: '' });
        fireEvent.change(selectHierarchy, { target: { value: 'Kai' } });
        const parentTree=screen.getByText('Kai');
        fireEvent.click(parentTree);

        const selectAdminHierarchy=screen.getByText('AdminName');
        fireEvent.click(selectAdminHierarchy);

        const editBtn=screen.getByRole('button', { name: 'Edit' });
        fireEvent.click(editBtn);

        const saveBtn=screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn);

        await waitFor(() => { expect(saveData).toHaveBeenCalled() });

        saveData.mock.calls[0][0].onSuccess(res);
        saveData.mock.calls[0][0].onError();

    });

    it('upload should work', async() => {
        const mockStore = createMockStore(data);

        const saveAuthorityData=jest.fn();
        const fetchDocumentFileDocId=jest.fn();
        const res='Error Message';
        const passData={
            docId: 106
        }

        customRender(
            <Provider store={mockStore}>
                <ManufacturerAdminstrativeHierarchy fetchList={jest.fn()} saveData={jest.fn()} saveAuthorityData={saveAuthorityData} fetchDocumentFileDocId={fetchDocumentFileDocId} resetData={jest.fn()} />
            </Provider>
        );

        const selectHierarchy=screen.getByRole('combobox', { name: '' });
        fireEvent.change(selectHierarchy, { target: { value: 'Kai' } });
        const parentTree=screen.getByText('Kai');
        fireEvent.click(parentTree);

        const uploadBtn=screen.getByRole('button', { name: 'Upload' });
        fireEvent.click(uploadBtn);

        const downloadTemplate=screen.getByRole('button', { name: 'Download Template' });
        fireEvent.click(downloadTemplate);

        await waitFor(() => { expect(fetchDocumentFileDocId).toHaveBeenCalled() });

        fetchDocumentFileDocId.mock.calls[0][0].onSuccessAction();

        const uploadAuthority=screen.getByRole('button', { name: 'Upload Authority Form' });
        fireEvent.click(uploadAuthority);

        await waitFor(() => { expect(saveAuthorityData).toHaveBeenCalled() });

        saveAuthorityData.mock.calls[0][0].onSuccess();
        saveAuthorityData.mock.calls[0][0].onError(res, passData);

    });

});