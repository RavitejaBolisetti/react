import '@testing-library/jest-dom/extend-expect';
import customRender from '@utils/test-utils';
import AddEditForm from 'components/common/CustomerMaster/Common/Contacts/AddEditForm';

describe('Add Edit Form component', () => {

    it('should render the add edit form component', () => {
        const typeData={
            'PURPOSE': [{id: 106}],
            'FAMLY_RELTN': [{id:106}]
        }
        customRender(<AddEditForm typeData={typeData} customerType={'IND'}/>);
    });

});