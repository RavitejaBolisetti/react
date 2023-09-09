import '@testing-library/jest-dom/extend-expect';
import { QueryButtons } from '@components/Sales/VehicleRecieptChecklist/QueryButtons/QueryButtons';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});


describe('Query Buttons components', () => {
    it('should render Query Buttons components', () => {
        const item = { key: 1, value: 'test' } 
        customRender(<QueryButtons item={item} />);
    });
});
