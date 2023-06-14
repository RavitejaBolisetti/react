import React, { useEffect } from 'react';
import { Timeline } from 'antd';
import { BsRecordCircleFill } from 'react-icons/bs';
import { FaCheckCircle } from 'react-icons/fa';
import styles from 'components/common/Common.module.css';

const FormProgressBar = (props) => {
    const { leftTimeline, setleftTimeline, setmoduleName, isVisible } = props;
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
            case 'otfDetails':
                setleftTimeline({ ...leftTimeline, otfDetails: true, customerDetails: false, vehicleDetails: false, fiananceDetails: false, schemeDetails: false, insuranceDetails: false, exchangeVehicle: false, referrals: false, loyaltyScheme: false, invoiceDetails: false, addOnDetails: false });
                setmoduleName('OTF Details');
                break;

            case 'customerDetails':
                setleftTimeline({ ...leftTimeline, otfDetails: false, customerDetails: true, vehicleDetails: false, fiananceDetails: false, schemeDetails: false, insuranceDetails: false, exchangeVehicle: false, referrals: false, loyaltyScheme: false, invoiceDetails: false, addOnDetails: false });
                setmoduleName('Customer Details');

                break;

            case 'vehicleDetails':
                setleftTimeline({ ...leftTimeline, otfDetails: false, customerDetails: false, vehicleDetails: true, fiananceDetails: false, schemeDetails: false, insuranceDetails: false, exchangeVehicle: false, referrals: false, loyaltyScheme: false, invoiceDetails: false, addOnDetails: false });
                setmoduleName('Vehicle Details');

                break;

            case 'schemeOfferDetails':
                setleftTimeline({ ...leftTimeline, otfDetails: false, customerDetails: false, vehicleDetails: false, fiananceDetails: false, schemeDetails: true, insuranceDetails: false, exchangeVehicle: false, referrals: false, loyaltyScheme: false, invoiceDetails: false, addOnDetails: false });
                setmoduleName('Scheme and Offer Details');

                break;

            case 'insuranceDetails':
                setleftTimeline({ ...leftTimeline, otfDetails: false, customerDetails: false, vehicleDetails: false, fiananceDetails: false, schemeDetails: false, insuranceDetails: true, exchangeVehicle: false, referrals: false, loyaltyScheme: false, invoiceDetails: false, addOnDetails: false });
                setmoduleName('Insurance Details');

                break;

            case 'financeDetails':
                setleftTimeline({ ...leftTimeline, otfDetails: false, customerDetails: false, vehicleDetails: false, fiananceDetails: true, schemeDetails: false, insuranceDetails: false, exchangeVehicle: false, referrals: false, loyaltyScheme: false, invoiceDetails: false, addOnDetails: false });
                setmoduleName('Finance Details');

                break;

            case 'exchangeVehicles':
                setleftTimeline({ ...leftTimeline, otfDetails: false, customerDetails: false, vehicleDetails: false, fiananceDetails: false, schemeDetails: false, insuranceDetails: false, exchangeVehicle: true, referrals: false, loyaltyScheme: false, invoiceDetails: false, addOnDetails: false });
                setmoduleName('Exchange vehicle');

                break;

            case 'referrals':
                setleftTimeline({ ...leftTimeline, otfDetails: false, customerDetails: false, vehicleDetails: false, fiananceDetails: false, schemeDetails: false, insuranceDetails: false, exchangeVehicle: false, referrals: true, loyaltyScheme: false, invoiceDetails: false, addOnDetails: false });
                setmoduleName('Referrals');

                break;

            case 'loyaltyScheme':
                setleftTimeline({ ...leftTimeline, otfDetails: false, customerDetails: false, vehicleDetails: false, fiananceDetails: false, schemeDetails: false, insuranceDetails: false, exchangeVehicle: false, referrals: false, invoiceDetails: false, loyaltyScheme: true });
                setmoduleName('Loyalty scheme');

                break;
            case 'invoiceInformation':
                setleftTimeline({ ...leftTimeline, otfDetails: false, customerDetails: false, vehicleDetails: false, fiananceDetails: false, schemeDetails: false, insuranceDetails: false, exchangeVehicle: false, referrals: false, loyaltyScheme: false, invoiceDetails: true, addOnDetails: false });
                setmoduleName('Invoice Information');

                break;

            case 'addOnDetails':
                setleftTimeline({ ...leftTimeline, otfDetails: false, customerDetails: false, vehicleDetails: false, fiananceDetails: false, schemeDetails: false, insuranceDetails: false, exchangeVehicle: false, referrals: false, loyaltyScheme: false, invoiceDetails: false, addOnDetails: true });
                setmoduleName('Add On Details');

                break;

            default:
                setleftTimeline({ ...leftTimeline, otfDetails: true, customerDetails: false, vehicleDetails: false, fiananceDetails: false, schemeDetails: false, insuranceDetails: false, exchangeVehicle: false, referrals: false, loyaltyScheme: false, invoiceDetails: false, addOnDetails: false });
                setmoduleName('OTF Details');
        }
    };
    return (
        <Timeline
            items={[
                {
                    dot: leftTimeline?.otfDetails ? (
                        <div className={styles.activeForm}>
                            <BsRecordCircleFill />
                        </div>
                    ) : (
                        <FaCheckCircle />
                    ),
                    children: <p onClick={() => onHandle('otfDetails')}>OTF Details</p>,
                },
                {
                    dot: leftTimeline?.customerDetails ? (
                        <BsRecordCircleFill className={styles.activeForm} />
                    ) : (
                        <div className={styles.inactiveForm}>
                            <FaCheckCircle />
                        </div>
                    ),
                    children: <p onClick={() => onHandle('customerDetails')}>Customer Details</p>,
                },
                {
                    dot: leftTimeline?.vehicleDetails ? (
                        <BsRecordCircleFill className={styles.activeForm} />
                    ) : (
                        <div className={styles.inactiveForm}>
                            <FaCheckCircle />
                        </div>
                    ),
                    children: <p onClick={() => onHandle('vehicleDetails')}>Vehicle Details</p>,
                },
                {
                    dot: leftTimeline?.schemeDetails ? (
                        <BsRecordCircleFill className={styles.activeForm} />
                    ) : (
                        <div className={styles.inactiveForm}>
                            <FaCheckCircle />
                        </div>
                    ),
                    children: <p onClick={() => onHandle('schemeOfferDetails')}>Scheme and Offer Details</p>,
                },
                {
                    dot: leftTimeline?.insuranceDetails ? (
                        <BsRecordCircleFill className={styles.activeForm} />
                    ) : (
                        <div className={styles.inactiveForm}>
                            <FaCheckCircle />
                        </div>
                    ),
                    children: <p onClick={() => onHandle('insuranceDetails')}>Insurance Details</p>,
                },
                {
                    dot: leftTimeline?.fiananceDetails ? (
                        <BsRecordCircleFill className={styles.activeForm} />
                    ) : (
                        <div className={styles.inactiveForm}>
                            <FaCheckCircle />
                        </div>
                    ),
                    children: <p onClick={() => onHandle('financeDetails')}>Finance Details</p>,
                },
                {
                    dot: leftTimeline?.exchangeVehicle ? (
                        <BsRecordCircleFill className={styles.activeForm} />
                    ) : (
                        <div className={styles.inactiveForm}>
                            <FaCheckCircle />
                        </div>
                    ),
                    children: <p onClick={() => onHandle('exchangeVehicles')}>Exchange Vehicle</p>,
                },
                {
                    dot: leftTimeline?.invoiceDetails ? (
                        <BsRecordCircleFill className={styles.activeForm} />
                    ) : (
                        <div className={styles.inactiveForm}>
                            <FaCheckCircle />
                        </div>
                    ),
                    children: <p onClick={() => onHandle('invoiceInformation')}>Invoice Information</p>,
                },
                {
                    dot: leftTimeline?.referrals ? (
                        <BsRecordCircleFill className={styles.activeForm} />
                    ) : (
                        <div className={styles.inactiveForm}>
                            <FaCheckCircle />
                        </div>
                    ),
                    children: <p onClick={() => onHandle('referrals')}>Referrals</p>,
                },
                {
                    dot: leftTimeline?.loyaltyScheme ? (
                        <BsRecordCircleFill className={styles.activeForm} />
                    ) : (
                        <div className={styles.inactiveForm}>
                            <FaCheckCircle />
                        </div>
                    ),
                    children: <p onClick={() => onHandle('loyaltyScheme')}>Loyalty Scheme</p>,
                },
                {
                    dot: leftTimeline?.addOnDetails ? (
                        <BsRecordCircleFill className={styles.activeForm} />
                    ) : (
                        <div className={styles.inactiveForm}>
                            <FaCheckCircle />
                        </div>
                    ),
                    children: <p onClick={() => onHandle('addOnDetails')}>Add-On Details</p>,
                },
            ]}
        />
    );
};

export default FormProgressBar;
