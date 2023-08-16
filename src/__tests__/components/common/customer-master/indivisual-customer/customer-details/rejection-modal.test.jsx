import '@testing-library/jest-dom/extend-expect';

import customRender from '@utils/test-utils';

import { RejectionModal } from 'components/common/CustomerMaster/IndividualCustomer/CustomerDetail/RejectionModal';

describe('Rejection Model component', () => {
    it('should render the component', () => {
        customRender(<RejectionModal isVisible={true} />);
    });
});
