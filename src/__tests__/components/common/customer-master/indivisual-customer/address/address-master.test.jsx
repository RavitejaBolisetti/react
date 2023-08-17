import '@testing-library/jest-dom/extend-expect';

import customRender from '@utils/test-utils';

import { CompanyAddressMaster } from '@components/common/CustomerMaster/IndividualCustomer/Address/AddressMaster';

describe('Common component', () => {
    it('should render the common address component', () => {
        customRender(<CompanyAddressMaster isVisible={true} />);
    });
});
