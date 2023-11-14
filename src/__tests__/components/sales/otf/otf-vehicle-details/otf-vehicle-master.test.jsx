/* eslint-disable jest/no-mocks-import */
import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { VehicleDetailsMaster } from '@components/Sales/Common/VehicleDetails/VehicleDetailsMaster';
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

        const formActionType = { viewMode: false };
        customRender(
            <Provider store={mockStore}>
                <FormWrapper typeData={'VEHCL_TYPE'} formActionType={formActionType} selectedOrderId={'hello'} onChange={jest.fn()} StatusBar={StatusBar} FormActionButton={FormActionButton} setButtonData={jest.fn()} handleFormValueChange={jest.fn()} />
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

        const rateAmt = screen.getByRole('row', { name: 'Srl. Service Name Amount Action', exact: false });
        expect(rateAmt).toBeTruthy();

        const noData = screen.getByRole('row', { name: 'No data', exact: false });
        expect(noData).toBeTruthy();

        const srlNo = screen.getByRole('columnheader', { name: 'Srl.', exact: false });
        expect(srlNo).toBeTruthy();

        const Amt = screen.getByRole('columnheader', { name: 'Amount', exact: false });
        expect(Amt).toBeTruthy();
    });
});
