/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import { ListCustomerCreation } from '@components/common/LessorCustomerCreation/ListCustomerCreation';
import customRender from '@utils/test-utils';
import { fireEvent, screen, waitFor } from '@testing-library/react';
// eslint-disable-next-line jest/no-mocks-import
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';

afterEach(() => {
    jest.restoreAllMocks();
});

jest.mock('@components/common/LessorCustomerCreation/AddEditForm', () => {
    const AddEditForm = ({ onFinish, onCloseAction }) => (
        <div>
            <button onClick={onFinish}>Save</button>
            <button onClick={onCloseAction}>Cancel</button>
        </div>
    );
    return {
        __esModule: true,
        AddEditForm,
    };
});

jest.mock('store/actions/data/lessorCustomerCreation', () => ({
    lessorCustomerCreationDataActions: {},
}));

jest.mock('store/actions/data/supportingDocument', () => ({
    supportingDocumentDataActions: {},
}));

describe('ListCustomerCreation components', () => {
    it('isStateDataLoaded', () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                Geo: { State: { isStateDataLoaded: false } },
            },
        });

        customRender(
            <Provider store={mockStore}>
                <ListCustomerCreation fetchStateLovList={jest.fn()} />
            </Provider>
        );
    });

    it('should render upload button', () => {
        customRender(<ListCustomerCreation />);

        const uploadBtn = screen.getByRole('button', { name: 'Upload;' });
        fireEvent.click(uploadBtn);

        const cancelBtn = screen.getByRole('button', { name: 'Download;' });
        fireEvent.click(cancelBtn);
    });

    it('should render download button', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                ConfigurableParameterEditing: {
                    filteredListData: {
                        FILE_DOWNLOAD_TMPLT: [{ key: 'VCLPRCMSTTMPLT' }],
                    },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <ListCustomerCreation />
            </Provider>
        );

        const downloadBtn = screen.getAllByRole('button', { name: 'Download;' });
        fireEvent.click(downloadBtn[0]);
    });

    it('cancel button should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                ConfigurableParameterEditing: { filteredListData: { FILE_DOWNLOAD_TMPLT: [{ key: 'VCLPRCMSTTMPLT' }] } },
                LessorCustomerCreation: { isLoaded: false, data: { docId: '106' } },
                Geo: {
                    State: { isFilteredListLoaded: false, isLoading: false, filteredListData: [{ key: '26', parentKey: 'IND', value: 'Delhi' }] },
                },
            },
        });

        const fetchList = jest.fn();
        const buttonData = { closeBtn: true, cancelBtn: true, editBtn: true, allotBtn: true, unAllotBtn: true, invoiceBtn: true, deliveryNoteBtn: true, transferOTFBtn: true, changeHistory: true, nextBtn: true, saveBtn: true, formBtnActive: true, cancelOtfBtn: true };

        customRender(
            <Provider store={mockStore}>
                <ListCustomerCreation fetchSalesConsultant={jest.fn()} resetData={jest.fn()} fetchDetail={jest.fn()} setIsFormVisible={jest.fn()} handleButtonClick={jest.fn()} fetchList={fetchList} buttonData={buttonData} setButtonData={jest.fn()} />
            </Provider>
        );
        const uploadBtn = screen.getByRole('button', { name: 'Upload;' });
        fireEvent.click(uploadBtn);

        const cancelBtn = screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancelBtn);
    });

    it('onFinish should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                ConfigurableParameterEditing: { filteredListData: { FILE_DOWNLOAD_TMPLT: [{ key: 'VCLPRCMSTTMPLT' }] } },
                LessorCustomerCreation: { isLoaded: false, data: { docId: '106' } },
                Geo: {
                    State: { isFilteredListLoaded: false, isLoading: false, filteredListData: [{ key: '26', parentKey: 'IND', value: 'Delhi' }] },
                },
            },
        });
        const fetchList = jest.fn();
        const fetchDetailList = jest.fn();
        const saveData = jest.fn();
        const buttonData = { closeBtn: true, cancelBtn: true, editBtn: true, allotBtn: true, unAllotBtn: true, invoiceBtn: true, deliveryNoteBtn: true, transferOTFBtn: true, changeHistory: true, nextBtn: true, saveBtn: true, formBtnActive: true, cancelOtfBtn: true };

        customRender(
            <Provider store={mockStore}>
                <ListCustomerCreation fetchSalesConsultant={jest.fn()} fetchDetail={jest.fn()} fetchDetailList={fetchDetailList} saveData={saveData} setIsFormVisible={jest.fn()} handleButtonClick={jest.fn()} fetchList={fetchList} buttonData={buttonData} setButtonData={jest.fn()} />
            </Provider>
        );

        const save = screen.getByRole('button', { name: 'Save' });
        fireEvent.click(save);

        await waitFor(() => {
            expect(saveData).toHaveBeenCalled();
        });
        saveData.mock.calls[0][0].onSuccess();
        saveData.mock.calls[0][0].onError();
    });
});
