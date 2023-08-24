import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { CustomerNameChangeHistory } from 'components/common/CustomerMaster/IndividualCustomer/CustomerDetail/CustomerNameChange';
beforeEach(() => {
    jest.clearAllMocks();
});

describe('View Form component', () => {
    it('should render view form component', () => {
        customRender(<CustomerNameChangeHistory isVisible={true} selectedCustomerId={true} />);
    });
});
