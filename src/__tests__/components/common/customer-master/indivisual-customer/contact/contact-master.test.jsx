import '@testing-library/jest-dom/extend-expect';

import customRender from '@utils/test-utils';

import ContactMaster from '@components/common/CustomerMaster/IndividualCustomer/Contact/ContactMaster';

describe('Common component', () => {
    it('should render the common contact component', () => {
        customRender(<ContactMaster isVisible={true} />);
    });
});
