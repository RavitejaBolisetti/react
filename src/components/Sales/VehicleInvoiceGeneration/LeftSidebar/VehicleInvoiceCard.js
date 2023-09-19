/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Collapse, Space, Button, Avatar, Typography, Divider } from 'antd';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';
import { DATA_TYPE } from 'constants/dataType';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { addToolTip } from 'utils/customMenuLink';
import { getCodeValue } from 'utils/getCodeValue';
import { QUERY_BUTTONS_CONSTANTS } from '../QueryButtons';
import { PARAM_MASTER } from 'constants/paramMaster';

import styles from 'assets/sass/app.module.scss';
import { ConfirmationModal } from 'utils/ConfirmationModal';

const { Panel } = Collapse;
const { Text, Title } = Typography;

const expandIcon = ({ isActive }) =>
    isActive ? (
        <>
            <span>See less</span>
            <SlArrowUp size={13} />
        </>
    ) : (
        <>
            <span>See more</span>
            <SlArrowDown size={13} />
        </>
    );

const VehicleInvoiceCard = (props) => {
    const { selectedOrder, otfData, formActionType, isLoading, typeData, handleIRNGeneration, irnStatusData } = props;
    const fullName = selectedOrder?.customerName?.split(' ');
    const userAvatar = fullName ? fullName[0]?.slice(0, 1) + (fullName[1] ? fullName[1].slice(0, 1) : '') : '';
    const [confirmRequest, setConfirmRequest] = useState(false);

    const showConfirmation = () => {
        setConfirmRequest(true);
    };

    const onConfirmationCloseAction = () => {
        setConfirmRequest(false);
    };

    const confirmModalRequest = {
        isVisible: confirmRequest,
        titleOverride: 'IRN Generation Confirmation',
        text: 'Do you want to generate IRN?',
        submitText: 'Yes',
        onCloseAction: onConfirmationCloseAction,
        onSubmitAction: handleIRNGeneration,
    };

    return (
        <Collapse bordered={true} defaultActiveKey={[1]} expandIcon={expandIcon} collapsible="icon">
            <Panel
                header={
                    <>
                        <Space>
                            <Avatar size={50}>{userAvatar?.toUpperCase()}</Avatar>
                            <div>
                                <Title level={5}>{selectedOrder?.customerName?.toLowerCase()}</Title>
                                <Text>{checkAndSetDefaultValue(otfData?.customerId)}</Text>
                            </div>
                        </Space>
                        <Divider />
                        <div className={styles.detailCardText}>
                            Invoice No.: <span>{checkAndSetDefaultValue(selectedOrder?.invoiceNumber)}</span>
                        </div>
                    </>
                }
                key={1}
            >
                <Divider />
                <div className={styles.detailCardText}>
                    Invoice Date: <span>{checkAndSetDefaultValue(selectedOrder?.invoiceDate, isLoading, DATA_TYPE?.DATE?.key) || 'NA'}</span>
                </div>
                <Divider />
                {formActionType?.viewMode && (
                    <>
                        <div className={styles.detailCardText}>
                            Status:
                            <span>
                                {checkAndSetDefaultValue(getCodeValue(typeData[PARAM_MASTER.INVC_STATS.id], selectedOrder?.invoiceStatus))}
                                <div className={styles.tooltipAlign}>
                                    {selectedOrder?.invoiceStatus === QUERY_BUTTONS_CONSTANTS.CANCELLED.key &&
                                        addToolTip(
                                            <div>
                                                <p>
                                                    Cancelled Date: <span>{checkAndSetDefaultValue(otfData?.cancelDate, isLoading, DATA_TYPE?.DATE?.key ?? 'Na')}</span>
                                                </p>
                                                <p>
                                                    Cancel By: <span>{otfData?.cancelBy ?? 'Na'}</span>
                                                </p>
                                                <p>
                                                    Cancellation Reason: <span>{otfData?.cancelReason ?? 'Na'}</span>
                                                </p>
                                            </div>,
                                            'bottom',
                                            '#FFFFFF',
                                            styles.toolTip
                                        )(<AiOutlineInfoCircle className={styles.infoIconColor} size={13} />)}
                                </div>
                            </span>
                        </div>
                        <Divider />
                    </>
                )}
                <div className={styles.detailCardText}>
                    IRN Status:
                    <div className={styles.buttonsGroupRight}>
                        {selectedOrder?.invoiceNumber && !irnStatusData?.irnStatus ? (
                            <>
                                <Button onClick={showConfirmation} type="primary" style={{ color: '#ffffff !important' }}>
                                    Generate
                                </Button>
                                <ConfirmationModal {...confirmModalRequest} />
                            </>
                        ) : (
                            <>
                                {checkAndSetDefaultValue(irnStatusData?.irnStatus)}
                                <div className={styles.tooltipAlign}>
                                    {irnStatusData?.irnStatus &&
                                        addToolTip(
                                            <div>
                                                <p>
                                                    IRN Date: <span>{checkAndSetDefaultValue(otfData?.irnDate, isLoading, DATA_TYPE?.DATE?.key ?? 'Na')}</span>
                                                </p>
                                                <p>
                                                    IRN No.: <span>{otfData?.irnNumber ?? 'Na'}</span>
                                                </p>
                                                <p>
                                                    Description: <span>{otfData?.irnDesc ?? 'Na'}</span>
                                                </p>
                                            </div>,
                                            'bottom',
                                            '#FFFFFF',
                                            styles.toolTip
                                        )(<AiOutlineInfoCircle className={styles.infoIconColor} size={13} />)}
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <Divider />
                <div className={styles.detailCardText}>
                    Booking No.: <span>{checkAndSetDefaultValue(selectedOrder?.bookingNumber || selectedOrder?.otfNumber)}</span>
                </div>
                <Divider />
                <div className={styles.detailCardText}>
                    Booking Date: <span>{checkAndSetDefaultValue(otfData?.otfDate, isLoading, DATA_TYPE?.DATE?.key) || 'NA'}</span>
                </div>
            </Panel>
        </Collapse>
    );
};

export default VehicleInvoiceCard;
