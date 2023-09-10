/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Row, Col, Timeline, Card } from 'antd';
import moment from 'moment';
import { withDrawer } from 'components/withDrawer';
import { DrawerFormButton } from 'components/common/Button';
import { FaCheckCircle } from 'react-icons/fa';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { DATA_TYPE } from 'constants/dataType';
import { DELIVERY_STATUS_CONSTANT } from './utils/DeliveryStatusConstant';

import styles from 'assets/sass/app.module.scss';

export const ViewTimelineMain = (props) => {
    const { buttonData, setButtonData, handleButtonClick, formData, onCloseAction } = props;

    const buttonProps = {
        formData,
        onCloseAction,
        buttonData,
        setButtonData,
        handleButtonClick,
    };
    const modifiedData = formData?.vehicleTrackingDeliveryStatus
        ?.sort((a, b) => a?.order - b?.order)
        ?.map((record) => {
            return {
                dot: <FaCheckCircle size={20} />,
                label: (
                    <>
                        <div>{checkAndSetDefaultValue(moment(record?.vehicleTrackingLocationResponse[0]?.dateAndTime).format('L'), false, DATA_TYPE?.DATE?.key)}</div>
                        <div>{moment(record?.vehicleTrackingLocationResponse[0]?.dateAndTime).format('LT')}</div>
                    </>
                ),
                children: (
                    <>
                        <Card className={styles.timelineCard}>
                            <div style={{ paddingBottom: '10px' }}>{record?.title}</div>
                            {record?.vehicleTrackingLocationResponse?.map((locations) => {
                                if (record?.title === DELIVERY_STATUS_CONSTANT?.DELIVERED?.title) {
                                    return (
                                        <Card>
                                            <span>Expected Date of Delivery: {checkAndSetDefaultValue(formData?.etaDateAndTime, false, DATA_TYPE?.DATE?.key)}</span>
                                        </Card>
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
