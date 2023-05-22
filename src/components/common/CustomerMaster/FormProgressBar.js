import React from 'react';
import { Timeline, Progress, Button } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { BsRecordCircleFill } from 'react-icons/bs';
import { FaCheckCircle } from 'react-icons/fa';

const FormProgressBar = (props) => {
    const { leftTimeline, setleftTimeline, toggleButton, settoggleButton } = props;
    const onHandle = (key) => {
        switch (key) {
            case 'details': {
                setleftTimeline({ ...leftTimeline, AccountRelated: false, Address: false, Contacts: false, CustomerDetails: true, FamilyDetails: false, IndividualProfile: false, CustomerProfile: false });
                break;
            }
            case 'profile': {
                setleftTimeline({ ...leftTimeline, AccountRelated: false, Address: false, Contacts: false, CustomerDetails: false, FamilyDetails: false, IndividualProfile: true, CustomerProfile: false });
                break;
            }
            case 'address': {
                setleftTimeline({ ...leftTimeline, AccountRelated: false, Address: true, Contacts: false, CustomerDetails: false, FamilyDetails: false, IndividualProfile: false, CustomerProfile: false });
                break;
            }
            case 'contact': {
                setleftTimeline({ ...leftTimeline, AccountRelated: false, Address: false, Contacts: true, CustomerDetails: false, FamilyDetails: false, IndividualProfile: false, CustomerProfile: false });
                break;
            }
            case 'account': {
                setleftTimeline({ ...leftTimeline, AccountRelated: true, Address: false, Contacts: false, CustomerDetails: false, FamilyDetails: false, IndividualProfile: false, CustomerProfile: false });
                break;
            }
            case 'family': {
                setleftTimeline({ ...leftTimeline, AccountRelated: false, Address: false, Contacts: false, CustomerDetails: false, FamilyDetails: true, IndividualProfile: false, CustomerProfile: false });
                break;
            }
            case 'CustomerProfile': {
                setleftTimeline({ ...leftTimeline, AccountRelated: false, Address: false, Contacts: false, CustomerDetails: false, FamilyDetails: false, IndividualProfile: false, CustomerProfile: true });
                break;
            }
        }
    };
    return (
        <Timeline
            items={[
                {
                    dot: <BsRecordCircleFill color="#ff3e5b" />,
                    children: (
                        <>
                            <Button onClick={() => onHandle('details')} type="link" danger style={{ color: '#ff3e5b' }}>
                                Customer Details
                            </Button>
                            <Progress percent={60} size="small" />
                        </>
                    ),
                },
                toggleButton?.company && {
                    dot: <FaCheckCircle />,
                    children: (
                        <>
                            <Button onClick={() => onHandle('CustomerProfile')} type="link" danger>
                                Company Profile
                            </Button>
                            <Progress percent={100} size="small" />
                        </>
                    ),
                },
                toggleButton?.individual && {
                    dot: <FaCheckCircle />,
                    children: (
                        <>
                            <Button onClick={() => onHandle('profile')} type="link" danger>
                                Individual Profile
                            </Button>
                            <Progress percent={100} size="small" />
                        </>
                    ),
                },
                {
                    dot: <FaCheckCircle />,
                    children: (
                        <>
                            <Button onClick={() => onHandle('address')} type="link" danger>
                                Address
                            </Button>
                            <Progress percent={100} size="small" />
                        </>
                    ),
                },
                {
                    dot: <FaCheckCircle />,
                    children: (
                        <>
                            <Button onClick={() => onHandle('contact')} type="link" danger>
                                Contact
                            </Button>
                            <Progress percent={100} size="small" />
                        </>
                    ),
                },
                toggleButton?.individual && {
                    dot: <FaCheckCircle />,
                    children: (
                        <>
                            <Button onClick={() => onHandle('family')} type="link" danger>
                                Family Details
                            </Button>
                            <Progress percent={100} size="small" />
                        </>
                    ),
                },
                {
                    dot: <FaCheckCircle />,
                    children: (
                        <>
                            <Button onClick={() => onHandle('account')} type="link" danger>
                                Account Related
                            </Button>
                            <Progress percent={100} size="small" />
                        </>
                    ),
                },

                {
                    dot: <FaCheckCircle />,
                    children: 'Thank You',
                },
            ]}
        />
    );
};

export default FormProgressBar;
