
import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { Provider } from 'react-redux';
import { fireEvent, screen, act, logRoles } from '@testing-library/react';
import { CustomerMaster } from 'components/common/CustomerMaster/CustomerMaster';
import createMockStore from '__mocks__/store';

afterEach(() => {
    jest.restoreAllMocks();
});

jest.mock('components/common/CustomerMaster/LeftSidebar', () => {
    return {
        __esModule: true,
        LeftSidebar: () => null,
    }
});

describe('Customer Master component', () => {

    it('should render the customer master component', () => {
        customRender(<CustomerMaster />);
    });

    it('should render component with data', () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                ConfigurableParameterEditing: {
                    filteredListData: {
                        CUST_MST: [{"id":"1","key":"chassisNumber","value":"Chassis Number","parentKey":"CUST_MST"},{"id":"2","key":"registrationNumber","value":"Registration Number","parentKey":"CUST_MST"},{"id":"3","key":"viNumber","value":"VIN ","parentKey":"CUST_MST"},{"id":"4","key":"customerName","value":"Customer name","parentKey":"CUST_MST"},{"id":"5","key":"mobileNumber","value":"Mobile Number","parentKey":"CUST_MST"},{"id":"6","key":"customerId","value":"Customer ID","parentKey":"CUST_MST"}]
                    }
                }
            },
            customer: {
                customerDetail: {
                    filter: {
                        searchType: {
                            value: 'search'
                        }, 
                        searchParam: 'search'
                    }
                }
            }
        });

        customRender(
        <Provider store={mockStore}>
            <CustomerMaster />
        </Provider>
        );

    });

    it('individual and corporate toggle button should work', () => {

        customRender(<CustomerMaster /> );

        const individualBtn=screen.getByRole('button', { name: 'Individual' });
        fireEvent.click(individualBtn);

        const corporateBtn=screen.getByRole('button', { name: 'Corporate' });
        fireEvent.click(corporateBtn);

    });

    it('add button should work', () => {

        customRender(<CustomerMaster /> );

        const addBtn=screen.getByRole('button', { name: 'plus Add' });
        fireEvent.click(addBtn);

    });

    it('search should work', () => {
        const mockStore = createMockStore({
            auth: { userId: 123 },
            data: {
                ConfigurableParameterEditing: {
                    filteredListData: {
                        CUST_MST: [{"id":"1","key":"chassisNumber","value":"Chassis Number","parentKey":"CUST_MST"},{"id":"2","key":"registrationNumber","value":"Registration Number","parentKey":"CUST_MST"},{"id":"3","key":"viNumber","value":"VIN ","parentKey":"CUST_MST"},{"id":"4","key":"customerName","value":"Customer name","parentKey":"CUST_MST"},{"id":"5","key":"mobileNumber","value":"Mobile Number","parentKey":"CUST_MST"},{"id":"6","key":"customerId","value":"Customer ID","parentKey":"CUST_MST"}]
                    }
                }
            },
            customer: {
                customerDetail: {
                    filter: {"searchType":"customerName","searchParam":"Hello World","advanceFilter":true}
                }
            }
        });

        customRender(
        <Provider store={mockStore}>
            <CustomerMaster setFilterString={jest.fn()} />
        </Provider>
        );

        const selectParameter=screen.getByRole('combobox', { name: '' });
        fireEvent.change(selectParameter, { target: { value: 'Customer name' }});

        const customerName=screen.getByText('Customer name');
        fireEvent.click(customerName);
        
        const searchBox=screen.getByRole('textbox', { name: '' });
        fireEvent.change(searchBox, { target: { value: 'Hello World' } });

        const searchBtn=screen.getByRole('button', { name: 'search' });
        fireEvent.click(searchBtn);

        const clearBtn=screen.getByRole('button', { name: 'close-circle' });
        fireEvent.click(clearBtn);
    });
    
});
