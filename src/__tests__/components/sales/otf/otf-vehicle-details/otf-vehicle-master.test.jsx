import React from 'react';
import { screen, fireEvent, logRoles } from '@testing-library/react';
import { Provider } from 'react-redux';
import { VehicleDetailsMaster } from '@components/Sales/OTF/VehicleDetails/VehicleDetailsMaster';
import customRender from '@utils/test-utils';
import { Button, Form } from 'antd';
import createMockStore from '__mocks__/store';

const FormWrapper = (props) => {
    const [form] = Form.useForm();
    return <VehicleDetailsMaster form={form} {...props} />;
};

const StatusBar = () => <div>No Status Bar</div>;

const FormActionButton = () => (
    <div>
        <Button htmlType="submit" type="primary">
            Save
        </Button>
    </div>
);

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
                <FormWrapper typeData={'VEHCL_TYPE'} selectedOrderId={'hello'} onChange={jest.fn()} StatusBar={StatusBar} FormActionButton={FormActionButton} />
            </Provider>
        );

        const plusAdd = screen.getByRole('button', { name: 'plus Add', exact: false });
        fireEvent.click(plusAdd);

        const saveBtn = screen.getAllByRole('button', { name: 'Save', exact: false });
        fireEvent.click(saveBtn[0]);

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
});
