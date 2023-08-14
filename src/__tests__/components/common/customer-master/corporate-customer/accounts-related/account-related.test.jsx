import React from 'react';
import { screen } from '@testing-library/react';
import customRender from '@utils/test-utils';
import { AccountRelatedMaster } from '@components/common/CustomerMaster/CorporateCustomer/AccountRelated/AccountRelatedMaster';

const props = {
    formActionType: { viewMode: true },
    selectedCustomerId: '',
    handleButtonClick: jest.fn(),
    NEXT_ACTION: jest.fn(),
    onCloseAction: jest.fn(),
    saveButtonName: 'Save & Next',
    isLoadingOnSave: 'undefined',
    handleButtonClick: jest.fn(),
    resetData: jest.fn(),
    isLastSection: false,
    isLoading: false,
    isDataLoaded: false,
    saveData: jest.fn(),
    listShowLoading: jest.fn(),
    fetchList: jest.fn(),
    userId: '123',
    section: { enableOnAdd: false, id: 5, title: 'Account Related' },

    accountData: { creditAmount: 34.78, creditDays: 11, customerCreditId: '7ea16b0f-297a-4c82-83be-413d2dcabd79', customerId: 'CUS1687368732514', labourDiscount: 12, outstandingAmount: 21.98, partsDiscount: 10, remarks: 'qqqq', vipDealerInd: true },

    record: { chassisNumber: null, customerId: 'CUS1687368732514', customerName: 'Company1', customerType: 'CRP', customerTypeName: 'CORPORATE', dateOfBirth: null, emailId: 'abhishek@gm.co', membershipType: 'SL', membershipTypeName: 'Silver', mobileNumber: '9778675564', profilePicDocId: null, registrationNumber: null },
};
const buttonData = { cancelBtn: true, closeBtn: true, editBtn: true, formBtnActive: false, nextBtn: true, saveAndNewBtn: false, saveAndNewBtnClicked: false, saveBtn: false };
describe('AccountRelated Master  Component', () => {
    it('should render AccountRelated Master ', async () => {
        customRender(<AccountRelatedMaster {...props} {...buttonData} />);
    });

    it('should render Label Text', async () => {
        customRender(<AccountRelatedMaster {...props} {...buttonData} />);

        const renderText = screen.getByText('Account Related');
        expect(renderText).toBeTruthy();

        const creditText = screen.getByText('Credit Limit');
        expect(creditText).toBeTruthy();

        const limitDays = screen.getByText('Credit Limit Days');
        expect(limitDays).toBeTruthy();

        const outstandingText = screen.getByText('Outstanding Amount');
        expect(outstandingText).toBeTruthy();

        const partDiscount = screen.getByText('Parts Discount');
        expect(partDiscount).toBeTruthy();

        const labourDiscount = screen.getByText('Labour Discount');
        expect(labourDiscount).toBeTruthy();

        const remarks = screen.getByText('Remarks');
        expect(remarks).toBeTruthy();
    });
});
