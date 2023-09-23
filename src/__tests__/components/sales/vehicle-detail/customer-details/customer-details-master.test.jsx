import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import createMockStore from '__mocks__/store';
import { Provider } from 'react-redux';
import { CustomerDetailsMaster } from '@components/Sales/VehicleDetail/CustomerDetails/CustomerDetailsMaster';
import customRender from '@utils/test-utils';

describe('Customer Details Master', () => {
    it('should render customer details master components', () => {
        customRender(<CustomerDetailsMaster />)
    });

    it('save & next button should work', () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                OTF: {
                    Referrals: { filter: {searchType: 'Test', searchParam: 'Test'} },
                },
            },
        });

        const buttonData={saveBtn: true, formBtnActive: true};

        customRender(
            <Provider store={mockStore}>
                <CustomerDetailsMaster selectedRecordId={'Test'} buttonData={buttonData} setButtonData={jest.fn()} />
            </Provider>
        );
        const saveBtn = screen.getByRole('button', { name: 'Save & Next' });
        fireEvent.click(saveBtn);
    });

    it('collapse buttons of add edit form should work', () => {
        customRender(<CustomerDetailsMaster />);
        const collapseItems=screen.getAllByText('Edit');

        const collapseOwnerDetails=collapseItems[0];
        fireEvent.click(collapseOwnerDetails);

        const collapseBillingCustomerDetails=collapseItems[1];
        fireEvent.click(collapseBillingCustomerDetails);

        const collapseKeyAccountDetails=collapseItems[2];
        fireEvent.click(collapseKeyAccountDetails);

        const collapseLoyaltyDetails=collapseItems[3];
        fireEvent.click(collapseLoyaltyDetails);

        const collapseOwnershipChange=collapseItems[4];
        fireEvent.click(collapseOwnershipChange);
    });

    it('collapse buttons of view detail should work', () => {
        const formActionType={viewMode: true};
        customRender(<CustomerDetailsMaster formActionType={formActionType} />);

        const collapseItems=screen.getAllByRole('img', { name: 'plus' });

        const collapseOwnerDetails=collapseItems[0];
        fireEvent.click(collapseOwnerDetails);

        const collapseBillingCustomerDetails=collapseItems[1];
        fireEvent.click(collapseBillingCustomerDetails);

        const collapseKeyAccountDetails=collapseItems[2];
        fireEvent.click(collapseKeyAccountDetails);

        const collapseLoyaltyDetails=collapseItems[3];
        fireEvent.click(collapseLoyaltyDetails);

        const collapseOwnershipChange=collapseItems[4];
        fireEvent.click(collapseOwnershipChange);

        const collapseItemsMinus=screen.getAllByRole('img', { name: 'minus' });
        fireEvent.click(collapseItemsMinus[0]);

        fireEvent.click(collapseOwnerDetails);
    });

    it('same as owner checkbox should work', () => {
        customRender(<CustomerDetailsMaster setButtonData={jest.fn()} />);
        const collapseItems=screen.getAllByText('Edit');

        const collapseBillingCustomerDetails=collapseItems[1];
        fireEvent.click(collapseBillingCustomerDetails);

        const sameAsOwner=screen.getByRole('checkbox', { name: 'Same As Owner' });
        fireEvent.click(sameAsOwner);
        fireEvent.click(sameAsOwner);
    });


});