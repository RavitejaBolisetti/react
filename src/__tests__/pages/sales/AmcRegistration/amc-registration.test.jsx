import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import AMCRegistrationMasterPage from '@pages/Sales/AMCRegistration/AMCRegistrationMaster';

describe('AMCRegistrationMasterPage Components', () => {
    it('should render AMCRegistrationMasterPage Page components', () => {
        customRender(<AMCRegistrationMasterPage />);
    });
});
