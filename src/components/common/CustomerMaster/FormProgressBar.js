import React, { useEffect } from 'react';
import { Timeline } from 'antd';
import { BsRecordCircleFill } from 'react-icons/bs';
import { FaCheckCircle } from 'react-icons/fa';
import styles from 'components/common/Common.module.css';

const FormProgressBar = (props) => {
    const { leftTimeline, setleftTimeline,toggleButton, isVisible } = props;
    useEffect(() => {
        if (isVisible && leftTimeline) {
            const TimeLineClass = document.getElementsByClassName('ant-timeline-item');
            for (let i = 0; i < TimeLineClass.length; i++) {
                if (TimeLineClass[i]['children']['1']['children']['0']['classList'].contains('Common_activeForm__PgAbl')) {
                    TimeLineClass[i].firstChild.style.backgroundColor = '#ff3e5b';
                    TimeLineClass[i].lastChild.firstChild.style.color = '#ff3e5b';
                } else {
                    TimeLineClass[i].firstChild.style.backgroundColor = '#70c922';
                    TimeLineClass[i].lastChild.firstChild.style.color = '#0b0b0c';
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [leftTimeline, isVisible]);
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
                    dot: leftTimeline?.details ? (
                        <div className={styles.activeForm}>
                            <BsRecordCircleFill />
                        </div>
                    ) : (
                        <FaCheckCircle />
                    ),
                    children: <p onClick={() => onHandle('details')}>Customer Details</p>,
                },
                toggleButton?.company && {
                    dot: leftTimeline?.profile ? (
                        <div className={styles.activeForm}>
                            <BsRecordCircleFill />
                        </div>
                    ) : (
                        <FaCheckCircle />
                    ),
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
