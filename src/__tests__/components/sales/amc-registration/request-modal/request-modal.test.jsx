import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { RejectRequest } from '@components/Sales/AMCRegistration/RequestModal/RequestModal';
import { screen, fireEvent } from '@testing-library/react';
import { PARAM_MASTER } from 'constants/paramMaster';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Request modal Components', () => {
    it('Should render request modal basic render', () => {
        customRender(<RejectRequest amcWholeCancellation={true} rejectRequest={true} userType={'DLR'} isVisible={true} />);

        const no = screen.getByRole('button', { name: 'No' });
        fireEvent.click(no);

        const saveBtn = screen.getByRole('button', { name: '' });
        fireEvent.click(saveBtn);
    });

    it('Should render request modal render', () => {
        const handleRemarksChange = jest.fn();
        customRender(<RejectRequest amcWholeCancellation={true} rejectRequest={true} isVisible={true} onChange={handleRemarksChange} />);

        const reasonforRejection = screen.getByRole('combobox', { name: 'Reason for Rejection' });
        fireEvent.change(reasonforRejection, { target: { value: 'testing' } });

        const no = screen.getByRole('button', { name: 'No' });
        fireEvent.click(no);

        const saveBtn = screen.getByRole('button', { name: '' });
        fireEvent.click(saveBtn);
    });

    it('Should render request modal amcWholeCancellation render', () => {
        customRender(<RejectRequest amcWholeCancellation={false} rejectRequest={false} isVisible={true} />);
    });

    it('Should render request modal amcWholeCancellation true render', () => {
        customRender(<RejectRequest amcWholeCancellation={true} rejectRequest={true} isVisible={true} />);
    });

    it('Should render request modal close render', () => {
        customRender(
            <RejectRequest
                amcWholeCancellation={true}
                rejectRequest={true}
                userType={'DLR'}
                isVisible={true}
                typeData={{
                    [PARAM_MASTER.AMC_CANCEL_REASON.id]: [
                        { key: '1', label: 'Reason 1' },
                        { key: '2', label: 'Reason 2' },
                    ],
                }}
            />
        );

        const reasonforCancellation = screen.getByRole('combobox', { name: 'Reason for Cancellation' });
        fireEvent.change(reasonforCancellation, { target: { value: 'testing' } });
    });
});
