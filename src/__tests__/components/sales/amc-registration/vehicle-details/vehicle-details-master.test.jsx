import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import VehicleDetailsMaster from '@components/Sales/AMCRegistration/VehicleDetails/VehicleDetailsMaster';
import { screen, fireEvent } from '@testing-library/react';
import { Button } from 'antd';

afterEach(() => {
    jest.restoreAllMocks();
});

const FormActionButton = () => (
    <div>
        <Button htmlType="submit" type="primary">
            Save
        </Button>
    </div>
);

describe('Vehicle Details Master Components', () => {
    it('Should render Vehicle Details Master basic render', () => {
        customRender(<VehicleDetailsMaster FormActionButton={FormActionButton} setRequestPayload={jest.fn()} />);
    });

    it('Should render Vehicle Details Master view render', () => {
        const formActionType = { viewMode: true };
        customRender(<VehicleDetailsMaster formActionType={formActionType} FormActionButton={FormActionButton} setRequestPayload={jest.fn()} />);
    });

    it('Should render Vehicle Details Master add true render', () => {
        const fetchVehicleData = jest.fn();

        customRender(<VehicleDetailsMaster setLastSection={jest.fn()} fetchVehicleData={fetchVehicleData} setButtonData={jest.fn()} isLoaded={false} FormActionButton={FormActionButton} setRequestPayload={jest.fn()} />);

        const add = screen.getByRole('button', { name: 'plus Add' });
        fireEvent.click(add);

        const vin = screen.getByRole('textbox', { name: 'VIN' });
        fireEvent.change(vin, { target: { value: 'testing' } });

        // const searchBtn = screen.getByRole('button', { name: 'search' });
        // fireEvent.click(searchBtn);

        const vehicleRegistrationNumber = screen.getByRole('textbox', { name: 'Vehicle Registration Number' });
        fireEvent.change(vehicleRegistrationNumber, { target: { value: 'testing' } });

        const orgWarrantyStartDate = screen.getByRole('textbox', { name: 'Org. Warranty Start Date' });
        fireEvent.change(orgWarrantyStartDate, { target: { value: 'testing' } });

        const modelGroup = screen.getByRole('textbox', { name: 'Model Group' });
        fireEvent.change(modelGroup, { target: { value: 'testing' } });

        const modelFamily = screen.getByRole('textbox', { name: 'Model Family' });
        fireEvent.change(modelFamily, { target: { value: 'testing' } });

        const modelDescription = screen.getByRole('textbox', { name: 'Model Description' });
        fireEvent.change(modelDescription, { target: { value: 'testing' } });

        const saveBtn = screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn);
    });

    it('Should render Vehicle Details Master cancel render', () => {
        const fetchVehicleData = jest.fn();

        customRender(<VehicleDetailsMaster setLastSection={jest.fn()} fetchVehicleData={fetchVehicleData} setButtonData={jest.fn()} isLoaded={false} FormActionButton={FormActionButton} setRequestPayload={jest.fn()} />);

        const add = screen.getByRole('button', { name: 'plus Add' });
        fireEvent.click(add);

        const saveBtn = screen.getByRole('button', { name: 'Cancel' });
        fireEvent.click(saveBtn);
    });

    it('Should render Vehicle Details Master add search render', () => {
        const formActionType = { addMode: true };
        const fetchVehicleData = jest.fn();
        const requestPayload = { amcRegistration: { vin: 'test' } };

        customRender(<VehicleDetailsMaster requestPayload={requestPayload} setLastSection={jest.fn()} fetchVehicleData={fetchVehicleData} setButtonData={jest.fn()} isLoaded={false} formActionType={formActionType} FormActionButton={FormActionButton} setRequestPayload={jest.fn()} />);

        const add = screen.getByRole('button', { name: 'plus Add' });
        fireEvent.click(add);

        const vin = screen.getByRole('textbox', { name: 'VIN' });
        fireEvent.change(vin, { target: { value: 'testing' } });

        const searchBtn = screen.getByRole('button', { name: 'search' });
        fireEvent.click(searchBtn);

        const saveBtn = screen.getByRole('button', { name: 'Save' });
        fireEvent.click(saveBtn);
    });
});
