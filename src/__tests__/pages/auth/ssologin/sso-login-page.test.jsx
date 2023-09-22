import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { SSOLoginPage } from '@pages/auth/SSOLogin/SSOLoginPage';
import { useLocation } from 'react-router-dom';

afterEach(() => {
    jest.restoreAllMocks();
});

jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom');
    return {
        ...originalModule,
        useLocation: jest.fn().mockReturnValue({
        hash: '#access_token=your_access_token_here&id_token=your_id_token_here&token_type="',
        }),
    };
});

jest.mock('jwt-decode', () => ({
    __esModule: true,
    default: jest.fn().mockImplementation(() => {
        return 106;
    }),
}));

describe('SSOLoginPage Component', () => {

    it('should check SSOLoginPage is working', async () => {
        customRender(<SSOLoginPage />);
    });

    it('should verify with id token', async () => {
        useLocation.mockReturnValue({ hash: '#id_token=', });
        customRender(<SSOLoginPage />);
    });

});
