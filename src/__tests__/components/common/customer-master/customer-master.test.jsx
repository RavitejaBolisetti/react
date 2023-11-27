import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { Provider } from 'react-redux';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { CustomerMaster } from 'components/common/CustomerMaster/CustomerMaster';
// eslint-disable-next-line jest/no-mocks-import
import createMockStore from '__mocks__/store';

afterEach(() => {
    jest.restoreAllMocks();
});

jest.mock('store/actions/customer/customerDetail', () => ({
    customerDetailDataActions: {},
}));

jest.mock('components/common/CustomerMaster/LeftSidebar', () => {
    return {
        __esModule: true,
        LeftSidebar: () => null,
    };
});

describe('Customer Master component', () => {
    it('should render the customer master component', () => {
        customRender(<CustomerMaster fetchList={jest.fn()} resetData={jest.fn()} setFilterString={jest.fn()} />);
    });

    it('individual and corporate toggle button should work', () => {
        customRender(<CustomerMaster fetchList={jest.fn()} resetData={jest.fn()} setFilterString={jest.fn()} />);

        const individualBtn = screen.getByRole('button', { name: 'Individual' });
        fireEvent.click(individualBtn);

        const corporateBtn = screen.getByRole('button', { name: 'Corporate' });
        fireEvent.click(corporateBtn);
    });

    it('add button should work', () => {
        customRender(<CustomerMaster fetchList={jest.fn()} resetData={jest.fn()} setFilterString={jest.fn()} />);

        const addBtn = screen.getByRole('button', { name: 'plus Add' });
        fireEvent.click(addBtn);
    });

    it('search should work with clear button', async () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                ConfigurableParameterEditing: {
                    filteredListData: {
                        CUST_MST: [{ id: 106, key: 'customerName', value: 'Customer name', parentKey: 'CUST_MST' }],
                    },
                },
            },
            customer: {
                customerDetail: { filter: { searchType: 'customerName', searchParam: 'customerName' } },
            },
        });

        customRender(
            <Provider store={mockStore}>
                <CustomerMaster setFilterString={jest.fn()} resetData={jest.fn()} fetchList={jest.fn()} />
            </Provider>
        );

        const selectParameter = screen.getByRole('combobox', { name: '' });
        fireEvent.change(selectParameter, { target: { value: 'Customer name' } });

        await waitFor(() => {
            expect(screen.getAllByText('Customer name')[1]).toBeInTheDocument();
        });

        const customerName = screen.getAllByText('Customer name')[1];
        fireEvent.click(customerName);

        const searchBox = screen.getByRole('textbox', { name: '' });
        fireEvent.change(searchBox, { target: { value: 'Kai' } });

        const searchBtn = screen.getByRole('button', { name: 'search' });
        fireEvent.click(searchBtn);

        await waitFor(() => {
            expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument();
        });

        const clearBtn = screen.getByRole('button', { name: 'Clear' });
        fireEvent.click(clearBtn);
    });

    it('search should work with remove filter', async () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                ConfigurableParameterEditing: {
                    filteredListData: {
                        CUST_MST: [{ id: 106, key: 'customerName', value: 'Customer name', parentKey: 'CUST_MST' }],
                    },
                },
            },
            customer: {
                customerDetail: { filter: { searchType: 'customerName', searchParam: 'customerName' } },
            },
        });

        customRender(
            <Provider store={mockStore}>
                <CustomerMaster setFilterString={jest.fn()} resetData={jest.fn()} fetchList={jest.fn()} />
            </Provider>
        );

        const selectParameter = screen.getByRole('combobox', { name: '' });
        fireEvent.change(selectParameter, { target: { value: 'Customer name' } });

        await waitFor(() => {
            expect(screen.getAllByText('Customer name')[1]).toBeInTheDocument();
        });

        const customerName = screen.getAllByText('Customer name');
        fireEvent.click(customerName[1]);

        const searchBox = screen.getByRole('textbox', { name: '' });
        fireEvent.change(searchBox, { target: { value: 'Kai' } });

        const searchBtn = screen.getByRole('button', { name: 'search' });
        fireEvent.click(searchBtn);

        await waitFor(() => {
            expect(screen.getByTestId('removeFilter')).toBeInTheDocument();
        });

        const removeFilter = screen.getByTestId('removeFilter');
        fireEvent.click(removeFilter);
    });

    it('search should work with close button', async () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                ConfigurableParameterEditing: {
                    filteredListData: {
                        CUST_MST: [{ id: 106, key: 'customerName', value: 'Customer name', parentKey: 'CUST_MST' }],
                    },
                },
            },
        });

        customRender(
            <Provider store={mockStore}>
                <CustomerMaster setFilterString={jest.fn()} resetData={jest.fn()} fetchList={jest.fn()} />
            </Provider>
        );

        const selectParameter = screen.getByRole('combobox', { name: '' });
        fireEvent.change(selectParameter, { target: { value: 'Customer name' } });

        await waitFor(() => {
            expect(screen.getAllByText('Customer name')[1]).toBeInTheDocument();
        });

        const customerName = screen.getAllByText('Customer name');
        fireEvent.click(customerName);

        const searchBox = screen.getByRole('textbox', { name: '' });
        fireEvent.change(searchBox, { target: { value: 'Kai' } });

        const searchBtn = screen.getByRole('button', { name: 'search' });
        fireEvent.click(searchBtn);

        const closeBtn = screen.getByRole('button', { name: 'close-circle' });
        fireEvent.click(closeBtn);
    });

    it('test1', async () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
            customer: {
                customerDetail: { isLoaded: true, data: { totalRecords: 1, customerMasterDetails: [{ customerId: 106, customerName: 'Kai', customerTypeName: 'Regular', mobileNumber: '106', emailId: 'kai@example.com' }] } },
            },
        });

        const fetchList = jest.fn();

        customRender(
            <Provider store={mockStore}>
                <CustomerMaster setFilterString={jest.fn()} resetData={jest.fn()} fetchList={fetchList} />
            </Provider>
        );

        fetchList.mock.calls[0][0].onSuccessAction();
        fetchList.mock.calls[0][0].onErrorAction();

        await waitFor(() => {
            expect(screen.getByText('Kai')).toBeInTheDocument();
        });

        const editBtn = screen.getByTestId('edit');
        fireEvent.click(editBtn);

        const cancelBtn = screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancelBtn);

        const viewBtn = screen.getByTestId('view');
        fireEvent.click(viewBtn);
    });
});
