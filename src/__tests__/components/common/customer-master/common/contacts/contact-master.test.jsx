import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { fireEvent, screen } from '@testing-library/react';
import { IndividualContact } from 'components/common/CustomerMaster/Common/Contacts/ContactMaster';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';

const selectedCustomer={
    customerId: 106
};

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Contact Master component', () => {

    it('should render the contact master component', () => {
        customRender(<IndividualContact />);
    });

    it('should get individual contact data', () => {

        const mockStore = createMockStore({
            auth: { userId: 106 },
            customer: {
                customerContactsIndividual: {
                    data: {
                        customerContact: true
                    },
                }
            }
        });

        customRender(
            <Provider store={mockStore}>
                <IndividualContact selectedCustomer={selectedCustomer} customerType={'IND'} />
            </Provider>
        );

    });

    it('should get corporate contact data', () => {

        const mockStore = createMockStore({
            auth: { userId: 106 },
            customer: {
                customerContacts: {
                    data: {
                        customerContact: true
                    }
                }
            }
        });

        customRender(
            <Provider store={mockStore}>
                <IndividualContact selectedCustomer={selectedCustomer} customerType={'CRP'} />
            </Provider>
        );
    });

    it('save button should work', () => {
        const buttonData={
            saveBtn: true,
            formBtnActive: false
        }
        customRender(<IndividualContact buttonData={buttonData} />);

        const saveBtn=screen.getByRole('button', { name: 'Save & Next' });
        fireEvent.click(saveBtn);
    });

});

describe('Add Edit Form component', () => {

    it('mobile number should validate, save and cancel should work', async () => {

        customRender( <IndividualContact setButtonData={jest.fn()} /> );

        const addBtn=screen.getByRole('button', { name: 'plus Add' });
        fireEvent.click(addBtn);

        const mobileNumber=screen.getByRole('textbox', { name: 'Mobile Number' });
        fireEvent.change(mobileNumber, { target: { value: '9999999999' } })

        const saveBtn=screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn);

        const cancelBtn=screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancelBtn);

    });

});

describe('View Contact List component', () => {

    it('collapse, mark as default checkbox and edit button should work', async () => {

        const mockStore = createMockStore({
            auth: { userId: 106 },
            customer: {
                customerContacts: {
                    data: {
                        customerContact: [{id:1}]
                    },
                    isLoading: false
                }
            }
        });

        customRender(
            <Provider store={mockStore}>
                <IndividualContact selectedCustomer={selectedCustomer} setButtonData={jest.fn()}  />
            </Provider>
        );

        const collapseBtn=screen.getAllByRole('img', { name: 'plus' });
        fireEvent.click(collapseBtn[1]);

        const markAsDefault=screen.getByRole('checkbox', { name: 'Mark As Default'} );
        fireEvent.click(markAsDefault);

        const editBtn=screen.getByRole('button', { name: 'Edit' });
        fireEvent.click(editBtn);

    });

});