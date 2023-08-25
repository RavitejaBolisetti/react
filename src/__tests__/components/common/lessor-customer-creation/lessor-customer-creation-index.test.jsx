import '@testing-library/jest-dom/extend-expect';
import { ListCustomerCreation } from '@components/common/LessorCustomerCreation';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('ListCustomer Creation components', () => {
    it('should render ListCustomer Creation components', () => {
        customRender(<ListCustomerCreation/>)
    });
});