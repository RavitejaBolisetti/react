import React, { useEffect, useState } from 'react';
import { Timeline } from 'antd';
import { BsRecordCircleFill } from 'react-icons/bs';
import { FaCheckCircle } from 'react-icons/fa';
import styles from 'components/common/Common.module.css';

const FormProgressBar = (props) => {
    const { leftTimeline, setleftTimeline, toggleButton, isVisible, setmoduleName, formActionType } = props;
    const [Identification, setIdentification] = useState(1);
    useEffect(() => {
        if (leftTimeline) {
            const TimeLineClass = document.getElementsByClassName('ant-timeline-item');
            for (let i = 0; i < TimeLineClass.length; i++) {
                const activeForm = TimeLineClass[i]['children']['1']['children']['0']['classList']['0'];
                if (activeForm !== undefined && activeForm.match('Common_activeForm')) {
                    TimeLineClass[i].firstChild.style.backgroundColor = '#ff3e5b';
                    TimeLineClass[i].lastChild.firstChild.style.color = '#ff3e5b';
                } else {
                    TimeLineClass[i].firstChild.style.backgroundColor = '#b6b6b6';
                    TimeLineClass[i].lastChild.firstChild.style.color = '#0b0b0c';
                }
            }
            console.log('TimeLineClass', TimeLineClass);
            TimeLineClass[TimeLineClass?.length - 1].firstChild.style.display = 'none';
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [leftTimeline, isVisible]);

    useEffect(() => {
        console.log('Identification', Identification, 'formActionType', formActionType);
    }, [Identification]);
    const onHandle = (key) => {
        switch (key) {
            case 'customerDetails': {
                setleftTimeline({ ...leftTimeline, CustomerDetails: true, IndividualProfile: false, CompanyProfile: false, Address: false, Contacts: false, FamilyDetails: false, AccountRelated: false, SupportingDocument: false });
                setmoduleName('Customer Details');
                setIdentification(1);
                break;
            }
            case 'companyProfile': {
                setleftTimeline({ ...leftTimeline, CustomerDetails: false, IndividualProfile: false, CompanyProfile: true, Address: false, Contacts: false, FamilyDetails: false, AccountRelated: false, SupportingDocument: false });
                setmoduleName('Company Profile');
                setIdentification(2);
                break;
            }
            case 'individualProfile': {
                setleftTimeline({ ...leftTimeline, CustomerDetails: false, IndividualProfile: true, CompanyProfile: false, Address: false, Contacts: false, FamilyDetails: false, AccountRelated: false, SupportingDocument: false });
                setmoduleName('Individual profile');
                setIdentification(3);

                break;
            }
            case 'address': {
                setleftTimeline({ ...leftTimeline, CustomerDetails: false, IndividualProfile: false, CompanyProfile: false, Address: true, Contacts: false, FamilyDetails: false, AccountRelated: false, SupportingDocument: false });
                setmoduleName('Address');
                setIdentification(4);

                break;
            }
            case 'contacts': {
                setleftTimeline({ ...leftTimeline, CustomerDetails: false, IndividualProfile: false, CompanyProfile: false, Address: false, Contacts: true, FamilyDetails: false, AccountRelated: false, SupportingDocument: false });
                setmoduleName('Contacts');
                setIdentification(5);

                break;
            }
            case 'familyDetails': {
                setleftTimeline({ ...leftTimeline, CustomerDetails: false, IndividualProfile: false, CompanyProfile: false, Address: false, Contacts: false, FamilyDetails: true, AccountRelated: false, SupportingDocument: false });
                setmoduleName('Family Details');
                setIdentification(6);

                break;
            }
            case 'accountRelated': {
                setleftTimeline({ ...leftTimeline, CustomerDetails: false, IndividualProfile: false, CompanyProfile: false, Address: false, Contacts: false, FamilyDetails: false, AccountRelated: true, SupportingDocument: false });
                setmoduleName('Account Related');
                setIdentification(7);

                break;
            }
            case 'SupportingDocument': {
                setleftTimeline({ ...leftTimeline, CustomerDetails: false, IndividualProfile: false, CompanyProfile: false, Address: false, Contacts: false, FamilyDetails: false, AccountRelated: false, SupportingDocument: true });
                setmoduleName('Supporting Document');
                setIdentification(8);

                break;
            }
            default: {
                setleftTimeline({ ...leftTimeline, AccountRelated: false, Address: false, Contacts: false, CustomerDetails: true, FamilyDetails: false, IndividualProfile: false, CustomerProfile: false, SupportingDocument: false });
                setmoduleName('Customer Details');
                setIdentification(9);
            }
        }
    };

    return (
        <Timeline
            items={[
                {
                    dot:
                        leftTimeline?.CustomerDetails && formActionType?.addMode ? (
                            <div className={styles.activeForm}>
                                <BsRecordCircleFill />
                            </div>
                        ) : Identification > 1 && formActionType?.addMode ? (
                            <FaCheckCircle />
                        ) : formActionType?.viewMode ? (
                            <FaCheckCircle />
                        ) : (
                            <BsRecordCircleFill style={{ color: '#b6b6b6' }} />
                        ),
                    children: <p onClick={() => onHandle('customerDetails')}>Customer Details</p>,
                },

                toggleButton === 'Firm/Company' && {
                    dot:
                        leftTimeline?.CompanyProfile && formActionType?.addMode ? (
                            <div className={styles.activeForm}>
                                <BsRecordCircleFill />
                            </div>
                        ) : Identification > 2 && formActionType?.addMode ? (
                            <FaCheckCircle />
                        ) : formActionType?.viewMode ? (
                            <FaCheckCircle />
                        ) : (
                            <BsRecordCircleFill style={{ color: '#b6b6b6' }} />
                        ),
                    children: <p onClick={() => onHandle('companyProfile')}>Company Profile</p>,
                },

                toggleButton === 'Individual' && {
                    dot:
                        leftTimeline?.IndividualProfile && formActionType?.addMode ? (
                            <div className={styles.activeForm}>
                                <BsRecordCircleFill />
                            </div>
                        ) : Identification > 3 && formActionType?.addMode ? (
                            <FaCheckCircle />
                        ) : formActionType?.viewMode ? (
                            <FaCheckCircle />
                        ) : (
                            <BsRecordCircleFill style={{ color: '#b6b6b6' }} />
                        ),
                    children: <p onClick={() => onHandle('individualProfile')}>Individual Profile</p>,
                },
                {
                    dot:
                        leftTimeline?.Address && formActionType?.addMode ? (
                            <div className={styles.activeForm}>
                                <BsRecordCircleFill />
                            </div>
                        ) : Identification > 4 && formActionType?.addMode ? (
                            <FaCheckCircle />
                        ) : formActionType?.viewMode ? (
                            <FaCheckCircle />
                        ) : (
                            <BsRecordCircleFill style={{ color: '#b6b6b6' }} />
                        ),
                    children: <p onClick={() => onHandle('address')}>Address</p>,
                },
                {
                    dot:
                        leftTimeline?.Contacts && formActionType?.addMode ? (
                            <div className={styles.activeForm}>
                                <BsRecordCircleFill />
                            </div>
                        ) : Identification > 5 && formActionType?.addMode ? (
                            <FaCheckCircle />
                        ) : formActionType?.viewMode ? (
                            <FaCheckCircle />
                        ) : (
                            <BsRecordCircleFill style={{ color: '#b6b6b6' }} />
                        ),
                    children: <p onClick={() => onHandle('contacts')}>Contact</p>,
                },
                toggleButton === 'Individual' && {
                    dot:
                        leftTimeline?.FamilyDetails && formActionType?.addMode ? (
                            <div className={styles.activeForm}>
                                <BsRecordCircleFill />
                            </div>
                        ) : Identification > 6 && formActionType?.addMode ? (
                            <FaCheckCircle />
                        ) : formActionType?.viewMode ? (
                            <FaCheckCircle />
                        ) : (
                            <BsRecordCircleFill style={{ color: '#b6b6b6' }} />
                        ),
                    children: <p onClick={() => onHandle('familyDetails')}>Family Details</p>,
                },
                {
                    dot:
                        leftTimeline?.AccountRelated && formActionType?.addMode ? (
                            <div className={styles.activeForm}>
                                <BsRecordCircleFill />
                            </div>
                        ) : Identification > 7 && formActionType?.addMode ? (
                            <FaCheckCircle />
                        ) : formActionType?.viewMode ? (
                            <FaCheckCircle />
                        ) : (
                            <BsRecordCircleFill style={{ color: '#b6b6b6' }} />
                        ),
                    children: <p onClick={() => onHandle('accountRelated')}>Account Related</p>,
                },

                {
                    dot:
                        leftTimeline?.SupportingDocument && formActionType?.addMode ? (
                            <div className={styles.activeForm}>
                                <BsRecordCircleFill />
                            </div>
                        ) : Identification >= 8 && formActionType?.addMode ? (
                            <FaCheckCircle />
                        ) : formActionType?.viewMode ? (
                            <FaCheckCircle />
                        ) : (
                            <BsRecordCircleFill style={{ color: '#b6b6b6' }} />
                        ),
                    children: <p onClick={() => onHandle('SupportingDocument')}>Supporting Documents</p>,
                },
            ]}
        />
    );
};

export default FormProgressBar;
