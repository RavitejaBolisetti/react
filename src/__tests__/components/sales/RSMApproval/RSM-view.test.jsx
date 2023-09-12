import '@testing-library/jest-dom/extend-expect';
import { ViewDetail } from '@components/Sales/RSMApproval/ViewDetail';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('RSM form-button components', () => {
    it('should render components', () => {
        customRender(<ViewDetail isLoading={true} isVisible={true} />);
    });
});
