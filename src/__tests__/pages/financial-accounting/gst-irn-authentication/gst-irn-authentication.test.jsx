import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { GSTIRNAuthenticationPage } from '@pages/FinancialAccounting/GSTIRNAuthentication/GSTIRNAuthenticationPage';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('GSTIRNAuthenticationPage Components', () => {
    it('should render GSTIRNAuthenticationPage components', () => {
        customRender(<GSTIRNAuthenticationPage />);
    });
});
