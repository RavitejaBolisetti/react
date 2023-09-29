import '@testing-library/jest-dom/extend-expect';
import { QueryButtons } from '@components/Sales/VehicleRecieptChecklist/QueryButtons/QueryButtons';
import customRender from '@utils/test-utils';
import { fireEvent, screen } from '@testing-library/react';

afterEach(() => {
    jest.restoreAllMocks();
});


describe('Query Buttons components', () => {

    it('should render Query Buttons components', () => {
        const items = { key: 1, value: 'test' } 
        customRender(<QueryButtons items={items} onClick={jest.fn()} />);
        fireEvent.click(screen.getAllByRole('button', { name: '' })[1]);
    });

});
