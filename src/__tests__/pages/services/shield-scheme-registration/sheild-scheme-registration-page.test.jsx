import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { ShieldSchemeRegistrationPage } from '@pages/Services/ShieldSchemeRegistration/ShieldSchemeRegistrationPage';

describe('ShieldSchemeRegistrationPage Components', () => {
    it('should render ShieldSchemeRegistrationPage Page components', () => {
        customRender(<ShieldSchemeRegistrationPage />);
    });
});
