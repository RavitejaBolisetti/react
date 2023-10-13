import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { ChargerInstallationPage } from '@pages/Sales/ChargerInstallationProcess/ChargerInstallationPage';

describe('ChargerInstallationPage Components', () => {
    it('should render ChargerInstallationPage Page components', () => {
        customRender(<ChargerInstallationPage />);
    });
});
