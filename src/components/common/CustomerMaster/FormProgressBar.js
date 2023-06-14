import React from 'react';
import { Timeline, Progress, Button } from 'antd';
import { BsRecordCircleFill } from 'react-icons/bs';
import { FaCheckCircle } from 'react-icons/fa';

const FormProgressBar = (props) => {
    const { leftTimeline, setleftTimeline, toggleButton } = props;
    const onHandle = (key) => {
        switch (key) {
            case 'details': {
                setleftTimeline({ ...leftTimeline, AccountRelated: false, Address: false, Contacts: false, CustomerDetails: true, FamilyDetails: false, IndividualProfile: false, CustomerProfile: false, SupportingDocument: false });
                break;
            }
            case 'profile': {
                setleftTimeline({ ...leftTimeline, AccountRelated: false, Address: false, Contacts: false, CustomerDetails: false, FamilyDetails: false, IndividualProfile: true, CustomerProfile: false, SupportingDocument: false });
                break;
            }
            case 'address': {
                setleftTimeline({ ...leftTimeline, AccountRelated: false, Address: true, Contacts: false, CustomerDetails: false, FamilyDetails: false, IndividualProfile: false, CustomerProfile: false, SupportingDocument: false });
                break;
            }
            case 'contact': {
                setleftTimeline({ ...leftTimeline, AccountRelated: false, Address: false, Contacts: true, CustomerDetails: false, FamilyDetails: false, IndividualProfile: false, CustomerProfile: false, SupportingDocument: false });
                break;
            }
            case 'account': {
                setleftTimeline({ ...leftTimeline, AccountRelated: true, Address: false, Contacts: false, CustomerDetails: false, FamilyDetails: false, IndividualProfile: false, CustomerProfile: false, SupportingDocument: false });
                break;
            }
            case 'family': {
                setleftTimeline({ ...leftTimeline, AccountRelated: false, Address: false, Contacts: false, CustomerDetails: false, FamilyDetails: true, IndividualProfile: false, CustomerProfile: false, SupportingDocument: false });
                break;
            }
            case 'CustomerProfile': {
                setleftTimeline({ ...leftTimeline, AccountRelated: false, Address: false, Contacts: false, CustomerDetails: false, FamilyDetails: false, IndividualProfile: false, CustomerProfile: true, SupportingDocument: false });
                break;
            }
            case 'SupportingDocument': {
                setleftTimeline({ ...leftTimeline, AccountRelated: false, Address: false, Contacts: false, CustomerDetails: false, FamilyDetails: false, IndividualProfile: false, CustomerProfile: false, SupportingDocument: true });
                break;
            }
            default: {
                setleftTimeline({ ...leftTimeline, AccountRelated: false, Address: false, Contacts: false, CustomerDetails: true, FamilyDetails: false, IndividualProfile: false, CustomerProfile: false, SupportingDocument: false });
            }
        }
    };
    return (
        <Timeline
            items={[
                {
                    dot: <BsRecordCircleFill color="#ff3e5b" />,
                    children: <p onClick={() => onHandle('details')}>Customer Details</p>,
                },
                toggleButton?.company && {
                    dot: <FaCheckCircle />,
                    children: <p onClick={() => onHandle('CustomerProfile')}>Company Profile</p>,
                },
                toggleButton?.individual && {
                    dot: <FaCheckCircle />,
                    children: <p onClick={() => onHandle('profile')}>Individual Profile</p>,
                },
                {
                    dot: <FaCheckCircle />,
                    children: <p onClick={() => onHandle('address')}>Address</p>,
                },
                {
                    dot: <FaCheckCircle />,
                    children: <p onClick={() => onHandle('contact')}>Contact</p>,
                },
                toggleButton?.individual && {
                    dot: <FaCheckCircle />,
                    children: <p onClick={() => onHandle('family')}>Family Details</p>,
                },
                {
                    dot: <FaCheckCircle />,
                    children: <p onClick={() => onHandle('account')}>Account Related</p>,
                },

                {
                    dot: <FaCheckCircle />,
                    children: <p onClick={() => onHandle('SupportingDocument')}>Supporting Documents</p>,
                },
            ]}
        />
    );
};

export default FormProgressBar;
