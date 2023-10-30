import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { ValidateMobileNumberModal } from '@components/common/CustomerMaster/Common/Contacts/ValidateMobileNumberModal';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Mobile validation component', () => {
    it('should render the validation component', () => {
        customRender(<ValidateMobileNumberModal isVisible={true} />);
    });
});
