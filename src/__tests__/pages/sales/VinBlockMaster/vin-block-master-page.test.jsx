import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { VinBlockMasterPage } from '@pages/Sales/VinBlockMaster/VinBlockMasterPage';

describe('VinBlockMasterPage Components', () => {
    it('should render VinBlockMasterPage Page components', () => {
        customRender(<VinBlockMasterPage />);
    });
});
