import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { fireEvent, screen } from '@testing-library/react';
import ViewAddressList from 'components/common/CustomerMaster/Common/Address/ViewAddressList';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('Advance Filter component', () => {

    it('should render the advance filter component', () => {
        customRender(<ViewAddressList />);
    });

    it('collapse button should work', () => {
        const styles={
            marB20: ''
        }
        customRender(<ViewAddressList styles={styles} addressData={[{id: 1}]} />);
        const collapseBtn=screen.getByRole('img', { name: 'plus'} );
        fireEvent.click(collapseBtn);
    });

    it('collapse button should work on editing', () => {
        const styles={
            marB20: ''
        }
        customRender(<ViewAddressList styles={styles} addressData={[{id: 1}]} isEditing={true} />);
        const collapseBtn=screen.getByRole('img', { name: 'plus'} );
        fireEvent.click(collapseBtn);
    });

    it('edit button should work', () => {
        const styles={
            marB20: ''
        }
        const addressForm={
            setFieldsValue:jest.fn()
        }
        customRender(<ViewAddressList addressForm={addressForm} styles={styles} addressData={[{id: 1}]} setIsEditing={jest.fn()} setEditingData={jest.fn()} setIsAdding={jest.fn()} />);
        const editBtn=screen.getByRole('button', { name: 'Edit'} );
        fireEvent.click(editBtn);
    });

    it('mark as default checkbox should work', () => {
        const styles={
            marB20: ''
        }
        customRender(<ViewAddressList styles={styles} addressData={[{id: 1}]} isEditing={false} onCheckdefaultAddClick={jest.fn()} />);
        const markAsDefault=screen.getByRole('checkbox', { name: 'Mark As Default'} );
        fireEvent.click(markAsDefault);
    });

});