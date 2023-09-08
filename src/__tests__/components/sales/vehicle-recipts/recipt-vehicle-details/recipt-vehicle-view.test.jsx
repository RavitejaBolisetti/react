import '@testing-library/jest-dom/extend-expect';
import { ViewDetail } from '@components/Sales/VehicleReceipt/VehicleDetails/ViewDetail';
import customRender from '@utils/test-utils';
import { screen, fireEvent } from '@testing-library/react';

afterEach(() => {
    jest.restoreAllMocks();
});

const formData = [{ color: null, demoVehicle: 'Y', fuel: null, id: '4a04fbfc-711e-45e1-961d-080153a9ef43', keyNumber: null, mfgdate: null, modelCode: null, modelDescription: 'LX BS4 7SF MISTSILVER', name: null, physicalStatus: 'TL', receivedOn: null, returnNumber: null, seatingCapacity: null, shortage: 'Y', variant: null, vehicleCost: null, vehicleReceiptChecklistNumber: null, vehicleStatus: 'TRN', vin: null }];
const physicalStatusType = [
    { id: '5328b19e-e68f-4c85-b71a-cfc6799b9e49', key: 'TL', parentKey: 'PHYSICAL_STATUS', value: 'Total Loss' },
    { id: 'f62624cb-0ae6-4577-b514-1b7ee94e5e31', key: 'MD', parentKey: 'PHYSICAL_STATUS', value: 'Major Damage' },
];

const vehicleStatusType = [
    { id: '5052a91c-5796-4f11-9a07-f02fc6a6d02c', key: 'TRN', parentKey: 'VEHCL_STATS', value: 'In Transit' },
    { id: 'b6193fb2-7f9b-4939-ba2b-232f72ab6b2f', key: 'RCV', parentKey: 'VEHCL_STATS', value: 'Received' },
];

const shortageType = [
    { id: '52e9fa52-ed49-43ba-b34e-87ddcb1ae6c3', key: 'Y', parentKey: 'YES_NO_FLG', value: 'Yes' },
    { id: 'b381c4f7-3803-43a1-82a4-e7302b3b0c9c', key: 'N', parentKey: 'YES_NO_FLG', value: 'No' },
];

describe('Term Condition Manufacturer vehicle view components', () => {
    it('should render components', () => {
        customRender(<ViewDetail setButtonData={jest.fn()} shortageType={shortageType} vehicleStatusType={vehicleStatusType} physicalStatusType={physicalStatusType} isVisible={true} onChange={jest.fn()} formData={formData} isLoading={true} />);

        const plusBtn = screen.getByRole('img', { name: 'plus' });
        fireEvent.click(plusBtn);

        const minusBtn = screen.getByRole('img', { name: 'minus' });
        fireEvent.click(minusBtn);
    });
});
