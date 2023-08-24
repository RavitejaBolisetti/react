import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { VehicleDetailsMaster } from '@components/Sales/VehicleDetail/VehicleDetails/VehicleDetailsMaster';
import customRender from '@utils/test-utils';
import { Form } from 'antd';
import createMockStore from '__mocks__/store';

afterEach(() => {
    jest.restoreAllMocks();
});



describe('Vehicle details master render', () => {

    it('should render vehicle detals master components', async () => {
        customRender(<VehicleDetailsMaster />)
    })

    it('should render vehicle detals master click minus and plus button', () => {
        const formActionType = { viewMode: true }
        customRender(<VehicleDetailsMaster
            formActionType={formActionType}
            onChange={jest.fn()}
        />)

        const minusBtn = screen.getAllByRole('img');
        fireEvent.click(minusBtn[0]);
        const vehicleDetails = screen.getByText('Vehicle Details');
        fireEvent.click(vehicleDetails);

        fireEvent.click(minusBtn[1]);
        const number = screen.getByText('Registration Number Change Request');
        fireEvent.click(number);
    })

    it('should render vehicle detals master view details button', () => {
        const formActionType = { viewMode: true }
        customRender(<VehicleDetailsMaster
            formActionType={formActionType}
        />)

        const endDate = screen.getByRole('columnheader', { name: 'Manufacturer Warranty End Date', exact: false });
        expect(endDate).toBeTruthy();

        const deliveryDate = screen.getByRole('columnheader', { name: 'Delivery Date', exact: false });
        expect(deliveryDate).toBeTruthy();


        const saleDate = screen.getByRole('columnheader', { name: 'Sale Date', exact: false });
        expect(saleDate).toBeTruthy();

        const soldBy = screen.getByRole('columnheader', { name: 'Sold By', exact: false });
        expect(soldBy).toBeTruthy();

        const odometerReading = screen.getByRole('columnheader', { name: 'Last Odometer Reading', exact: false });
        expect(odometerReading).toBeTruthy();

        const averageRun = screen.getByRole('columnheader', { name: 'Average Run', exact: false });
        expect(averageRun).toBeTruthy();

        const nextDue = screen.getByRole('columnheader', { name: 'Next Due Service', exact: false });
        expect(nextDue).toBeTruthy();

        const manager = screen.getByRole('columnheader', { name: 'Relationship Manager', exact: false });
        expect(manager).toBeTruthy();

        const serviceDueDate = screen.getByRole('columnheader', { name: 'Next Service Due Date', exact: false });
        expect(serviceDueDate).toBeTruthy();

        const expireDate = screen.getByRole('columnheader', { name: 'PUC Expiry Date', exact: false });
        expect(expireDate).toBeTruthy();

        const insuranceExpiryDate = screen.getByRole('columnheader', { name: 'Insurance Expiry Date', exact: false });
        expect(insuranceExpiryDate).toBeTruthy();


        const customerCategory = screen.getByRole('columnheader', { name: 'Customer Category-SSI', exact: false });
        expect(customerCategory).toBeTruthy();


        const customerCategoryCSI = screen.getByRole('columnheader', { name: 'Customer Category-CSI', exact: false });
        expect(customerCategoryCSI).toBeTruthy();

        const customerCategoryIQS = screen.getByRole('columnheader', { name: 'Customer Category-IQS', exact: false });
        expect(customerCategoryIQS).toBeTruthy();

        const oemPriviledgeCustomer = screen.getByRole('columnheader', { name: 'OEM Priviledge Customer', exact: false });
        expect(oemPriviledgeCustomer).toBeTruthy();

        const keyAccountVehicle = screen.getByRole('columnheader', { name: 'Key Account Vehicle', exact: false });
        expect(keyAccountVehicle).toBeTruthy();

        const theftVehicle = screen.getByRole('columnheader', { name: 'Theft Vehicle', exact: false });
        expect(theftVehicle).toBeTruthy();

        const pdiDone = screen.getByRole('columnheader', { name: 'PDI Done', exact: false });
        expect(pdiDone).toBeTruthy();

        const buyBackVehicle = screen.getByRole('columnheader', { name: 'Buy Back Vehicle', exact: false });
        expect(buyBackVehicle).toBeTruthy();

        const governmentVehicle = screen.getByRole('columnheader', { name: 'Government Vehicle', exact: false });
        expect(governmentVehicle).toBeTruthy();

        const taxiNonTaxi = screen.getByRole('columnheader', { name: 'Taxi/Non Taxi', exact: false });
        expect(taxiNonTaxi).toBeTruthy();

        const ctcVehicleMM = screen.getByRole('columnheader', { name: 'M&M CTC Vehicle', exact: false });
        expect(ctcVehicleMM).toBeTruthy();

        const managedBy = screen.getByRole('columnheader', { name: 'Managed By', exact: false });
        expect(managedBy).toBeTruthy();
    })
})