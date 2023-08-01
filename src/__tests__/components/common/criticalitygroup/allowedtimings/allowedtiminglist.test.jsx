import '@testing-library/jest-dom/extend-expect';
import { fireEvent, logRoles, screen, act, waitFor } from '@testing-library/react';
import customRender from '@utils/test-utils';
import AllowedTimingList from '@components/common/CriticalityGroup/AllowedTimings/AllowedTimingList';

describe('AllowedTimingList Components', () => {
    it('should render AllowedTimingList components', () => {
        customRender(<AllowedTimingList />);
    });

    // jest.setTimeout(120000);
    // it('should check add time form field event 1st solution', async () => {
    //     const onFinish=jest.fn();
    //     const onTimingFormFinish=jest.fn();
    //     customRender(<AllowedTimingList formActionType={formActionType} isAddTimeVisible={true} onFinish={onFinish} onTimingFormFinish={onTimingFormFinish}/>);

    //     const timeInput = screen.getAllByRole('img', {name: 'clock-circle', exact: false});

    //     fireEvent.click(timeInput[0]);
    //     const nowBtn=screen.getByText('Now');
    //     fireEvent.click(nowBtn);
    //     await waitFor(() => new Promise(resolve => setTimeout(resolve, 70000)), { timeout: 80000 });
    //     fireEvent.click(timeInput[1]);
    //     const nowBtn1=screen.getAllByText('Now');
    //     fireEvent.click(nowBtn1[1]);
      
    //     const saveButton = screen.getByRole('button', { name: 'Save', exact: false });
    //     await act(() => {
    //         fireEvent.click(saveButton);
    //     });
    //     logRoles(screen.getByTestId('logRole'));
    // });

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

});
