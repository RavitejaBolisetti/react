import React from 'react';
import { Timeline, Progress, Button } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { BsRecordCircleFill } from 'react-icons/bs';
import { FaCheckCircle } from 'react-icons/fa';
const FormProgressBar = (props) => {
    const { leftTimeline, setleftTimeline, toggleButton, settoggleButton } = props;
    const onHandle = (key) => {
        switch (key) {
            case 'otfDetails': {
                setleftTimeline({ ...leftTimeline, otfDetails: true, customerDetails: false, vehicleDetails: false, fiananceDetails: false, schemeDetails: false, insuranceDetails: false, exchangeVehicle: false, referrals: false, loyaltyScheme: false, addOnDetails: false });
                break;
            }
            case 'customerDetails': {
                setleftTimeline({ ...leftTimeline, otfDetails: false, customerDetails: true, vehicleDetails: false, fiananceDetails: false, schemeDetails: false, insuranceDetails: false, exchangeVehicle: false, referrals: false, loyaltyScheme: false,addOnDetails: false });

                break;
            }
            case 'vehicleDetails': {
                setleftTimeline({ ...leftTimeline, otfDetails: false, customerDetails: false, vehicleDetails: true, fiananceDetails: false, schemeDetails: false, insuranceDetails: false, exchangeVehicle: false, referrals: false, loyaltyScheme: false ,addOnDetails: false});

                break;
            }
            case 'schemeDetails': {
                setleftTimeline({ ...leftTimeline, otfDetails: false, customerDetails: false, vehicleDetails: false, fiananceDetails: false, schemeDetails: true, insuranceDetails: false, exchangeVehicle: false, referrals: false, loyaltyScheme: false ,addOnDetails: false});

                break;
            }
            case 'insuranceDetails': {
                setleftTimeline({ ...leftTimeline, otfDetails: false, customerDetails: false, vehicleDetails: false, fiananceDetails: false, schemeDetails: false, insuranceDetails: true, exchangeVehicle: false, referrals: false, loyaltyScheme: false,addOnDetails: false });

                break;
            }
            case 'financeDetails': {
                setleftTimeline({ ...leftTimeline, otfDetails: false, customerDetails: false, vehicleDetails: false, fiananceDetails: true, schemeDetails: false, insuranceDetails: false, exchangeVehicle: false, referrals: false, loyaltyScheme: false,addOnDetails: false });

                break;
            }
            case 'exchangeVehicles': {
                setleftTimeline({ ...leftTimeline, otfDetails: false, customerDetails: false, vehicleDetails: false, fiananceDetails: false, schemeDetails: false, insuranceDetails: false, exchangeVehicle: true, referrals: false, loyaltyScheme: false,addOnDetails: false });

                break;
            }
            case 'referrals': {
                setleftTimeline({ ...leftTimeline, otfDetails: false, customerDetails: false, vehicleDetails: false, fiananceDetails: false, schemeDetails: false, insuranceDetails: false, exchangeVehicle: false, referrals: true, loyaltyScheme: false,addOnDetails: false });

                break;
            }
            case 'loyaltyScheme': {
                setleftTimeline({ ...leftTimeline, otfDetails: true, customerDetails: false, vehicleDetails: false, fiananceDetails: false, schemeDetails: false, insuranceDetails: false, exchangeVehicle: false, referrals: false, loyaltyScheme: true ,addOnDetails: false});

                break;
            }
            case 'addOnDetails': {
                setleftTimeline({ ...leftTimeline, otfDetails: true, customerDetails: false, vehicleDetails: false, fiananceDetails: false, schemeDetails: false, insuranceDetails: false, exchangeVehicle: false, referrals: false, loyaltyScheme: true, addOnDetails: true });

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
                            <Button onClick={() => onHandle('otfDetails')} type="link" danger style={{ color: '#ff3e5b' }}>
                                Otf Details
                            </Button>
                            <Progress percent={60} size="small" />
                        </>
                    ),
                },
                {
                    dot: <FaCheckCircle />,
                    children: (
                        <>
                            <Button onClick={() => onHandle('customerDetails')} type="link" danger>
                                Customer Details
                            </Button>
                            <Progress percent={100} size="small" />
                        </>
                    ),
                },
                 {
                    dot: <FaCheckCircle />,
                    children: (
                        <>
                            <Button onClick={() => onHandle('vehicleDetails')} type="link" danger>
                                Vehicle Details
                            </Button>
                            <Progress percent={100} size="small" />
                        </>
                    ),
                },
                {
                    dot: <FaCheckCircle />,
                    children: (
                        <>
                            <Button onClick={() => onHandle('schemeDetails')} type="link" danger>
                                Scheme Details
                            </Button>
                            <Progress percent={100} size="small" />
                        </>
                    ),
                },
                {
                    dot: <FaCheckCircle />,
                    children: (
                        <>
                            <Button onClick={() => onHandle('insuranceDetails')} type="link" danger>
                                Insurance Details
                            </Button>
                            <Progress percent={100} size="small" />
                        </>
                    ),
                },
                {
                    dot: <FaCheckCircle />,
                    children: (
                        <>
                            <Button onClick={() => onHandle('financeDetails')} type="link" danger>
                                Finance Details
                            </Button>
                            <Progress percent={100} size="small" />
                        </>
                    ),
                },
                {
                    dot: <FaCheckCircle />,
                    children: (
                        <>
                            <Button onClick={() => onHandle('exchangeVehicles')} type="link" danger>
                                Exchange Vehicle
                            </Button>
                            <Progress percent={100} size="small" />
                        </>
                    ),
                },
                {
                    dot: <FaCheckCircle />,
                    children: (
                        <>
                            <Button onClick={() => onHandle('referrals')} type="link" danger>
                                Referrals
                            </Button>
                            <Progress percent={100} size="small" />
                        </>
                    ),
                },
                {
                    dot: <FaCheckCircle />,
                    children: (
                        <>
                            <Button onClick={() => onHandle('loyaltyScheme')} type="link" danger>
                                Loyalty Scheme
                            </Button>
                            <Progress percent={100} size="small" />
                        </>
                    ),
                },
                {
                    dot: <FaCheckCircle />,
                    children: (
                        <>
                            <Button onClick={() => onHandle('addOnDetails')} type="link" danger>
                                Add-On Details
                            </Button>
                            <Progress percent={10} size="small" />
                        </>
                    ),
                },
            ]}
        />
    );
};

export default FormProgressBar;
