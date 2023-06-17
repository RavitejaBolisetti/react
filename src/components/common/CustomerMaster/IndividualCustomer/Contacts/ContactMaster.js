import { ContactDetails } from './../../Common/Contacts';

const IndividualContact = ({ isViewModeVisible, toggleButton }) => {
    return <ContactDetails isViewModeVisible={isViewModeVisible} toggleButton={toggleButton} />;
};

export default IndividualContact;
