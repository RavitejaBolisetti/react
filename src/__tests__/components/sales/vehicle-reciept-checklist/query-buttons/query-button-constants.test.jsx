import '@testing-library/jest-dom/extend-expect';
import { QUERY_BUTTONS } from '@components/Sales/VehicleRecieptChecklist/QueryButtons/QueryButtonConstants';
import customRender from '@utils/test-utils';

afterEach(() => {
    jest.restoreAllMocks();
});


describe('Query Buttons Constants components', () => {
    it('should render Query Button Constants components', () => {
        const item = { 
        id: 'pending',
        title: 'Pending',
        key: 'P', 
    } 
        customRender(<QUERY_BUTTONS PENDING={item} />);
    });
});
