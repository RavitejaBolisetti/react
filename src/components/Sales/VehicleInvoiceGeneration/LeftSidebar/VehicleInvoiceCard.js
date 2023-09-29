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
import { IRN_STATUS } from 'constants/IRNStatus';
import { InputSkeleton } from 'components/common/Skeleton';

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
    const { selectedOrder, formActionType, isLoading, typeData, handleIRNGeneration, isDataLoaded, isInVoiceMasterDetailDataLoaded } = props;
    const { confirmRequest, setConfirmRequest } = props;
    const fullName = selectedOrder?.customerName?.split(' ');
    const userAvatar = fullName ? fullName[0]?.slice(0, 1) + (fullName[1] ? fullName[1].slice(0, 1) : '') : '';
    if ((!isDataLoaded && !formActionType?.addMode) || (!isInVoiceMasterDetailDataLoaded && selectedOrder)) return <InputSkeleton height={80} count={3} />;
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
                                <Text>{checkAndSetDefaultValue(selectedOrder?.customerId)}</Text>
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
                            <span className={styles.tooltipAlign}>
                                {checkAndSetDefaultValue(getCodeValue(typeData[PARAM_MASTER.INVC_STATS.id], selectedOrder?.invoiceStatus))}
                                <span className={styles.marL5}>
                                    {selectedOrder?.invoiceStatus === QUERY_BUTTONS_CONSTANTS.CANCELLED.key &&
                                        addToolTip(
                                            <div>
                                                <p>
                                                    Cancelled Date: <span>{checkAndSetDefaultValue(selectedOrder?.cancelDate, isLoading, DATA_TYPE?.DATE?.key ?? 'Na')}</span>
                                                </p>
                                                <p>
                                                    Cancel By: <span>{selectedOrder?.cancelBy ?? 'Na'}</span>
                                                </p>
                                                <p>
                                                    Cancellation Reason: <span>{checkAndSetDefaultValue(getCodeValue(typeData[PARAM_MASTER.INVOICE_CANCEL_REASON.id], selectedOrder?.cancelReason))}</span>
                                                </p>
                                            </div>,
                                            'bottom',
                                            '#FFFFFF',
                                            styles.toolTip
                                        )(<AiOutlineInfoCircle className={styles.infoIconColor} size={13} />)}
                                </span>
                            </span>
                        </div>
                        <Divider />
                    </>
                )}
                {formActionType?.viewMode && selectedOrder?.gstin && (selectedOrder?.irnStatus || (selectedOrder?.invoiceNumber && !selectedOrder?.irnStatus && selectedOrder?.invoiceStatus === QUERY_BUTTONS_CONSTANTS.INVOICED.key)) && (
                    <>
                        <div className={styles.detailCardText}>
                            IRN Status:
                            <div className={styles.buttonsGroupRight}>
                                {selectedOrder?.invoiceNumber && !selectedOrder?.irnStatus && selectedOrder?.invoiceStatus === QUERY_BUTTONS_CONSTANTS.INVOICED.key ? (
                                    <>
                                        <Button onClick={showConfirmation} danger className={styles.leftPannelButton}>
                                            Generate
                                        </Button>
                                        <ConfirmationModal {...confirmModalRequest} />
                                    </>
                                ) : (
                                    <>
                                        {checkAndSetDefaultValue(getCodeValue(typeData[PARAM_MASTER.IRN_GEN_STATUS.id], selectedOrder?.irnStatus))}
                                        <div className={styles.tooltipAlign}>
                                            {selectedOrder?.irnStatus &&
                                                selectedOrder?.irnStatus !== IRN_STATUS?.PENDING?.key &&
                                                addToolTip(
                                                    <div>
                                                        <p>
                                                            IRN Date: <span>{checkAndSetDefaultValue(selectedOrder?.irnDate, isLoading, DATA_TYPE?.DATE?.key ?? 'Na')}</span>
                                                        </p>
                                                        <p>
                                                            IRN No.: <span>{selectedOrder?.irnNumber ?? 'Na'}</span>
                                                        </p>
                                                        <p>
                                                            Description: <span>{selectedOrder?.irnDesc ?? 'Na'}</span>
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
                    </>
                )}
                <div className={styles.detailCardText}>
                    Booking No.: <span>{checkAndSetDefaultValue(selectedOrder?.bookingNumber || selectedOrder?.otfNumber)}</span>
                </div>
                <Divider />
                <div className={styles.detailCardText}>
                    Booking Date: <span>{checkAndSetDefaultValue(selectedOrder?.orderDate ? selectedOrder?.orderDate : selectedOrder?.otfDate, isLoading, DATA_TYPE?.DATE?.key) || 'NA'}</span>
                </div>
            </Panel>
        </Collapse>
    );
};

export default VehicleInvoiceCard;
