import '@testing-library/jest-dom/extend-expect';

import customRender from '@utils/test-utils';

import { fireEvent, screen } from '@testing-library/react';

import { NameChangeHistory } from '@components/common/CustomerMaster/IndividualCustomer/CustomerDetail/NameChangeHistory';

describe('Common component', () => {
    it('should render the nameChangeHistory component', () => {
        customRender(<NameChangeHistory isVisible={true} fetchCustomerChangeHistory={jest.fn()} />);
    });

    it('should render texts', () => {
        customRender(<NameChangeHistory isVisible={true} fetchCustomerChangeHistory={jest.fn()} />);
        const imgClick = screen.getByRole('img', { name: /close/i });
        fireEvent.click(imgClick);

        const changeHistory = screen.getByText('Name Change History');
        expect(changeHistory).toBeTruthy();
    });
});
