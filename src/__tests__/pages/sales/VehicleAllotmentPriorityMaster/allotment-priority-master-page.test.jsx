import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { VehicleAllotmentPriorityMasterPage } from '@pages/Sales/VehicleAllotmentPriorityMaster/VehicleAllotmentPriorityMasterPage';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('VehicleAllotmentPriorityMaster Page  Components', () => {
    it('should render VehicleAllotmentPriorityMaster components', () => {
        customRender(<VehicleAllotmentPriorityMasterPage />);
    });
});
