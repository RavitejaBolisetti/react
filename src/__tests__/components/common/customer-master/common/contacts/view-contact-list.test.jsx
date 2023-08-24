import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import { fireEvent, screen } from '@testing-library/react';
import ViewContactList from 'components/common/CustomerMaster/Common/Contacts/ViewContactList';

afterEach(() => {
    jest.restoreAllMocks();
});

describe('View Contact List component', () => {

    it('should render the view contact list component', () => {
        customRender(<ViewContactList />);
    });

    it('collapse button should work', () => {
        const contactData=[
            {id: 1}
        ];
        const styles={
            marB20:''
        }
        customRender(<ViewContactList contactData={contactData} isEditing={true} styles={styles} />);
        const collapseBtn=screen.getByRole('img', { name: 'plus' });
        fireEvent.click(collapseBtn);
    });

});