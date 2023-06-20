import { ContactDetails } from './../../Common/Contacts';

const CompanyContactMain = ({ isViewModeVisible, toggleButton }) => {
    return <ContactDetails isViewModeVisible={isViewModeVisible} toggleButton={toggleButton} />;
};

export const CompanyContact = CompanyContactMain;
