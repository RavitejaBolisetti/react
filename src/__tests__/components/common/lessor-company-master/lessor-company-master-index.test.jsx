/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import '@testing-library/jest-dom/extend-expect';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { ListLessorCompanyMaster } from '@components/common/LessorCompanyMaster';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

jest.mock('store/actions/data/lessorCompanyMaster', () => ({
    lessorCompanyMasterDataActions: {},
}));

describe('List Lessor CompanyMaster components', () => {
    it('should render  List Lessor CompanyMaster components', () => {
        customRender(<ListLessorCompanyMaster />);
    });

    it('refresh button should work', async () => {
        const fetchList = jest.fn();

        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                LessorCompanyMaster: {
                    data: {
                        customerLessorCompanyMasterResponses: [{ companyCode: 'HAVELS', companyName: 'HAVELSLTD', id: '106' }],
                    },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <ListLessorCompanyMaster onSuccessAction={jest.fn()} errorAction={jest.fn()} fetchList={fetchList} />
            </Provider>
        );

        await waitFor(() => {
            expect(screen.getByText('HAVELSLTD')).toBeInTheDocument();
        });

        const refreshBtn = screen.getByTestId('refreshBtn');
        fireEvent.click(refreshBtn);

        fetchList.mock.calls[0][0].onSuccessAction();
    });

    it('add and cancel button should work', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                LessorCompanyMaster: {
                    data: {
                        customerLessorCompanyMasterResponses: [{ name: 'test' }],
                    },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <ListLessorCompanyMaster fetchList={jest.fn()} />
            </Provider>
        );
        const addBtn = screen.getByRole('button', { name: 'plus Add' });
        fireEvent.click(addBtn);
        const cancelBtn = screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancelBtn);
    });

    it('form should submitted successfully', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                LessorCompanyMaster: {
                    data: {
                        customerLessorCompanyMasterResponses: [{ name: 'test' }],
                    },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <ListLessorCompanyMaster fetchList={jest.fn()} />
            </Provider>
        );
        const addBtn = screen.getByRole('button', { name: 'plus Add' });
        fireEvent.click(addBtn);
        const companyCode = screen.getByRole('textbox', { name: 'Company Code' });
        fireEvent.change(companyCode, { target: { value: 'Test' } });
        const companyName = screen.getByRole('textbox', { name: 'Company Name' });
        fireEvent.change(companyName, { target: { value: 'Test' } });
        const active = screen.getByText('Active');
        fireEvent.click(active);
        const saveBtn = screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn);
    });

    it('search should work', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                LessorCompanyMaster: {
                    data: {
                        customerLessorCompanyMasterResponses: [{ name: 'test' }],
                    },
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <ListLessorCompanyMaster fetchList={jest.fn()} />
            </Provider>
        );
        const searchBox = screen.getByRole('textbox', { name: 'Lessor Company Name' });
        fireEvent.change(searchBox, { target: { value: 'Hello' } });
        const searchBtn = screen.getByRole('button', { name: 'search' });
        fireEvent.click(searchBtn);
    });

    it('search should work with empty input', () => {
        customRender(<ListLessorCompanyMaster />);
        const searchBox = screen.getByRole('textbox', { name: 'Lessor Company Name' });
        fireEvent.change(searchBox, { target: { value: 'Hello' } });
        fireEvent.change(searchBox, { target: { value: '' } });
        const searchBtn = screen.getByRole('button', { name: 'search' });
        fireEvent.click(searchBtn);
    });
});
