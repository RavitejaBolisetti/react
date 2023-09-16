import React from 'react';
import { screen, fireEvent, logRoles } from '@testing-library/react';
import { Provider } from 'react-redux';
import { VehicleDetailsMaster } from '@components/Sales/OTF/VehicleDetails/VehicleDetailsMaster';
import customRender from '@utils/test-utils';
import { Form } from 'antd';
import createMockStore from '__mocks__/store';

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    return <VehicleDetailsMaster form={form} {...props} />;
};

const buttonData = {
    closeBtn: true,
    cancelBtn: true,
    editBtn: true,
    allotBtn: true,
    unAllotBtn: true,
    invoiceBtn: true,
    deliveryNoteBtn: true,
    transferOTFBtn: true,
    cancelOTFBtn: true,
    changeHistory: true,
    nextBtn: true,
    saveBtn: true,
    formBtnActive: true,
};

describe('OtfMaster component render', () => {
    it('test 1', async () => {
        const mockStore = createMockStore({
            auth: { userId: 106 },
            data: {
                OTF: {
                    VehicleDetails: {
                        data: [{ name: '1' }, { name: '2' }],
                        isLoaded: true,
                    },
                    VehicleDetailsLov: {
                        filteredListData: [{ name: '1' }, { name: '2' }],
                        isFilteredListLoaded: true,
                    },
                },
                ProductHierarchy: {
                    filteredListData: [{ name: '1' }, { name: '2' }],
                    isFilteredListLoaded: true,
                },
            },
        });
        customRender(
            <Provider store={mockStore}>
                <FormWrapper typeData={'VEHCL_TYPE'} selectedOrderId={'hello'} onChange={jest.fn()} />
            </Provider>
        );

        const plusAdd = screen.getByRole('button', { name: 'plus Add', exact: false });
        fireEvent.click(plusAdd);

        const saveBtn = screen.getByRole('button', { name: 'Save', exact: false });
        fireEvent.click(saveBtn);

        const cancelBtn = screen.getByRole('button', { name: 'Cancel', exact: false });
        fireEvent.click(cancelBtn);

        const rowgroup = screen.getAllByRole('rowgroup', { name: '', exact: false });
        expect(rowgroup).toBeTruthy();

        const rateAmt = screen.getByRole('row', { name: 'Srl. Service Name Amount', exact: false });
        expect(rateAmt).toBeTruthy();

        const noData = screen.getByRole('row', { name: 'No data', exact: false });
        expect(noData).toBeTruthy();

        const srlNo = screen.getByRole('columnheader', { name: 'Srl.', exact: false });
        expect(srlNo).toBeTruthy();

        const Amt = screen.getByRole('columnheader', { name: 'Amount', exact: false });
        expect(Amt).toBeTruthy();
    });

    it('all buttons should work', async () => {
        customRender(<FormWrapper handleButtonClick={jest.fn()} setButtonData={jest.fn()} buttonData={buttonData} typeData={'VEHCL_TYPE'} />);
        const closeBtn = screen.getByRole('button', { name: 'Close' });
        fireEvent.click(closeBtn);
        const cancelBtn = screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(cancelBtn);
        const editBtn = screen.getByRole('button', { name: 'Edit' });
        fireEvent.click(editBtn);
        const allotBtn = screen.getByRole('button', { name: 'Allot' });
        fireEvent.click(allotBtn);
        const unAllotBtn = screen.getByRole('button', { name: 'Un-Allot' });
        fireEvent.click(unAllotBtn);
        const invoiceBtn = screen.getByRole('button', { name: 'Invoice' });
        fireEvent.click(invoiceBtn);
        const deliveryNoteBtn = screen.getByRole('button', { name: 'Delivery Note' });
        fireEvent.click(deliveryNoteBtn);
        const transferOTFBtn = screen.getByRole('button', { name: 'Transfer Booking' });
        fireEvent.click(transferOTFBtn);
        const cancelOTFBtn = screen.getByRole('button', { name: 'Cancel Booking' });
        fireEvent.click(cancelOTFBtn);
        const changeHistory = screen.getByRole('button', { name: 'Change History' });
        fireEvent.click(changeHistory);
        const nextBtn = screen.getByRole('button', { name: 'Next' });
        fireEvent.click(nextBtn);
        const saveBtn = screen.getByRole('button', { name: 'Save & Next' });
        fireEvent.click(saveBtn);
    });
});
