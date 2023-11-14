import '@testing-library/jest-dom/extend-expect';
import { ManufactureAdminHierarchyUpload } from '@components/common/ManufacturerAdminstrativeHierarchy/ManufactureAdminHierarchyUpload';
import customRender from '@utils/test-utils';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { rootReducer } from 'store/reducers';
import { Form } from 'antd';

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    return <ManufactureAdminHierarchyUpload form={form} {...props} />;
};

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
    it('Should render upload', () => {
        customRender(<ManufactureAdminHierarchyUpload isVisible={true} />);
    });

    it('Should render  Manufacture Admin Hierarchy download components', async () => {
        const mockStore = createMockStore({
            auth: { userId: 1232 },
            data: {
                ManufacturerAdmin: {
                    ManufacturerAdminUpload: {
                        isLoaded: true,
                        data: [
                            {
                                attributeKey: null,
                                id: '19ec8958-f007-4835-be24-4bc9bd332719',
                                manufactureAdminCode: '6e85eee5-4cfc-40cf-90e7-0dce9acbc2e4',
                                manufactureAdminLongName: 'testing1234532',
                                manufactureAdminParntId: 'null',
                                manufactureAdminShortName: 'test',
                                manufactureOrganizationId: '91398ed9-9128-4a8d-8165-9dac67e91f61',
                                status: true,
                            },
                        ],
                    },
                },
            },
        });

        const buttonData = {
            cancelBtn: true,
            childBtn: true,
            editBtn: false,
            enable: false,
            saveAndNewBtn: false,
            saveBtn: true,
            siblingBtn: true,
        };

        const fetchDocumentFileDocId = jest.fn();
        const showGlobalNotification = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <ManufactureAdminHierarchyUpload showGlobalNotification={showGlobalNotification} downloadFile={jest.fn()} fetchDocumentFileDocId={fetchDocumentFileDocId} setButtonData={jest.fn()} setEmptyList={jest.fn()} downloadForm={true} setFileList={jest.fn()} uploadedFile={true} isVisible={true} buttonData={buttonData} resetData={jest.fn()} handleFormFieldChange={jest.fn()} getDocIdFromOrgId={jest.fn()} handleFormValueChange={jest.fn()} uploadButtonName={'Upload Authority Form'} />
            </Provider>
        );

        const downloadBtn = screen.getByRole('button', { name: 'Download Template', exact: false });
        fireEvent.click(downloadBtn);
        fetchDocumentFileDocId.mock.calls[0][0].onSuccessAction();
        fetchDocumentFileDocId.mock.calls[0][0].onErrorAction();
    });

    it('Should render  Manufacture Admin Hierarchy submit components', async () => {
        const file = new File(['(⌐□_□)'], 'kai.png', { type: 'image/png' });
        const mockStore = createMockStore({
            auth: { userId: 1232 },
            data: {
                ManufacturerAdmin: {
                    ManufacturerAdminUpload: {
                        isLoaded: true,
                        data: [
                            {
                                attributeKey: null,
                                id: '19ec8958-f007-4835-be24-4bc9bd332719',
                                manufactureAdminCode: '6e85eee5-4cfc-40cf-90e7-0dce9acbc2e4',
                                manufactureAdminLongName: 'testing1234532',
                                manufactureAdminParntId: 'null',
                                manufactureAdminShortName: 'test',
                                manufactureOrganizationId: '91398ed9-9128-4a8d-8165-9dac67e91f61',
                                status: true,
                            },
                        ],
                    },
                },
            },
        });

        const buttonData = {
            cancelBtn: true,
            childBtn: true,
            editBtn: false,
            enable: false,
            saveAndNewBtn: false,
            saveBtn: true,
            siblingBtn: true,
            formBtnActive: true,
        };

        const saveAuthorityData = jest.fn();
        const resetData = jest.fn();

        const resp = {
            data: [{ docId: '234433' }],
        };

        const resetFields = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <FormWrapper saveAuthorityData={saveAuthorityData} resetData={resetData} setButtonData={jest.fn()} isVisible={true} handleButtonClick={jest.fn()} buttonData={buttonData} setFileList={jest.fn()} setEmptyList={jest.fn()} setUploadedFileName={jest.fn()} uploadedFile={file} fetchDocumentFileDocId={jest.fn()} handleFormFieldChange={jest.fn()} handleFormValueChange={jest.fn()} onFinish={jest.fn()} setUploadedFile={jest.fn()} resetFields={resetFields} showGlobalNotification={jest.fn()} setIsUploadDrawer={jest.fn()} />
            </Provider>
        );

        const uploadFile = screen.getByRole('button', { name: 'Upload Authority Form', exact: false });
        fireEvent.drop(uploadFile, {
            dataTransfer: { files: [file] },
        });
        fireEvent.change(uploadFile, { dataTransfer: { files: [file] } });

        const downloadBtn = screen.getByRole('button', { name: 'Download Template', exact: false });
        fireEvent.click(downloadBtn);

        const saveBtn = screen.getByRole('button', { name: 'Save', exact: false });
        fireEvent.click(saveBtn);

        await waitFor(() => {
            expect(saveAuthorityData).toHaveBeenCalled();
        });

        saveAuthorityData.mock.calls[0][0].onSuccess(resp);
        saveAuthorityData.mock.calls[0][0].onError(resp);
    });

    it('Should render  Manufacture Admin Hierarchy cancel components', async () => {
        const mockStore = createMockStore({
            auth: { userId: 1232 },
            data: {
                ManufacturerAdmin: {
                    ManufacturerAdminUpload: {
                        isLoaded: true,
                        data: [
                            {
                                docId: '106',
                            },
                        ],
                    },
                },
            },
        });

        const buttonData = {
            cancelBtn: true,
            childBtn: true,
            editBtn: false,
            enable: false,
            saveAndNewBtn: false,
            saveBtn: true,
            siblingBtn: true,
        };

        const saveAuthorityData = jest.fn();
        const fetchDocumentFileDocId = jest.fn();
        const resetData = jest.fn();
        const authorityShowLoading = jest.fn();
        const fetchDetailList = jest.fn();

        const formActionType = {
            viewMode: false,
        };

        customRender(
            <Provider store={mockStore}>
                <ManufactureAdminHierarchyUpload saveAuthorityData={saveAuthorityData} resetData={resetData} fetchDocumentFileDocId={fetchDocumentFileDocId} setButtonData={jest.fn()} isVisible={true} handleButtonClick={jest.fn()} fetchList={jest.fn()} buttonData={buttonData} setFileList={jest.fn()} setEmptyList={jest.fn()} setUploadedFileName={jest.fn()} handleUpload={jest.fn()} isReplacing={false} base64Img={false} formActionType={formActionType} authorityShowLoading={authorityShowLoading} fetchDetailList={fetchDetailList} />
            </Provider>
        );

        const saveBtn = screen.getByRole('button', { name: 'Cancel', exact: false });
        fireEvent.click(saveBtn);
    });
});
