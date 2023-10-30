import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { VehicleChecklistMasterPage } from '@pages/Sales/VehicleChecklistMaster/VehicleChecklistMasterPage';

describe('VehicleChecklistMasterPage Components', () => {
    it('should render VehicleChecklistMasterPage Page components', () => {
        customRender(<VehicleChecklistMasterPage />);
    });
});
