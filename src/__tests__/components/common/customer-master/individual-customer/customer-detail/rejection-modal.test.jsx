import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { fireEvent, screen, act, logRoles } from '@testing-library/react';
import { RejectionModal } from 'components/common/CustomerMaster/IndividualCustomer/CustomerDetail/RejectionModal';

describe('Common Footer Button component', () => {

    it('should render the common footer button component', () => {
        customRender(<RejectionModal isVisible={true} />);
    });

});