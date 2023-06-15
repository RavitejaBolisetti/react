import React from 'react';
import { Timeline } from 'antd';
import { BsRecordCircleFill } from 'react-icons/bs';
import { FaCheckCircle } from 'react-icons/fa';
import styles from 'components/common/Common.module.css';
const OtfStatusBar = (props) => {
    const onHandle = () => {};
    return (
        <Timeline
            items={[
                {
                    dot: false ? (
                        <div className={styles.activeForm}>
                            <BsRecordCircleFill />
                        </div>
                    ) : (
                        <FaCheckCircle />
                    ),
                    children: <p onClick={() => onHandle('otfDetails')}>Booked</p>,
                },
                {
                    dot: false ? (
                        <BsRecordCircleFill className={styles.activeForm} />
                    ) : (
                        <div className={styles.inactiveForm}>
                            <FaCheckCircle />
                        </div>
                    ),
                    children: <p onClick={() => onHandle('customerDetails')}>Alloted</p>,
                },
                {
                    dot: false ? (
                        <BsRecordCircleFill className={styles.activeForm} />
                    ) : (
                        <div className={styles.inactiveForm}>
                            <FaCheckCircle />
                        </div>
                    ),
                    children: <p onClick={() => onHandle('vehicleDetails')}>Cancelled</p>,
                },
                {
                    dot: false ? (
                        <BsRecordCircleFill className={styles.activeForm} />
                    ) : (
                        <div className={styles.inactiveForm}>
                            <FaCheckCircle />
                        </div>
                    ),
                    children: <p onClick={() => onHandle('schemeOfferDetails')}>Invoiced</p>,
                },
                {
                    dot: false ? (
                        <BsRecordCircleFill className={styles.activeForm} />
                    ) : (
                        <div className={styles.inactiveForm}>
                            <FaCheckCircle />
                        </div>
                    ),
                    children: <p onClick={() => onHandle('insuranceDetails')}>Delivered</p>,
                },
            ]}
        />
    );
};

export default OtfStatusBar;
