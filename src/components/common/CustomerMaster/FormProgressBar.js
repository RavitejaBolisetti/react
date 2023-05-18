import React from 'react';
import { Timeline, Progress, Button } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { BsRecordCircleFill } from 'react-icons/bs';
import { FaCheckCircle } from 'react-icons/fa';

const FormProgressBar = (props) => {
    const { leftTimeline, setleftTimeline } = props;
    const onHandle = (key) => {
        switch (key) {
            case 'details': {
                setleftTimeline({ ...leftTimeline, AccountRelated: false, Address: false, Contacts: false, CustomerDetails: true, FamilyDetails: false, IndividualProfile: false, customerProfile: false });
                break;
            }
            case 'profile': {
                setleftTimeline({ ...leftTimeline, AccountRelated: false, Address: false, Contacts: false, CustomerDetails: false, FamilyDetails: false, IndividualProfile: true, customerProfile: false });
                break;
            }
            case 'address': {
                setleftTimeline({ ...leftTimeline, AccountRelated: false, Address: true, Contacts: false, CustomerDetails: false, FamilyDetails: false, IndividualProfile: false, customerProfile: false });
                break;
            }
            case 'contact': {
                setleftTimeline({ ...leftTimeline, AccountRelated: false, Address: false, Contacts: true, CustomerDetails: false, FamilyDetails: false, IndividualProfile: false, customerProfile: false });
                break;
            }
            case 'account': {
                setleftTimeline({ ...leftTimeline, AccountRelated: true, Address: false, Contacts: false, CustomerDetails: false, FamilyDetails: false, IndividualProfile: false, customerProfile: false });
                break;
            }
            case 'family': {
                setleftTimeline({ ...leftTimeline, AccountRelated: false, Address: false, Contacts: false, CustomerDetails: false, FamilyDetails: true, IndividualProfile: false, customerProfile: false });
                break;
            }
            case 'customerprofile': {
                setleftTimeline({ ...leftTimeline, AccountRelated: true, Address: false, Contacts: false, CustomerDetails: false, FamilyDetails: false, IndividualProfile: false, customerProfile: true });
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
                {
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
                {
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
                    children: (
                        <>
                            <Button onClick={() => onHandle('customerprofile')} type="link" danger>
                                Customer Profile
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
