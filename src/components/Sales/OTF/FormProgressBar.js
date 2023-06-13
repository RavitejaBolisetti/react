import React from 'react';
import { Timeline } from 'antd';
import { BsRecordCircleFill } from 'react-icons/bs';
import { FaCheckCircle } from 'react-icons/fa';

const FormProgressBar = (props) => {
    const { leftTimeline, setleftTimeline } = props;

    const onHandle = (key) => {
        switch (key) {
            case 'otfDetails':
                setleftTimeline({ ...leftTimeline, otfDetails: true, customerDetails: false, vehicleDetails: false, fiananceDetails: false, schemeDetails: false, insuranceDetails: false, exchangeVehicle: false, referrals: false, loyaltyScheme: false, addOnDetails: false, invoiceDetails: false });
                break;

            case 'customerDetails':
                setleftTimeline({ ...leftTimeline, otfDetails: false, customerDetails: true, vehicleDetails: false, fiananceDetails: false, schemeDetails: false, insuranceDetails: false, exchangeVehicle: false, referrals: false, loyaltyScheme: false, addOnDetails: false, invoiceDetails: false });

                break;

            case 'vehicleDetails':
                setleftTimeline({ ...leftTimeline, otfDetails: false, customerDetails: false, vehicleDetails: true, fiananceDetails: false, schemeDetails: false, insuranceDetails: false, exchangeVehicle: false, referrals: false, loyaltyScheme: false, addOnDetails: false, invoiceDetails: false });

                break;

            case 'schemeDetails':
                setleftTimeline({ ...leftTimeline, otfDetails: false, customerDetails: false, vehicleDetails: false, fiananceDetails: false, schemeDetails: true, insuranceDetails: false, exchangeVehicle: false, referrals: false, loyaltyScheme: false, addOnDetails: false, invoiceDetails: false });

                break;

            case 'insuranceDetails':
                setleftTimeline({ ...leftTimeline, otfDetails: false, customerDetails: false, vehicleDetails: false, fiananceDetails: false, schemeDetails: false, insuranceDetails: true, exchangeVehicle: false, referrals: false, loyaltyScheme: false, addOnDetails: false, invoiceDetails: false });

                break;

            case 'financeDetails':
                setleftTimeline({ ...leftTimeline, otfDetails: false, customerDetails: false, vehicleDetails: false, fiananceDetails: true, schemeDetails: false, insuranceDetails: false, exchangeVehicle: false, referrals: false, loyaltyScheme: false, addOnDetails: false, invoiceDetails: false });

                break;

            case 'exchangeVehicles':
                setleftTimeline({ ...leftTimeline, otfDetails: false, customerDetails: false, vehicleDetails: false, fiananceDetails: false, schemeDetails: false, insuranceDetails: false, exchangeVehicle: true, referrals: false, loyaltyScheme: false, addOnDetails: false, invoiceDetails: false });
                break;

            case 'referrals':
                setleftTimeline({ ...leftTimeline, otfDetails: false, customerDetails: false, vehicleDetails: false, fiananceDetails: false, schemeDetails: false, insuranceDetails: false, exchangeVehicle: false, referrals: true, loyaltyScheme: false, addOnDetails: false, invoiceDetails: false });
                break;

            case 'loyaltyScheme':
                setleftTimeline({ ...leftTimeline, otfDetails: false, customerDetails: false, vehicleDetails: false, fiananceDetails: false, schemeDetails: false, insuranceDetails: false, exchangeVehicle: false, referrals: false, loyaltyScheme: true, invoiceDetails: false });
                break;

            case 'addOnDetails':
                setleftTimeline({ ...leftTimeline, otfDetails: false, customerDetails: false, vehicleDetails: false, fiananceDetails: false, schemeDetails: false, insuranceDetails: false, exchangeVehicle: false, referrals: false, loyaltyScheme: false, addOnDetails: true, invoiceDetails: false });
                break;
            case 'invoiceDetails':
                setleftTimeline({ ...leftTimeline, otfDetails: false, customerDetails: false, vehicleDetails: false, fiananceDetails: false, schemeDetails: false, insuranceDetails: false, exchangeVehicle: false, referrals: false, loyaltyScheme: false, addOnDetails: false, invoiceDetails: true });
                break;

            default:
                setleftTimeline({ ...leftTimeline, otfDetails: true, customerDetails: false, vehicleDetails: false, fiananceDetails: false, schemeDetails: false, insuranceDetails: false, exchangeVehicle: false, referrals: false, loyaltyScheme: false, addOnDetails: false, invoiceDetails: false });
        }
    };
    return (
        <Timeline
            items={[
                {
                    dot: <BsRecordCircleFill color="#ff3e5b" />,
                    children: <p onClick={() => onHandle('otfDetails')}>Otf Details</p>,
                },
                {
                    dot: <FaCheckCircle />,
                    children: <p onClick={() => onHandle('customerDetails')}>Customer Details</p>,
                    // (
                    //     <>
                    //         <p onClick={() => onHandle('customerDetails')}>Customer Details</p>
                    //         <Progress percent={100} size="small" />
                    //     </>
                    // ),
                },
                {
                    dot: <FaCheckCircle />,
                    children: <p onClick={() => onHandle('vehicleDetails')}>Vehicle Details</p>,
                },
                {
                    dot: <FaCheckCircle />,
                    children: <p onClick={() => onHandle('schemeDetails')}>Scheme Details</p>,
                },
                {
                    dot: <FaCheckCircle />,
                    children: <p onClick={() => onHandle('insuranceDetails')}>Insurance Details</p>,
                },
                {
                    dot: <FaCheckCircle />,
                    children: <p onClick={() => onHandle('financeDetails')}>Finance Details</p>,
                },
                {
                    dot: <FaCheckCircle />,
                    children: <p onClick={() => onHandle('exchangeVehicles')}>Exchange Vehicle</p>,
                },
                {
                    dot: <FaCheckCircle />,
                    children: <p onClick={() => onHandle('referrals')}>Referrals</p>,
                },
                {
                    dot: <FaCheckCircle />,
                    children: <p onClick={() => onHandle('loyaltyScheme')}>Loyalty Scheme</p>,
                },
                {
                    dot: <FaCheckCircle />,
                    children: <p onClick={() => onHandle('invoiceDetails')}>Invoice/Delivery Details</p>,
                },
                {
                    dot: <FaCheckCircle />,
                    children: <p onClick={() => onHandle('addOnDetails')}>Add-On Details</p>,
                },
            ]}
        />
    );
};

export default FormProgressBar;
