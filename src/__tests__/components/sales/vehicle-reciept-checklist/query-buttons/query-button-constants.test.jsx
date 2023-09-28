import '@testing-library/jest-dom/extend-expect';
import { QUERY_BUTTONS } from '@components/Sales/VehicleRecieptChecklist/QueryButtons/QueryButtonConstants';

afterEach(() => {
    jest.restoreAllMocks();
});


describe('Query Buttons Constants components', () => {

    it('should render Query Button Constants components', () => {
        expect(QUERY_BUTTONS).toHaveProperty('PENDING');
        expect(QUERY_BUTTONS).toHaveProperty('PARTIALLY_COMPLETED');
        expect(QUERY_BUTTONS).toHaveProperty('COMPLETED');
    });

});
