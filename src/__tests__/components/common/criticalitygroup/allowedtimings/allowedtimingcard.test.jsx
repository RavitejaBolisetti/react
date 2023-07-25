import '@testing-library/jest-dom/extend-expect';
import { screen, fireEvent, getByTestId } from '@testing-library/react';
import customRender from '@utils/test-utils';
import AllowedTimingCard from '@components/common/CriticalityGroup/AllowedTimings/AllowedTimingCard';

const props = {
    id: '1234567890',
    deletedTime: [],
    setDeletedTime: jest.fn(),
    buttonData: [],
    setButtonData: jest.fn(),
    formActionType: '',
    setIsAddTimeVisible: jest.fn(),
    setTimeData: jest.fn(),
    timeSlotFrom: '09:00',
    timeSlotTo: '10:00',
    showGlobalNotification: jest.fn(),
};

describe('AllowedTimingCard Components', () => {
    it('should render AllowedTimingCard components', () => {
        const { container } = customRender(<AllowedTimingCard />);
        expect(container.firstChild).toHaveClass('timingCardItem');
    });
    it('should render text', () => {
        customRender(<AllowedTimingCard />);
        const screenText = screen.getAllByText('Invalid date');
        expect(screenText).toBeTruthy();
    });
    it('should render text', async () => {
        customRender(<AllowedTimingCard {...props} />);
        const screenText = screen.getByRole('button');
        fireEvent.click(screenText);
    });
    it('should render text', () => {
        customRender(<AllowedTimingCard />);
        const screenText = screen.getAllByText('Start Time');
        expect(screenText).toBeTruthy();
    });
    it('should render text', () => {
        customRender(<AllowedTimingCard />);
        const screenText = screen.getAllByText('End Time');
        expect(screenText).toBeTruthy();
    });
});
