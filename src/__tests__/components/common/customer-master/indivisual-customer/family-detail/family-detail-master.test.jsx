import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { fireEvent, screen, act, waitFor } from '@testing-library/react';
import { FamilyDetailMaster } from 'components/common/CustomerMaster/IndividualCustomer/FamilyDetail/FamilyDetailMaster';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Family Detail Master component', () => {
    it('should render the family detail master component', () => {
        customRender(<FamilyDetailMaster />);
    });

    it('test for all buttons', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                CustomerMaster: {
                    FamilyDetails: { isLoaded: true, data: [{ id: '106', mnmCustomer: 'No', customerId: '106', relationCustomerId: null, customerName: 'Kai', relationship: 'No Relation', relationCode: null, dateOfBirth: '2001-01-01', relationAge: '0', remarks: 'Testing' }] },
                },
            },
        });

        customRender(
            <Provider store={mockStore}>
                <FamilyDetailMaster selectedCustomerId={106} setButtonData={jest.fn()} />
            </Provider>
        );

        const collapseBtn = screen.getAllByRole('img', { name: 'plus' });
        fireEvent.click(collapseBtn[1]);

        const editBtn = screen.getByRole('button', { name: 'Edit' });
        fireEvent.click(editBtn);

        const customerName = screen.getByRole('textbox', { name: 'Customer Name' });
        fireEvent.change(customerName, { target: { value: 'Kai' } });

        const saveBtn = screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn);

        fireEvent.click(editBtn);

        const cancelBtn = screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancelBtn);
    });

    it('test for saving details', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                ConfigurableParameterEditing: { filteredListData: { FAMLY_RELTN: [{ id: '106', key: 'SE', value: 'SELF', parentKey: 'FAMLY_RELTN' }] } },
                CustomerMaster: {
                    FamilyDetails: { isLoaded: true, data: [{ id: '106', mnmCustomer: 'No', customerId: '106', relationCustomerId: null, customerName: 'Kai', relationship: 'No Relation', relationCode: null, dateOfBirth: '2001-01-01', relationAge: '0', remarks: 'Testing' }] },
                },
            },
        });

        customRender(
            <Provider store={mockStore}>
                <FamilyDetailMaster selectedCustomerId={106} setButtonData={jest.fn()} />
            </Provider>
        );

        const addBtn = screen.getByRole('button', { name: 'plus Add' });
        fireEvent.click(addBtn);

        const customerName = screen.getByRole('textbox', { name: 'Customer Name' });
        fireEvent.change(customerName, { target: { value: 'Kai' } });

   

        const relationship = screen.getByRole('combobox', { name: 'Relationship' });
        fireEvent.change(relationship, { target: { value: 'SELF' } });
        await waitFor(() => {
            expect(screen.getAllByText('SELF')[1]).toBeInTheDocument();
        });
        fireEvent.click(screen.getAllByText('SELF')[1]);

        const dateOfBirth = screen.getByRole('textbox', { name: 'Date of Birth' });
        fireEvent.change(dateOfBirth, { target: { value: '01/01/2001' } });

        const age = screen.getByRole('textbox', { name: 'Age' });
        fireEvent.change(age, { target: { value: '22' } });

        const saveBtn = screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn);
    });
});
