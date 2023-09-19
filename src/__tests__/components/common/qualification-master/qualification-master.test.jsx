/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import { QualificationMaster } from '@components/common/QualificationMaster/QualificationMaster';

const props = {
    isDataLoaded: jest.fn(),
    data: '',
    userId: '',
    filterString: jest.fn(),
    handleButtonClick: jest.fn(),
};
beforeEach(() => {
    jest.clearAllMocks();
});

jest.mock('store/actions/data/qualificationMaster', () => ({
    qualificationDataActions: {},
}));

describe('Qualification Master Test', () => {
    it('should render qualification master page', () => {
        customRender(<QualificationMaster {...props} />);
        const qualificationName = screen.getAllByText('Qualification Name');
        expect(qualificationName).toBeTruthy();
    });
    it('should able to search data', async () => {
        customRender(<QualificationMaster {...props} />);
        const inputBox = screen.getByRole('textbox');
        fireEvent.change(inputBox, { target: { value: 'Dmatest' } });
        expect(inputBox.value.includes('Dmatest'));

        const searchButton = screen.getByRole('button', { name: /search/i });
        fireEvent.click(searchButton);
    });

    it('refresh button should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                QualificationMaster: {
                    isLoaded: true,
                    data: [{ id: '106', qualificationCode: 'QC07', qualificationDescription: null, qualificationName: 'Test', status: 0 }],
                },
            },
        });

        const fetchList = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <QualificationMaster onSuccessAction={jest.fn()} errorAction={jest.fn()} fetchList={fetchList} />
            </Provider>
        );

        await waitFor(() => {
            expect(screen.getByText('Test')).toBeInTheDocument();
        });

        const refreshBtn = screen.getByRole('button', { name: '', exact: false });
        fireEvent.click(refreshBtn);

        fetchList.mock.calls[0][0].onSuccessAction();
    });

    it('cancel button should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                QualificationMaster: {
                    isLoaded: true,
                    data: [{ id: 1, name: 'test', criticalityGroupName: 'Alice' }],
                },
            },
        });

        customRender(
            <Provider store={mockStore}>
                <QualificationMaster onCloseAction={jest.fn()} />
            </Provider>
        );
        const addBtn = screen.getByRole('button', { name: 'plus Add', exact: false });
        fireEvent.click(addBtn);
        const cancelBtn = screen.getByRole('button', { name: 'Cancel', exact: false });
        fireEvent.click(cancelBtn);
    });

    it('should click img', async () => {
        customRender(<QualificationMaster {...props} />);
        const imgSearch = screen.getByRole('img', { name: /search/i });
        fireEvent.click(imgSearch);
    });

    it('should validate search', async () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                QualificationMaster: {
                    isLoaded: true,
                    data: [{ id: 1, name: 'test', criticalityGroupName: 'Alice' }],
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <QualificationMaster onSearchHandle={jest.fn()} handleClearInSearch={jest.fn()} />
            </Provider>
        );
        const inputBox = screen.getByRole('textbox');
        fireEvent.change(inputBox, { target: { value: 'test' } });
        expect(inputBox.value.includes('test')).toBeTruthy();
        const searchButton = screen.getByRole('button', { name: /search/i });

        fireEvent.click(searchButton);

        fireEvent.change(inputBox, { target: { value: '' } });
        expect(inputBox.value.includes('')).toBeTruthy();

        fireEvent.click(searchButton);
    });

    it('save button should work with on finish', async () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                QualificationMaster: {
                    isLoaded: true,
                    data: [{ id: 1, name: 'test', criticalityGroupName: 'Alice' }],
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <QualificationMaster onCloseAction={jest.fn()} onSuccess={jest.fn()} handleFormValueChange={jest.fn()} handleFormFieldChange={jest.fn()} onFinish={jest.fn()} onFinishFailed={jest.fn()} />
            </Provider>
        );
        const addBtn = screen.getByRole('button', { name: 'plus Add', exact: false });
        fireEvent.click(addBtn);
        const criticalityGroupId = screen.getByRole('textbox', { name: 'Qualification Code', exact: false });
        fireEvent.change(criticalityGroupId, { target: { value: '123' } });
        const criticalityGroupName = screen.getByPlaceholderText('Enter name');
        fireEvent.change(criticalityGroupName, { target: { value: 'Test' } });
        const status = screen.getByRole('switch', { name: 'Status', exact: false });
        fireEvent.click(status);
        const saveBtn = screen.getByRole('button', { name: 'Save', exact: false });
        fireEvent.click(saveBtn);
    });

    it('test for onSuccess', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                QualificationMaster: { isLoaded: true, data: [{ id: '106', qualificationCode: 'QC07', qualificationDescription: null, qualificationName: 'QM Test', status: 0 }] },
            },
        });

        const saveData = jest.fn();
        const res = { data: [{ id: '106', status: 0 }] };
        const fetchList = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <QualificationMaster saveData={saveData} fetchList={fetchList} />
            </Provider>
        );

        const editBtn = screen.getByRole('button', { name: 'fa-edit' });
        fireEvent.click(editBtn);

        const status = screen.getByRole('switch', { name: 'Status' });
        fireEvent.click(status);

        const saveBtn = screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn);

        await waitFor(() => expect(saveData).toHaveBeenCalled());
        saveData.mock.calls[0][0].onSuccess(res);
    });
});
