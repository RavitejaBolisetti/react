/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import customRender from '@utils/test-utils';
import createMockStore from '__mocks__/store';
import { screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { CriticalityGroup } from '@components/common/CriticalityGroup/CriticalityGroup';
afterEach(() => {
    jest.restoreAllMocks();
});
describe('CriticalityGroup Components', () => {
    it('should render CriticalityGroup components', () => {
        customRender(<CriticalityGroup />);
    });
    it('should render page', () => {
        customRender(<CriticalityGroup />);
        expect(screen.getAllByText(/Criticality Group List/i)).toBeTruthy();
    });
    it('should able to search data', async () => {
        customRender(<CriticalityGroup />);
        const inputBox = screen.getByRole('textbox');
        fireEvent.change(inputBox, { target: { value: 'Dmatest' } });
        expect(inputBox.value.includes('Dmatest'));
        act(async () => {
            const searchButton = screen.getByRole('button', { name: /search/i });
            fireEvent.click(searchButton);
        });
    });

    it('refresh button should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
        });
        customRender(
            <Provider store={mockStore}>
                <CriticalityGroup onSuccessAction={jest.fn()} errorAction={jest.fn()} />
            </Provider>
        );
        const refreshBtn = screen.getByRole('button', { name: '', exact: false });
        fireEvent.click(refreshBtn);
    });

    it('cancel button should work', async () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
        });
        customRender(
            <Provider store={mockStore}>
                <CriticalityGroup onCloseAction={jest.fn()} />
            </Provider>
        );
        const addBtn = screen.getByRole('button', { name: 'plus Add', exact: false });
        fireEvent.click(addBtn);
        const cancelBtn = screen.getByRole('button', { name: 'Cancel', exact: false });
        fireEvent.click(cancelBtn);
    });

    it('save button should work with on finish', async () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
        });
        customRender(
            <Provider store={mockStore}>
                <CriticalityGroup onCloseAction={jest.fn()} onSuccess={jest.fn()} handleFormValueChange={jest.fn()} handleFormFieldChange={jest.fn()} onFinish={jest.fn()} onFinishFailed={jest.fn()} />
            </Provider>
        );
        const addBtn = screen.getByRole('button', { name: 'plus Add', exact: false });
        fireEvent.click(addBtn);
        const criticalityGroupId = screen.getByRole('textbox', { name: 'Criticality Group Id', exact: false });
        fireEvent.change(criticalityGroupId, { target: { value: '123' } });
        const criticalityGroupName = screen.getByRole('textbox', { name: 'Criticality Group Name', exact: false });
        fireEvent.change(criticalityGroupName, { target: { value: 'Test' } });
        const defaultGroup = screen.getByRole('switch', { name: 'Default Group', exact: false });
        fireEvent.click(defaultGroup);
        const status = screen.getByRole('switch', { name: 'Status', exact: false });
        fireEvent.click(status);
        const saveBtn = screen.getByRole('button', { name: 'Save', exact: false });
        fireEvent.click(saveBtn);
    });

    it('should validate fields on finish failed', async () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
        });
        customRender(
            <Provider store={mockStore}>
                <CriticalityGroup onCloseAction={jest.fn()} onSuccess={jest.fn()} handleFormValueChange={jest.fn()} handleFormFieldChange={jest.fn()} onFinish={jest.fn()} onFinishFailed={jest.fn()} />
            </Provider>
        );
        const addBtn = screen.getByRole('button', { name: 'plus Add', exact: false });
        fireEvent.click(addBtn);
        const criticalityGroupId = screen.getByRole('textbox', { name: 'Criticality Group Id', exact: false });
        fireEvent.change(criticalityGroupId, { target: { value: '123' } });

        const defaultGroup = screen.getByRole('switch', { name: 'Default Group', exact: false });
        fireEvent.click(defaultGroup);
        const status = screen.getByRole('switch', { name: 'Status', exact: false });
        fireEvent.click(status);
        const saveBtn = screen.getByRole('button', { name: 'Save', exact: false });
        fireEvent.click(saveBtn);
    });

    it('should validate search', async () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                CriticalityGroup: {
                    isLoaded: true,
                    data: [{ id: 1, name: 'test', criticalityGroupName: 'Alice' }],
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <CriticalityGroup onSearchHandle={jest.fn()} handleClearInSearch={jest.fn()} />
            </Provider>
        );
        const inputBox = screen.getByRole('textbox');
        fireEvent.change(inputBox, { target: { value: 'test' } });
        expect(inputBox.value.includes('test')).toBeTruthy();
        const searchButton = screen.getByRole('button', { name: /search/i });
        act(() => {
            fireEvent.click(searchButton);
        });
        fireEvent.change(inputBox, { target: { value: '' } });
        expect(inputBox.value.includes('')).toBeTruthy();
        act(() => {
            fireEvent.click(searchButton);
        });
    });
});
