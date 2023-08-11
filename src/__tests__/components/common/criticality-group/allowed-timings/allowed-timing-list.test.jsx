import '@testing-library/jest-dom/extend-expect';
import { fireEvent, screen, act } from '@testing-library/react';
import customRender from '@utils/test-utils';
import AllowedTimingList from '@components/common/CriticalityGroup/AllowedTimings/AllowedTimingList';

describe('AllowedTimingList Components', () => {
    it('should render AllowedTimingList components', () => {
        customRender(<AllowedTimingList />);
    });

    it('should check add time form field event', async () => {

        const formActionType = { viewMode: false };
        const timeData = [{timeSlotFrom: '10:00', timeSlotTo: '11:00', isDeleted: true}];

        customRender(<AllowedTimingList forceUpdate={jest.fn()} setAllowedTimingSave={jest.fn()} showGlobalNotification={jest.fn()} timeData={timeData} formActionType={formActionType} isAddTimeVisible={true} onFinish={jest.fn()} onTimingFormFinish={jest.fn()}/>);

        const timeInput = screen.getAllByRole('img', {name: 'clock-circle', exact: false});

        fireEvent.click(timeInput[0]);
        const amText=screen.getByText('AM');
        fireEvent.click(amText);
        const okBtn=screen.getByText('OK');
        fireEvent.click(okBtn);

        fireEvent.click(timeInput[1]);
        const pmText=screen.getAllByText('PM');
        fireEvent.click(pmText[1]);
        const okBtn1=screen.getAllByText('OK');
        fireEvent.click(okBtn1[1]);
      
        const saveButton = screen.getByRole('button', { name: 'Save', exact: false });
        await act(() => {
            fireEvent.click(saveButton);
        });
    });

    it('add time button should work', () => {
        const formActionType = { viewMode: false };
        customRender(<AllowedTimingList isAddTimeVisible={false} formActionType={formActionType} setIsAddTimeVisible={jest.fn()} />);
        const addTimeBtn=screen.getByRole('button', {name: 'Add Time', exact:false});
        fireEvent.click(addTimeBtn);
        
    });

});
