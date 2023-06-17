import { ContactDetails } from './../../Common/Contacts';

const ContactMain = ({ isViewModeVisible, toggleButton }) => {
    return <ContactDetails isViewModeVisible={isViewModeVisible} toggleButton={toggleButton} />;
};

export const IndividualContact = ContactMain;
