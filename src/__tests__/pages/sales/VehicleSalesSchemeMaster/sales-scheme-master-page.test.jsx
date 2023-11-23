import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { VehicleSalesSchemeMasterPage } from '@pages/Sales/VehicleSalesSchemeMaster/VehicleSalesSchemeMasterPage';

describe('VehicleSalesSchemeMasterPage Components', () => {
    it('should render VehicleSalesSchemeMasterPage Page components', () => {
        customRender(<VehicleSalesSchemeMasterPage />);
    });
});
