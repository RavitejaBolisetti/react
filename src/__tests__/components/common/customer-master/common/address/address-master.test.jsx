import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { fireEvent, screen } from '@testing-library/react';
import { AddressMaster } from 'components/common/CustomerMaster/Common/Address';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';

const formActionType={ addMode: false } 

const selectedCustomer={ customerId: 106 }

describe('Address Master component', () => {

    it('should render the address master component', () => {
        customRender(<AddressMaster />);
    });

    it('should get address data for individual', () => {

        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                CustomerMaster: {
                    AddressIndividual: {
                        data: {
                            customerAddress: [{id: 106}]
                        }
                    }
                }
            }
        });

        customRender(
            <Provider store={mockStore}>
                <AddressMaster formActionType={formActionType} selectedCustomer={selectedCustomer} customerType={'IND'} />
            </Provider>
        );
    });

    it('should get address data for corporate', () => {

        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                CustomerMaster: {
                    CorporateAddress: {
                        data: {
                            customerAddress: [{id: 106}]
                        }
                    }
                }
            }
        });

        customRender(
            <Provider store={mockStore}>
                <AddressMaster formActionType={formActionType} selectedCustomer={selectedCustomer} customerType={'CRP'} />
            </Provider>
        );
    });

    it('add button should work', () => {
        customRender(<AddressMaster />);
        
        const addBtn=screen.getByRole('button', { name: 'plus Add' });
        fireEvent.click(addBtn);
    });

});

describe('Add Edit Form component', () => {

    it('pincode search option should work', async () => {

        const pincodeData = [
            { id: '1', pinCode: 123456, localityName: 'Konohagakure', cityName: 'Konohagakure', districtName: 'Konohagakure', stateName: 'Konohagakure' },
        ];

        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                Geo: {
                    Pincode: {
                        data: pincodeData
                    }
                }
            }
        });

        customRender(
            <Provider store={mockStore}>
                <AddressMaster setButtonData={jest.fn()} pincodeData={pincodeData} />
            </Provider>
        );

        const addBtn=screen.getByRole('button', { name: 'plus Add' });
        fireEvent.click(addBtn);
        
        const pinCode=screen.getByRole('combobox', { name: 'Pin Code' });
        const searchBtn = screen.getByRole('button', { name: 'search' });

        fireEvent.change(pinCode, { target: { value: '' } });
        fireEvent.click(searchBtn);

        fireEvent.change(pinCode, { target: { value: '12345' } });
        fireEvent.click(searchBtn);

        fireEvent.change(pinCode, { target: { value: '123456' } });
        fireEvent.click(searchBtn);
        
        const pinCodeOption = await screen.findByText(/123456/i);
        
        fireEvent.click(pinCodeOption);

    });

    it('save and cancel button should work', async () => {

        customRender(
                <AddressMaster setButtonData={jest.fn()} />
        );

        const addBtn=screen.getByRole('button', { name: 'plus Add' });
        fireEvent.click(addBtn);

        const saveBtn=screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn);

        const cancelBtn=screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancelBtn);

    });

});

describe('View Address List component', () => {

    it('mark as default checkbox should work', async () => {

        const buttonData={
            saveBtn: true,
            formBtnActive: false
        }

        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                CustomerMaster: {
                    CorporateAddress: {
                        data: {
                            customerAddress: [{id: 1}]
                        }
                    }
                }
            }
        });

        customRender(
            <Provider store={mockStore}>
                <AddressMaster buttonData={buttonData} setButtonData={jest.fn()} />
            </Provider>
        );

        const markAsDefault=screen.getByRole('checkbox', { name: 'Mark As Default'} );
        fireEvent.click(markAsDefault);

        const saveBtn=screen.getByRole('button', { name: 'Save & Next' });
        fireEvent.click(saveBtn);

    });

});