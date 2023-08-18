import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { CustomerChangeHistory } from 'components/common/CustomerMaster/CustomerChangeHistory';

describe('Customer Change History component', () => {

    it('should render the customer change history component', () => {
        customRender(<CustomerChangeHistory isVisible={true} />);
    });

    it('should render the component with selected customer id', () => {
        customRender(<CustomerChangeHistory isVisible={true} selectedCustomerId={'test'} defaultExtraParam={['test']} />);
    });

});