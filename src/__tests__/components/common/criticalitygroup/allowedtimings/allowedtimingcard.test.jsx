import { render, screen, fireEvent } from '@testing-library/react';
import AllowedTimingCard from '@components/common/CriticalityGroup/AllowedTimings/AllowedTimingCard';
import customRender from '@utils/test-utils';

const showGlobalNotification = jest.fn();

describe('AllowedTimingCard', () => {
    const mockData = {
        id: 1,
        timeSlotFrom: '09:00',
        timeSlotTo: '12:00',
    };

    it('renders the card correctly with delete button for existing data', () => {
        customRender(<AllowedTimingCard {...mockData} formActionType={{ viewMode: false }} showGlobalNotification={showGlobalNotification} />);

        const startTime = screen.getByText('09:00 AM');
        const endTime = screen.getByText('12:00 PM');
        const deleteButton = screen.getByRole('button');

        expect(startTime).toBeInTheDocument();
        expect(endTime).toBeInTheDocument();
        expect(deleteButton).toBeInTheDocument();
    });

    it('renders the card correctly with delete button for new data', () => {
        customRender(<AllowedTimingCard timeSlotFrom="10:00" timeSlotTo="13:00" formActionType={{ viewMode: false }} />);

        const startTime = screen.getByText('10:00 AM');
        const endTime = screen.getByText('01:00 PM');
        const deleteButton = screen.getByRole('button');

        expect(startTime).toBeInTheDocument();
        expect(endTime).toBeInTheDocument();
        expect(deleteButton).toBeInTheDocument();
    });

    it('should call handleDeleteAction when clicking delete button for new data', () => {
        const handleDeleteAction = jest.fn();
        customRender(<AllowedTimingCard timeSlotFrom="10:00" timeSlotTo="13:00" formActionType={{ viewMode: false }} handleDeleteAction={handleDeleteAction} />);

        const deleteButton = screen.getByRole('button');
        fireEvent.click(deleteButton);

        expect(handleDeleteAction).toHaveBeenCalledTimes(1);
        expect(handleDeleteAction).toHaveBeenCalledWith('10:00');
    });

    it('should call handleDeleteActionServer when clicking delete button for existing data', () => {
        const setButtonData = jest.fn();
        const setTimeData = jest.fn();
        customRender(<AllowedTimingCard {...mockData} formActionType={{ viewMode: false }} showGlobalNotification={showGlobalNotification} setButtonData={setButtonData} setTimeData={setTimeData} />);

        const deleteButton = screen.getByRole('button');
        fireEvent.click(deleteButton);

        expect(showGlobalNotification).toHaveBeenCalledTimes(1);
        expect(showGlobalNotification).toHaveBeenCalledWith({
            notificationType: 'success',
            title: 'Success',
            message: 'Group Timing has been deleted Successfully',
            placement: 'bottomRight',
        });

        expect(setButtonData).toHaveBeenCalledTimes(1);
        expect(setTimeData).toHaveBeenCalledTimes(1);
    });
});
