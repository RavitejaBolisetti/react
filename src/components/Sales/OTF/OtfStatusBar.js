import React from 'react';
import { Steps } from 'antd';
import { BsRecordCircleFill } from 'react-icons/bs';
import { FaCheckCircle } from 'react-icons/fa';
import styles from 'components/common/Common.module.css';
const OtfStatusBar = (props) => {
    const onHandle = () => {};
    const items = [
        {
            title: 'Booked',
            icon: <FaCheckCircle />,
        },
        {
            title: 'Alloted',
            icon: <BsRecordCircleFill />,
        },
        {
            title: 'Cancelled',
            icon: <BsRecordCircleFill />,
        },
        {
            title: 'Invoiced',
            icon: <BsRecordCircleFill />,
        },
        {
            title: 'Delivered',
            icon: <BsRecordCircleFill />,
        },
    ];
    return <Steps current={0} size="small" labelPlacement="vertical" items={items} />;
};

export default OtfStatusBar;
