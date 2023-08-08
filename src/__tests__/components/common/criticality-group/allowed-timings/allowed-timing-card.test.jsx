import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { screen, fireEvent, getByTestId, render } from '@testing-library/react';
import customRender from '@utils/test-utils';
import AllowedTimingCard from '@components/common/CriticalityGroup/AllowedTimings/AllowedTimingCard';

describe('AllowedTimingCard Components', () => {
    it('should render AllowedTimingCard components', () => {
        customRender(<AllowedTimingCard />);
    });

    it('delete button should work', async () => {
        const setTimeData=jest.fn();
        jest.spyOn(React, 'useState').mockReturnValue([null,setTimeData]);

        render(<AllowedTimingCard setTimeData={setTimeData} showGlobalNotification={jest.fn()} />);
        
        const screenText = screen.getByRole('button');
        fireEvent.click(screenText);

        expect(setTimeData).toHaveBeenCalledWith(expect.any(Function));
        const setTimeDataFunction=setTimeData.mock.calls[0][0];
        const prev=[
            {timeSlotFrom: '09:00'}
        ]
        setTimeDataFunction(prev);
    });

    it('another delete button should work', () => {
        const setTimeData=jest.fn();
        jest.spyOn(React, 'useState').mockReturnValue([null,setTimeData]);

        render(<AllowedTimingCard setTimeData={setTimeData} id='12345' showGlobalNotification={jest.fn()} setButtonData={jest.fn()} setIsAddTimeVisible={jest.fn()} setDeletedTime={jest.fn()} deletedTime={[]} />);
        
        const screenText = screen.getByRole('button');
        fireEvent.click(screenText);

        expect(setTimeData).toHaveBeenCalledWith(expect.any(Function));
        const setTimeDataFunction=setTimeData.mock.calls[0][0];
        const prev=[
            {id:'12345', timeSlotFrom: '09:00'}
        ]
        setTimeDataFunction(prev);
    });
});
