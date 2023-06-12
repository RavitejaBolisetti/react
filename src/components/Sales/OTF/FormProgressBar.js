import React from 'react';
import { Timeline, Progress } from 'antd';
import { BsRecordCircleFill } from 'react-icons/bs';
import { FaCheckCircle } from 'react-icons/fa';

const FormProgressBar = (props) => {
    const { leftTimeline, setleftTimeline, moduleName, setmoduleName } = props;
    const onHandle = (key) => {
        switch (key) {
            case 'otfDetails':
                setleftTimeline({ ...leftTimeline, otfDetails: true, customerDetails: false, vehicleDetails: false, fiananceDetails: false, schemeDetails: false, insuranceDetails: false, exchangeVehicle: false, referrals: false, loyaltyScheme: false, addOnDetails: false });
                setmoduleName('OTF Details');
                break;

            case 'customerDetails':
                setleftTimeline({ ...leftTimeline, otfDetails: false, customerDetails: true, vehicleDetails: false, fiananceDetails: false, schemeDetails: false, insuranceDetails: false, exchangeVehicle: false, referrals: false, loyaltyScheme: false, addOnDetails: false });
                setmoduleName('Customer Details');

                break;

            case 'vehicleDetails':
                setleftTimeline({ ...leftTimeline, otfDetails: false, customerDetails: false, vehicleDetails: true, fiananceDetails: false, schemeDetails: false, insuranceDetails: false, exchangeVehicle: false, referrals: false, loyaltyScheme: false, addOnDetails: false });
                setmoduleName('Vehicle Details');

                break;

            case 'schemeDetails':
                setleftTimeline({ ...leftTimeline, otfDetails: false, customerDetails: false, vehicleDetails: false, fiananceDetails: false, schemeDetails: true, insuranceDetails: false, exchangeVehicle: false, referrals: false, loyaltyScheme: false, addOnDetails: false });
                setmoduleName('Scheme Details');

                break;

            case 'insuranceDetails':
                setleftTimeline({ ...leftTimeline, otfDetails: false, customerDetails: false, vehicleDetails: false, fiananceDetails: false, schemeDetails: false, insuranceDetails: true, exchangeVehicle: false, referrals: false, loyaltyScheme: false, addOnDetails: false });
                setmoduleName('Insurance Details');

                break;

            case 'financeDetails':
                setleftTimeline({ ...leftTimeline, otfDetails: false, customerDetails: false, vehicleDetails: false, fiananceDetails: true, schemeDetails: false, insuranceDetails: false, exchangeVehicle: false, referrals: false, loyaltyScheme: false, addOnDetails: false });
                setmoduleName('Finance Details');

                break;

            case 'exchangeVehicles':
                setleftTimeline({ ...leftTimeline, otfDetails: false, customerDetails: false, vehicleDetails: false, fiananceDetails: false, schemeDetails: false, insuranceDetails: false, exchangeVehicle: true, referrals: false, loyaltyScheme: false, addOnDetails: false });
                setmoduleName('Exchange vehicle');

                break;

            case 'referrals':
                setleftTimeline({ ...leftTimeline, otfDetails: false, customerDetails: false, vehicleDetails: false, fiananceDetails: false, schemeDetails: false, insuranceDetails: false, exchangeVehicle: false, referrals: true, loyaltyScheme: false, addOnDetails: false });
                setmoduleName('Referrals');

                break;

            case 'loyaltyScheme':
                setleftTimeline({ ...leftTimeline, otfDetails: false, customerDetails: false, vehicleDetails: false, fiananceDetails: false, schemeDetails: false, insuranceDetails: false, exchangeVehicle: false, referrals: false, loyaltyScheme: true });
                setmoduleName('Loyalty scheme');

                break;

            case 'addOnDetails':
                setleftTimeline({ ...leftTimeline, otfDetails: false, customerDetails: false, vehicleDetails: false, fiananceDetails: false, schemeDetails: false, insuranceDetails: false, exchangeVehicle: false, referrals: false, loyaltyScheme: false, addOnDetails: true });
                setmoduleName('Add On Details');

                break;

            default:
                setleftTimeline({ ...leftTimeline, otfDetails: true, customerDetails: false, vehicleDetails: false, fiananceDetails: false, schemeDetails: false, insuranceDetails: false, exchangeVehicle: false, referrals: false, loyaltyScheme: false, addOnDetails: false });
                setmoduleName('OTF Details');
        }
    };
    return (
        <Timeline
            items={[
                {
                    dot: <BsRecordCircleFill color="#ff3e5b" />,
                    children: (
                        <>
                            <p onClick={() => onHandle('otfDetails')}>Otf Details</p>
                            <Progress percent={60} size="small" />
                        </>
                    ),
                },
                {
                    dot: <FaCheckCircle />,
                    children: (
                        <>
                            <p onClick={() => onHandle('customerDetails')}>Customer Details</p>
                            <Progress percent={100} size="small" />
                        </>
                    ),
                },
                {
                    dot: <FaCheckCircle />,
                    children: (
                        <>
                            <p onClick={() => onHandle('vehicleDetails')}>Vehicle Details</p>
                            <Progress percent={100} size="small" />
                        </>
                    ),
                },
                {
                    dot: <FaCheckCircle />,
                    children: (
                        <>
                            <p onClick={() => onHandle('schemeDetails')}>Scheme Details</p>
                            <Progress percent={100} size="small" />
                        </>
                    ),
                },
                {
                    dot: <FaCheckCircle />,
                    children: (
                        <>
                            <p onClick={() => onHandle('insuranceDetails')}>Insurance Details</p>
                            <Progress percent={100} size="small" />
                        </>
                    ),
                },
                {
                    dot: <FaCheckCircle />,
                    children: (
                        <>
                            <p onClick={() => onHandle('financeDetails')}>Finance Details</p>
                            <Progress percent={100} size="small" />
                        </>
                    ),
                },
                {
                    dot: <FaCheckCircle />,
                    children: (
                        <>
                            <p onClick={() => onHandle('exchangeVehicles')}>Exchange Vehicle</p>
                            <Progress percent={100} size="small" />
                        </>
                    ),
                },
                {
                    dot: <FaCheckCircle />,
                    children: (
                        <>
                            <p onClick={() => onHandle('referrals')}>Referrals</p>
                            <Progress percent={100} size="small" />
                        </>
                    ),
                },
                {
                    dot: <FaCheckCircle />,
                    children: (
                        <>
                            <p onClick={() => onHandle('loyaltyScheme')}>Loyalty Scheme</p>
                            <Progress percent={100} size="small" />
                        </>
                    ),
                },
                {
                    dot: <FaCheckCircle />,
                    children: (
                        <>
                            <p onClick={() => onHandle('addOnDetails')}>Add-On Details</p>
                            <Progress percent={10} size="small" />
                        </>
                    ),
                },
            ]}
        />
    );
};

export default FormProgressBar;
