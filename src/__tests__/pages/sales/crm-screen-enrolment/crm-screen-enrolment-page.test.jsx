import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { CrmScreenEnrolmentMasterPage } from '@pages/Sales/crmScreenEnrolment/CrmScreenEnrolmentPage';

describe('ChargerInstallationPage Components', () => {
    it('should render ChargerInstallationPage Page components', () => {
        customRender(<CrmScreenEnrolmentMasterPage />);
    });
});
