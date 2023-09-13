/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Row, Col, Timeline, Card, Button } from 'antd';
import moment from 'moment';
import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';
import { FaCheckCircle } from 'react-icons/fa';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';
import { BsRecordCircleFill } from 'react-icons/bs';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { DATA_TYPE } from 'constants/dataType';
import { DELIVERY_STATUS_CONSTANT } from './utils/DeliveryStatusConstant';

import styles from 'assets/sass/app.module.scss';

export const ViewTimelineMain = (props) => {
    const { buttonData, setButtonData, handleButtonClick, formData, onCloseAction } = props;
    const [locationVisiblity, setLocationVisiblity] = useState(false);
    const buttonProps = {
        formData,
        onCloseAction,
        buttonData,
        setButtonData,
        handleButtonClick,
    };

    const handleVisiblity = () => {
        setLocationVisiblity(!locationVisiblity);
    };
    const checkboxStatus = Object.values(DELIVERY_STATUS_CONSTANT).find((status) => status?.title === formData?.shipmentStatus);

    const mapIconAndClass = (id) => {
        let activeClassName = '';
        let menuNavIcon = '';
        switch (true) {
            case id === checkboxStatus.id: {
                activeClassName = styles.active;
                menuNavIcon = <BsRecordCircleFill size={20} className={styles.activeForm} />;
                break;
            }
            case id > checkboxStatus.id: {
                activeClassName = styles.AddmodeinActive;
                menuNavIcon = <BsRecordCircleFill size={20} className={styles.tableTextColor85} />;
                break;
            }
            case id < checkboxStatus.id: {
                activeClassName = styles.inActive;
                menuNavIcon = <FaCheckCircle style={{ color: '#70C922' }} size={20} />;
                break;
            }
            default: {
                break;
            }
        }
        return { activeClassName, menuNavIcon };
    };

    const addKeys = (value) => {
        const id = value?.length;
        switch (true) {
            case id === 1: {
                value.push({ order: 2, title: 'In Transit', vehicleTrackingLocationResponse: [{ time: '12:00' }] }, { order: 3, title: 'Delivered', vehicleTrackingLocationResponse: [{ time: '12:00' }] }, { order: 4, title: 'Received', vehicleTrackingLocationResponse: [] });
                break;
            }
            case id === 2: {
                value.push({ order: 3, title: 'Delivered', vehicleTrackingLocationResponse: [{ time: '12:00' }] }, { order: 4, title: 'Received', vehicleTrackingLocationResponse: [] });
                break;
            }
            case id === 3: {
                value.push({ order: 4, title: 'Received', vehicleTrackingLocationResponse: [] });
                break;
            }
            default: {
                break;
            }
        }
        return value;
    };
    const totalKeys = addKeys(formData?.vehicleTrackingDeliveryStatus);

    const modifiedData = totalKeys
        ?.sort((a, b) => a?.order - b?.order)
        ?.map((record) => {
            return {
                dot: mapIconAndClass(record?.order)?.menuNavIcon,
                className: mapIconAndClass(record?.order)?.activeClassName,
                label: (
                    <>
                        <div>{record?.vehicleTrackingLocationResponse?.length > 0 && record?.vehicleTrackingLocationResponse[0]?.dateAndTime && checkAndSetDefaultValue(moment(record?.vehicleTrackingLocationResponse[0]?.dateAndTime).format('L'), false, DATA_TYPE?.DATE?.key)}</div>
                        <div>{record?.vehicleTrackingLocationResponse?.length > 0 && record?.vehicleTrackingLocationResponse[0]?.dateAndTime && moment(record?.vehicleTrackingLocationResponse[0]?.dateAndTime).format('LT')}</div>
                    </>
                ),
                children: (
                    <>
                        <Card className={styles.timelineCard}>
                            <div style={{ paddingBottom: '10px' }}>{record?.title}</div>
                            {record?.vehicleTrackingLocationResponse?.map((locations, index) => {
                                if (record?.title === DELIVERY_STATUS_CONSTANT?.DELIVERED?.title) {
                                    return (
                                        <Card>
                                            <span>Expected Date of Delivery: {checkAndSetDefaultValue(formData?.etaDateAndTime, false, DATA_TYPE?.DATE?.key)}</span>
                                        </Card>
                                    );
                                } else if (record?.title === DELIVERY_STATUS_CONSTANT?.DISPATCHED?.title) {
                                    return (
                                        <Card>
                                            <span>{`${locations?.locationName} (Plant Name)`}</span>
                                        </Card>
                                    );
                                } else if (index === 2) {
                                    return (
                                        <>
                                            {locationVisiblity && (
                                                <Card>
                                                    <span>{locations?.locationName}</span>
                                                </Card>
                                            )}
                                            {!locationVisiblity && (
                                                <Button icon={locationVisiblity ? <SlArrowUp /> : <SlArrowDown />} onClick={handleVisiblity} type="link">
                                                    {locationVisiblity ? 'See Less' : 'See More'}
                                                </Button>
                                            )}
                                        </>
                                    );
                                } else if (index > 2) {
                                    return (
                                        <>
                                            {locationVisiblity && (
                                                <Card>
                                                    <span>{locations?.locationName}</span>
                                                </Card>
                                            )}
                                            {locationVisiblity && (
                                                <Button icon={locationVisiblity ? <SlArrowUp /> : <SlArrowDown />} onClick={handleVisiblity} type="link">
                                                    {locationVisiblity ? 'See Less' : 'See More'}
                                                </Button>
                                            )}
                                        </>
                                    );
                                } else {
                                    return (
                                        <Card>
                                            <span>{locations?.locationName}</span>
                                        </Card>
                                    );
                                }
                            })}
                        </Card>
                    </>
                ),
            };
        });
    console.log('modifiedData', modifiedData);
    console.log('formData   ', formData);
    return (
        <>
            <Row gutter={20} className={styles.drawerBody}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Timeline mode={'left'} items={modifiedData} />
                </Col>
            </Row>
            <DrawerFormButton {...buttonProps} />
        </>
    );
};

export const ViewTimeline = withDrawer(ViewTimelineMain, {});
