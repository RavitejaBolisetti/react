import '@testing-library/jest-dom/extend-expect';
import { ListCustomerCreation } from '@components/common/LessorCustomerCreation/ListCustomerCreation';
import customRender from '@utils/test-utils';
import { fireEvent, screen, act } from '@testing-library/react';
import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { rootReducer } from 'store/reducers';
import { Provider } from 'react-redux';

export const createMockStore = (initialState) => {
    const mockStore = configureStore({
        reducer: rootReducer,
        preloadedState: initialState,
        middleware: [thunk],
    });
    return mockStore;
};

afterEach(() => {
    jest.restoreAllMocks();
});

const fetchStateLovList = jest.fn();
const fetchViewDocument = jest.fn();
const fetchList = jest.fn();


describe('ListCustomerCreation components', () => {

    it('isStateDataLoaded', () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                Geo: { State: { isStateDataLoaded: false } }
            },
        });

        customRender(

            <Provider store={mockStore}>
                <ListCustomerCreation fetchStateLovList={jest.fn()} />
            </Provider>
        );
    })

    it('should render upload button', () => {
        customRender(<ListCustomerCreation />);

        const uploadBtn = screen.getByRole('button', { name: 'Upload' });
        fireEvent.click(uploadBtn);

        const cancelBtn = screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancelBtn)
    });

    it('should render Save button', async () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                ConfigurableParameterEditing: { filteredListData: { FILE_DOWNLOAD_TMPLT: [{ key: 'VCLPRCMSTTMPLT' }] } },
                LessorCustomerCreation: { isLoaded: false, data: { docId: '1234' } },
                SupportingDocument: { isLoaded: false, data:{ docId: '1234' }  },
                CustomerMaster: {ViewDocument: { isLoaded: false, data: { docId: '1234' } },},
                Geo: {State: { isFilteredListLoaded: false, isLoading: false, filteredListData: { docId: '1234' }  },},
            },
        });

        const saveData = jest.fn();        
        customRender(
            <Provider store={mockStore}>
                <ListCustomerCreation saveData={saveData} fetchList={fetchList} fetchViewDocument={fetchViewDocument} fetchStateLovList={fetchStateLovList} uploadButtonName={'Upload Lessor Form'} />
            </Provider>
        );

        const uploadBtn = screen.getByRole('button', { name: 'Upload' });
        fireEvent.click(uploadBtn);

        const downloadTemplate = screen.getByRole('button', { name: 'Download Template' });
        fireEvent.click(downloadTemplate);

        const uploadLessor = screen.getByRole('button', { name: 'Upload Lessor Form' });
        fireEvent.click(uploadLessor);

        const saveBtn = screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn)
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

        const downloadBtn = screen.getAllByRole('button', { name: 'Download' });
        fireEvent.click(downloadBtn[0]);

        const download = screen.getAllByRole('button', { name: 'Download' });
        fireEvent.click(download[1]);
    });

    it("Download Template", () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                ConfigurableParameterEditing: { filteredListData: { FILE_DOWNLOAD_TMPLT: [{ key: 'VCLPRCMSTTMPLT' }], }, },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <ListCustomerCreation />
            </Provider>
        );
        const uploadBtn = screen.getByRole('button', { name: 'Upload' });
        fireEvent.click(uploadBtn);

        const downloadTemplate = screen.getByRole('button', { name: 'Download Template' });
        fireEvent.click(downloadTemplate);
    })

    it("State Name", () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                ConfigurableParameterEditing: { filteredListData: { FILE_DOWNLOAD_TMPLT: [{ key: 'VCLPRCMSTTMPLT' }] } },
                LessorCustomerCreation: { isLoaded: false, data: { docId: '106' } },
                Geo: {
                    State: { isFilteredListLoaded: false, isLoading: false, filteredListData: [{ key: '26', parentKey: 'IND', value: "Delhi" }] },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <ListCustomerCreation />
            </Provider>
        );

        const downloadBtn = screen.getAllByRole('button', { name: 'Download' });
        fireEvent.click(downloadBtn[0]);

        const stateBox = screen.getByRole('combobox', { name: 'State Name' });
        act(async () => {
            fireEvent.change(stateBox, { target: { value: 'Delhi' } });
            const delhiState = screen.getByText(/Delhi/i);
            fireEvent.click(delhiState);
        });

        const download = screen.getAllByRole('button', { name: 'Download' });
        fireEvent.click(download[1]);
    })
});