import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { RSARegistrationPage } from '@pages/Sales/RSARegistration/RSARegistrationPage';

describe('RSARegistrationPage Components', () => {
    it('should render RSARegistrationPage Page components', () => {
        customRender(<RSARegistrationPage />);
    });
});
