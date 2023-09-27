import '@testing-library/jest-dom/extend-expect';
import { ManufactureAdminHierarchyUpload } from '@components/common/ManufacturerAdminstrativeHierarchy/ManufactureAdminHierarchyUpload';
import customRender from '@utils/test-utils';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { Form } from 'antd';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { rootReducer } from 'store/reducers';

export const createMockStore = (initialState) => {
    const mockStore = configureStore({
        reducer: rootReducer,
        preloadedState: initialState,
        middleware: [thunk],
    });
    return mockStore;
};

jest.mock('store/actions/data/manufacturerAdminHierarchy/manufacturerAdminUpload', () => ({
    manufacturerAdminUploadDataActions: {},
}));

describe('Manufacture Admin Hierarchy Upload view components', () => {

    it("Should render upload", () => {
        customRender(<ManufactureAdminHierarchyUpload isVisible={true} />)
    })

    it('Should render  Manufacture Admin Hierarchy download components', async () => {
        const mockStore = createMockStore({
            auth: { userId: 1232 },
            data: {
                ManufacturerAdmin: {
                    ManufacturerAdminUpload: {
                        isLoaded: true, data: [{
                            attributeKey: null,
                            id: "19ec8958-f007-4835-be24-4bc9bd332719",
                            manufactureAdminCode: "6e85eee5-4cfc-40cf-90e7-0dce9acbc2e4",
                            manufactureAdminLongName: "testing1234532",
                            manufactureAdminParntId: "null",
                            manufactureAdminShortName: "test",
                            manufactureOrganizationId: "91398ed9-9128-4a8d-8165-9dac67e91f61",
                            status: true
                        }]
                    }
                },
            },
        })

        const buttonData = {
            cancelBtn: true,
            childBtn: true,
            editBtn: false,
            enable: false,
            saveAndNewBtn: false,
            saveBtn: true,
            siblingBtn: true,
        }

        const fetchDocumentFileDocId = jest.fn();
        const showGlobalNotification = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <ManufactureAdminHierarchyUpload showGlobalNotification={showGlobalNotification} downloadFile={jest.fn()} fetchDocumentFileDocId={fetchDocumentFileDocId} setButtonData={jest.fn()} setEmptyList={jest.fn()} downloadForm={true} setFileList={jest.fn()} uploadedFile={true} isVisible={true} buttonData={buttonData} resetData={jest.fn()} handleFormFieldChange={jest.fn()} getDocIdFromOrgId={jest.fn()} handleFormValueChange={jest.fn()} uploadButtonName={"Upload Authority Form"} />
            </Provider>
        )

        const downloadBtn = screen.getByRole('button', { name: "Download Template", exact: false });
        fireEvent.click(downloadBtn)
        fetchDocumentFileDocId.mock.calls[0][0].onSuccessAction();
        fetchDocumentFileDocId.mock.calls[0][0].onErrorAction();

    })

    it('Should render  Manufacture Admin Hierarchy submit components', async () => {
        const file = new File(['(⌐□_□)'], 'kai.png', { type: 'image/png' });

        const mockStore = createMockStore({
            auth: { userId: 1232 },
            data: {
                ManufacturerAdmin: {
                    ManufacturerAdminUpload: {
                        isLoaded: true, data: [{
                            "id": "99b54277-31e2-4acd-aa34-bd248703989a",
                            "attributeKey": null,
                            "status": true,
                            "manufactureAdminShortName": "TEST",
                            "manufactureAdminLongName": "TEST",
                            "manufactureAdminParntId": "null",
                            "manufactureAdminCode": "24650be8-10f5-4d71-a5eb-721a4ebf1a1d",
                            "manufactureOrganizationId": "d96bf0fe-7e17-4538-a5ad-553d777baa6f",
                            "subManufactureAdmin": [],
                            "docId": "82f02568-84f8-4c42-a919-f216cdbf97ee"
                        }]
                    }
                },
            },
        })

        const res = {
            data: [
                {
                    "id": "99b54277-31e2-4acd-aa34-bd248703989a",
                    "attributeKey": null,
                    "status": true,
                    "manufactureAdminShortName": "TEST",
                    "manufactureAdminLongName": "TEST",
                    "manufactureAdminParntId": "null",
                    "manufactureAdminCode": "24650be8-10f5-4d71-a5eb-721a4ebf1a1d",
                    "manufactureOrganizationId": "d96bf0fe-7e17-4538-a5ad-553d777baa6f",
                    "subManufactureAdmin": [],
                    "docId": "82f02568-84f8-4c42-a919-f216cdbf97ee"
                }]
        };

        const buttonData = {
            cancelBtn: true,
            childBtn: true,
            editBtn: false,
            enable: false,
            saveAndNewBtn: false,
            saveBtn: true,
            siblingBtn: true,
        }

        const saveAuthorityData = jest.fn()
        const fetchDocumentFileDocId = jest.fn();
        const resetData = jest.fn()
        const authorityShowLoading = jest.fn();
        const fetchDetailList = jest.fn()

        const formActionType={
            viewMode: false
        }

        customRender(
            <Provider store={mockStore}>
                <ManufactureAdminHierarchyUpload saveAuthorityData={saveAuthorityData} 
                resetData={resetData} fetchDocumentFileDocId={fetchDocumentFileDocId} setButtonData={jest.fn()} isVisible={true} handleButtonClick={jest.fn()} fetchList={jest.fn()} buttonData={buttonData} 
                setFileList={jest.fn()}
                setEmptyList={jest.fn()}
                setUploadedFileName={jest.fn()}
                handleUpload={jest.fn()} isReplacing={false} base64Img={false}
                formActionType={formActionType}
                authorityShowLoading={authorityShowLoading}
                fetchDetailList={fetchDetailList}
                docId={"82f02568-84f8-4c42-a919-f216cdbf97ee"}
                />
            </Provider>
        )

        const uploadFile = screen.getByRole('button', { name: "Upload Authority Form", exact: false });
        fireEvent.drop(uploadFile, {
            dataTransfer: { files: [file] },
        });

        const saveBtn = screen.getByRole('button', { name: "Save", exact: false });
        fireEvent.click(saveBtn)

        // await waitFor(() => expect(saveAuthorityData).toHaveBeenCalled());
        saveAuthorityData.mock.calls[0][0].onSuccess(res);
        // saveAuthorityData.mock.calls[0][0].onError();

        screen.debug()
        screen.getByRole('')
    })

})