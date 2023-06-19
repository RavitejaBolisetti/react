import { ContactDetails } from '../../Common';

const ContactMain = ({ isViewModeVisible, toggleButton }) => {
    return <ContactDetails isViewModeVisible={isViewModeVisible} toggleButton={toggleButton} />;
};

export const IndividualContact = ContactMain;
