import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { fireEvent, screen, act } from '@testing-library/react';
import { ViewDetail } from '@components/common/CustomerMaster/IndividualCustomer/CustomerDetail/CustomerNameChange/ViewDetail';

describe('View Form component', () => {

    it('should render view form component', () => {
        const styles={
            cardInsideBox: ''
        }
        customRender(<ViewDetail styles={styles} />);
    });

    it('should click on buttons', async () => {

        const formData={
            customerNameChangeRequest: {id: 1, supportingDocuments: [{id:106}]}
        }
        const styles={
            cardInsideBox: ''
        }
        customRender(<ViewDetail styles={styles} formData={formData} setActiveKey={jest.fn()} setIsLoading={jest.fn()} />);

        const plusBtn=screen.getAllByRole('img', { name: 'plus' });
        fireEvent.click(plusBtn[0]);

        const approvedBtn=screen.getByRole('button', { name: 'Approved' });
        fireEvent.click(approvedBtn);

        const yesBtn= await screen.findByRole('button', { name: 'Yes' });
        fireEvent.click(yesBtn);

        const rejectedBtn=screen.getByRole('button', { name: 'Rejected' });
        fireEvent.click(rejectedBtn);

        fireEvent.click(plusBtn[1]);
    });

    it('should click on rejection model  Cancel buttons', async () => {

        const formData={
            customerNameChangeRequest: {id: 1, supportingDocuments: [{id:106}]}
        }
        const styles={
            cardInsideBox: ''
        }
        customRender(<ViewDetail styles={styles} formData={formData} setActiveKey={jest.fn()} setIsLoading={jest.fn()} onCloseAction={jest.fn()} handleCancel={jest.fn()} />);

        const plusBtn=screen.getAllByRole('img', { name: 'plus' });
        fireEvent.click(plusBtn[0]);

        const rejectedBtn=screen.getByRole('button', { name: 'Rejected' });
        fireEvent.click(rejectedBtn);

        const closeBtn= await screen.findByRole('button', { name: 'Cancel' });
        fireEvent.click(closeBtn);

    });

    it('should click on rejection model Sun=bmit button', async () => {

        const formData={
            customerNameChangeRequest: {id: 1, supportingDocuments: [{id:106}]}
        }
        const styles={
            cardInsideBox: ''
        }
        customRender(<ViewDetail styles={styles} formData={formData} setActiveKey={jest.fn()} setIsLoading={jest.fn()} setIsModalOpen={jest.fn()}/>);

        const plusBtn=screen.getAllByRole('img', { name: 'plus' });
        fireEvent.click(plusBtn[0]);

        const rejectedBtn=screen.getByRole('button', { name: 'Rejected' });
        fireEvent.click(rejectedBtn);

        const submitBtn= await screen.findByRole('button', { name: 'Submit' });
        fireEvent.click(submitBtn);

    });



});