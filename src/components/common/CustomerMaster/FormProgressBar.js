import React, { useEffect } from 'react';
import { Timeline } from 'antd';
import { BsRecordCircleFill } from 'react-icons/bs';
import { FaCheckCircle } from 'react-icons/fa';
import styles from 'components/common/Common.module.css';

const FormProgressBar = (props) => {
    const { leftTimeline, setleftTimeline, toggleButton, isVisible, setmoduleName } = props;
    useEffect(() => {
        if (leftTimeline) {
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
            console.log('TimeLineClass',TimeLineClass)
            TimeLineClass[TimeLineClass?.length - 1].firstChild.style.display = 'none';
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [leftTimeline, isVisible]);
    const onHandle = (key) => {
        switch (key) {
            case 'customerDetails': {
                setleftTimeline({ ...leftTimeline, CustomerDetails: true, IndividualProfile: false, CompanyProfile: false, Address: false, Contacts: false, FamilyDetails: false, AccountRelated: false, SupportingDocument: false });
                setmoduleName('Customer Details');
                break;
            }
            case 'companyProfile': {
                setleftTimeline({ ...leftTimeline, CustomerDetails: false, IndividualProfile: false, CompanyProfile: true, Address: false, Contacts: false, FamilyDetails: false, AccountRelated: false, SupportingDocument: false });
                setmoduleName('Company Profile');
                break;
            }
            case 'individualProfile': {
                setleftTimeline({ ...leftTimeline, CustomerDetails: false, IndividualProfile: true, CompanyProfile: false, Address: false, Contacts: false, FamilyDetails: false, AccountRelated: false, SupportingDocument: false });

                setmoduleName('Individual profile');
                break;
            }
            case 'address': {
                setleftTimeline({ ...leftTimeline, CustomerDetails: false, IndividualProfile: false, CompanyProfile: false, Address: true, Contacts: false, FamilyDetails: false, AccountRelated: false, SupportingDocument: false });
                setmoduleName('Address');
                break;
            }
            case 'contacts': {
                setleftTimeline({ ...leftTimeline, CustomerDetails: false, IndividualProfile: false, CompanyProfile: false, Address: false, Contacts: true, FamilyDetails: false, AccountRelated: false, SupportingDocument: false });
                setmoduleName('Contacts');
                break;
            }
            case 'familyDetails': {
                setleftTimeline({ ...leftTimeline, CustomerDetails: false, IndividualProfile: false, CompanyProfile: false, Address: false, Contacts: false, FamilyDetails: true, AccountRelated: false, SupportingDocument: false });
                setmoduleName('Family Details');
                break;
            }
            case 'accountRelated': {
                setleftTimeline({ ...leftTimeline, CustomerDetails: false, IndividualProfile: false, CompanyProfile: false, Address: false, Contacts: false, FamilyDetails: false, AccountRelated: true, SupportingDocument: false });
                setmoduleName('Account Related');
                break;
            }
            case 'SupportingDocument': {
                setleftTimeline({ ...leftTimeline, CustomerDetails: false, IndividualProfile: false, CompanyProfile: false, Address: false, Contacts: false, FamilyDetails: false, AccountRelated: false, SupportingDocument: true });
                setmoduleName('Supporting Document');
                break;
            }
            default: {
                setleftTimeline({ ...leftTimeline, AccountRelated: false, Address: false, Contacts: false, CustomerDetails: true, FamilyDetails: false, IndividualProfile: false, CustomerProfile: false, SupportingDocument: false });
                setmoduleName('Customer Details');
            }
        }
    };

    return (
        <Timeline
            items={[
                {
                    dot: leftTimeline?.CustomerDetails ? (
                        <div className={styles.activeForm}>
                            <BsRecordCircleFill />
                        </div>
                    ) : (
                        <FaCheckCircle />
                    ),
                    children: <p onClick={() => onHandle('customerDetails')}>Customer Details</p>,
                },

                toggleButton === 'Firm/Company' && {
                    dot: leftTimeline?.CompanyProfile ? (
                        <div className={styles.activeForm}>
                            <BsRecordCircleFill />
                        </div>
                    ) : (
                        <FaCheckCircle />
                    ),
                    children: <p onClick={() => onHandle('companyProfile')}>Company Profile</p>,
                },

                toggleButton === 'Individual' && {
                    dot: leftTimeline?.IndividualProfile ? (
                        <div className={styles.activeForm}>
                            <BsRecordCircleFill />
                        </div>
                    ) : (
                        <FaCheckCircle />
                    ),
                    children: <p onClick={() => onHandle('individualProfile')}>Individual Profile</p>,
                },
                {
                    dot: leftTimeline?.Address ? (
                        <div className={styles.activeForm}>
                            <BsRecordCircleFill />
                        </div>
                    ) : (
                        <FaCheckCircle />
                    ),
                    children: <p onClick={() => onHandle('address')}>Address</p>,
                },
                {
                    dot: leftTimeline?.Contacts ? (
                        <div className={styles.activeForm}>
                            <BsRecordCircleFill />
                        </div>
                    ) : (
                        <FaCheckCircle />
                    ),
                    children: <p onClick={() => onHandle('contacts')}>Contact</p>,
                },
                toggleButton === 'Individual' && {
                    dot: leftTimeline?.FamilyDetails ? (
                        <div className={styles.activeForm}>
                            <BsRecordCircleFill />
                        </div>
                    ) : (
                        <FaCheckCircle />
                    ),
                    children: <p onClick={() => onHandle('familyDetails')}>Family Details</p>,
                },
                {
                    dot: leftTimeline?.AccountRelated ? (
                        <div className={styles.activeForm}>
                            <BsRecordCircleFill />
                        </div>
                    ) : (
                        <FaCheckCircle />
                    ),
                    children: <p onClick={() => onHandle('accountRelated')}>Account Related</p>,
                },

                {
                    dot: leftTimeline?.SupportingDocument ? (
                        <div className={styles.activeForm}>
                            <BsRecordCircleFill />
                        </div>
                    ) : (
                        <FaCheckCircle />
                    ),
                    children: <p onClick={() => onHandle('SupportingDocument')}>Supporting Documents</p>,
                },
            ]}
        />
    );
};

export default FormProgressBar;
