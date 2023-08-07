import React from 'react';
import { Form } from 'antd';
import { fireEvent, screen } from '@testing-library/react';
import { InsuranceDetailsMaster } from '@components/Sales/OTF/InsuranceDetails/InsuranceDetailsMaster';
import customRender from '@utils/test-utils';

const props = {
    insuranceData: [],
    onCloseAction: jest.fn(),
    fetchList: jest.fn(),
    formActionType: { viewMode: true },
    isDataLoaded: true,
    listShowLoading: jest.fn(),
    showGlobalNotification: jest.fn(),
    handleFormValueChange: jest.fn(),
    section: { displayOnList: true, id: 5, title: 'Insurance Details' },
    isLoading: false,
    NEXT_ACTION: jest.fn(),
    handleButtonClick: jest.fn(),
    onFinishFailed: jest.fn(),
    onErrorAction: jest.fn(),
};

describe('OTF Finance Details Component render', () => {
    it('should render addedit form', async () => {
        customRender(<InsuranceDetailsMaster {...props} />);
        screen.debug();
    });

    it('should render all fields', () => {
        customRender(<InsuranceDetailsMaster {...props} />);

        const insuranceDetails = screen.getByText('Insurance Details');
        expect(insuranceDetails).toBeTruthy();

        const bookedScreen = screen.getByText('Booked');
        expect(bookedScreen).toBeTruthy();

        const allotedScreen = screen.getByText('Allotted');
        expect(allotedScreen).toBeTruthy();

        const invoiced = screen.getByText('Invoiced');
        expect(invoiced).toBeTruthy();

        const delivered = screen.getByText('Delivered');
        expect(delivered).toBeTruthy();

        const insuranceCompany = screen.getByText('Insurance Company');
        expect(insuranceCompany).toBeTruthy();

        const coverNote = screen.getByText('Insurance Cover Note');
        expect(coverNote).toBeTruthy();

        const insuranceAmt = screen.getByText('Insurance Amount');
        expect(insuranceAmt).toBeTruthy();

        const date = screen.getByText('Date');
        expect(date).toBeTruthy();

        const registrationNo = screen.getByText('Registration Number');
        expect(registrationNo).toBeTruthy();

        const nextBtn = screen.getByRole('button', { name: 'Next' });
        fireEvent.click(nextBtn);
        expect(nextBtn).toBeTruthy();
    });

    it('should render when view mode is false', async () => {
        const prop2 = { formActionType: { viewMode: false }, insuranceData: [], onCloseAction: jest.fn(), fetchList: jest.fn(), isDataLoaded: true, listShowLoading: jest.fn(), showGlobalNotification: jest.fn(), handleFormValueChange: jest.fn(), section: { displayOnList: true, id: 5, title: 'Insurance Details' }, isLoading: false, NEXT_ACTION: jest.fn(), handleButtonClick: jest.fn(), onFinishFailed: jest.fn(), onErrorAction: jest.fn() };
        customRender(<InsuranceDetailsMaster setFormData={jest.fn} {...prop2} />);
    });
});
