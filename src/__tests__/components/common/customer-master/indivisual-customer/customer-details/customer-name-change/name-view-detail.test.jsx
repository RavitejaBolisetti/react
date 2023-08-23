import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { fireEvent, screen, act } from '@testing-library/react';
import { ViewDetail } from '@components/common/CustomerMaster/IndividualCustomer/CustomerDetail/CustomerNameChange/ViewDetail';

describe('View Form component', () => {
    it('should render view form component', () => {
        const styles = {
            cardInsideBox: '',
        };
        customRender(<ViewDetail styles={styles} />);
    });

    it('should click on No button for approval', async () => {
        const formData = {
            customerNameChangeRequest: { id: 1, supportingDocuments: [{ id: 106 }] },
        };
        const styles = {
            cardInsideBox: '',
        };
        customRender(<ViewDetail styles={styles} formData={formData} setActiveKey={jest.fn()} canApproveNameChangeRequest={true} showApproveNameChangeRequestBtn={true} downloadFileFromButton={jest.fn()} />);

        const downloadBtn = screen.getByTestId('download');
        fireEvent.click(downloadBtn);

        const approvedBtn = screen.getByRole('button', { name: 'Approve' });
        fireEvent.click(approvedBtn);

        const yesBtn = await screen.findByRole('button', { name: 'No' });
        fireEvent.click(yesBtn);
    });

    it('should click on rejection model  Cancel buttons', async () => {
        const formData = {
            customerNameChangeRequest: { id: 1, supportingDocuments: [{ id: 106 }] },
        };
        const styles = {
            cardInsideBox: '',
        };
        customRender(<ViewDetail styles={styles} formData={formData} setActiveKey={jest.fn()} setIsLoading={true} canApproveNameChangeRequest={true} showApproveNameChangeRequestBtn={true} />);

        const rejectedBtn = screen.getByRole('button', { name: 'Reject' });
        fireEvent.click(rejectedBtn);

        const closeBtn = await screen.findByRole('button', { name: 'No' });
        fireEvent.click(closeBtn);
    });
    it('should click on rejection model Submit buttons', async () => {
        const formData = {
            customerNameChangeRequest: { id: 1, supportingDocuments: [{ id: 106 }] },
        };
        const styles = {
            cardInsideBox: '',
        };
        customRender(<ViewDetail styles={styles} formData={formData} setActiveKey={jest.fn()} setIsLoading={true} canApproveNameChangeRequest={true} showApproveNameChangeRequestBtn={true} />);

        const rejectedBtn = screen.getByRole('button', { name: 'Reject' });
        fireEvent.click(rejectedBtn);

        const rejectionText = screen.getByRole('textbox', { name: 'Remark for Rejection' });
        fireEvent.change(rejectionText, { target: { value: 'helo' } });

        const closeBtn = screen.getByRole('button', { name: /yes, reject/i });
        fireEvent.click(closeBtn);
    });
});
