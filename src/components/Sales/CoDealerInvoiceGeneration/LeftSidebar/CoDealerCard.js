/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useMemo } from 'react';
import { Collapse, Space, Avatar, Typography, Divider, Button } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { DATA_TYPE } from 'constants/dataType';
import { getCodeValue } from 'utils/getCodeValue';
import { PARAM_MASTER } from 'constants/paramMaster';
import { addToolTip } from 'utils/customMenuLink';

import { AiOutlineInfoCircle } from 'react-icons/ai';
import { translateContent } from 'utils/translateContent';
import { CO_DEALER_QUERY_BUTTONS, IRN_CONSTANTS } from '../constants';
import { ConfirmationModal } from 'utils/ConfirmationModal';
import { seeMoreLessIcon } from 'utils/seeMoreLessIcon';

import styles from 'assets/sass/app.module.scss';

const { Panel } = Collapse;
const { Text, Title } = Typography;

const CoDealerCard = (props) => {
    const { selectedOrder, isLoading, formActionType, typeData, setConfirmRequest, confirmRequest, handleIRNGeneration } = props;
    const fullName = selectedOrder?.customerName?.split(' ');
    const userAvatar = fullName ? fullName[0]?.slice(0, 1) + (fullName[1] ? fullName[1].slice(0, 1) : '') : '';
    const CoDealerDetails = useMemo(() => {
        if (formActionType?.viewMode) {
            let showCancellation = false,
                showIrnGenrationButton = false,
                gstInPresent = false,
                showInfo = false;
            if (selectedOrder?.invoiceStatus === CO_DEALER_QUERY_BUTTONS?.CANCELLED?.key) {
                showCancellation = true;
            }
            if (selectedOrder?.invoiceStatus === CO_DEALER_QUERY_BUTTONS?.INVOICED?.key && selectedOrder?.gstin) {
                if (!selectedOrder?.irnStatus) {
                    showIrnGenrationButton = true;
                } else {
                    if ([IRN_CONSTANTS?.APPROVED?.key, IRN_CONSTANTS?.REJECTED?.key]?.includes(selectedOrder?.irnStatus)) {
                        showInfo = true;
                        showIrnGenrationButton = false;
                    } else {
                        showInfo = false;
                    }
                }
                gstInPresent = true;
            }

            return { showCancellation, showIrnGenrationButton, gstInPresent, showInfo };
        } else {
            return { showCancellation: false, showIrnDetails: false, showIrnGenration: false, gstInPresent: false, showInfo: false };
        }
    }, [formActionType, selectedOrder]);

    const closeConfirmIrn = () => {
        setConfirmRequest({
            ...confirmRequest,
            isVisible: false,
        });
    };
    const showConfirmation = () => {
        setConfirmRequest({
            isVisible: true,
            titleOverride: 'IRN Generation Confirmation',
            text: 'Do you want to generate IRN?',
            submitText: 'Yes',
            onCloseAction: closeConfirmIrn,
            onSubmitAction: handleIRNGeneration,
        });
    };
    return (
        <Collapse bordered={true} expandIcon={seeMoreLessIcon} collapsible="icon">
            <Panel
                header={
                    <>
                        <Space>
                            <Avatar size={50}>{userAvatar?.toUpperCase()}</Avatar>
                            <div>
                                <Title level={5}>{selectedOrder?.customerName?.toLowerCase()}</Title>
                                <Text>{selectedOrder?.customerId || 'NA'}</Text>
                            </div>
                        </Space>
                        <Divider />
                        <div className={styles.detailCardText}>
                            {translateContent('coDealer.label.profileCard.invoiceNumber')} : <span> {checkAndSetDefaultValue(selectedOrder?.invoiceNumber)}</span>
                        </div>
                    </>
                }
                key={1}
            >
                <Divider />
                <div className={styles.detailCardText}>
                    {translateContent('coDealer.label.profileCard.invoiceDate')} : <span> {checkAndSetDefaultValue(selectedOrder?.invoiceDate, isLoading) || 'NA'}</span>
                </div>
                <Divider />
                <div className={styles.detailCardText}>
                    {translateContent('coDealer.label.profileCard.invoiceStatus')} :
                    <span className={styles.tooltipAlign}>
                        {checkAndSetDefaultValue(getCodeValue(typeData?.[PARAM_MASTER.CO_DEALER_INVC_STATS.id], selectedOrder?.invoiceStatus))}
                        <span className={styles.marL5}>
                            {CoDealerDetails?.showCancellation &&
                                addToolTip(
                                    <div>
                                        <p>
                                            {translateContent('vehicleInvoiceGeneration.heading.profileCard.cancelDate')}
                                            <span>{checkAndSetDefaultValue(selectedOrder?.cancelDate, isLoading, DATA_TYPE?.DATE?.key ?? 'Na')}</span>
                                        </p>
                                        <p>
                                            {translateContent('vehicleInvoiceGeneration.heading.profileCard.cancelBy')}
                                            <span>{checkAndSetDefaultValue(selectedOrder?.cancelBy ?? 'Na', isLoading)}</span>
                                        </p>
                                        <p>
                                            {translateContent('vehicleInvoiceGeneration.heading.profileCard.cancelReason')}
                                            <span>{checkAndSetDefaultValue(getCodeValue(typeData?.[PARAM_MASTER.INVOICE_CANCEL_REASON.id], selectedOrder?.cancelReason))}</span>
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
                {CoDealerDetails?.gstInPresent && (
                    <div className={styles.detailCardText}>
                        {translateContent('vehicleInvoiceGeneration.heading.profileCard.irnStatus')}
                        <div className={styles.buttonsGroupRight}>
                            {CoDealerDetails?.showIrnGenrationButton ? (
                                <>
                                    <Button onClick={showConfirmation} danger className={styles.leftPannelButton}>
                                        {translateContent('vehicleInvoiceGeneration.buttons.generate')}
                                    </Button>
                                    <ConfirmationModal {...confirmRequest} />
                                </>
                            ) : (
                                <>
                                    {checkAndSetDefaultValue(getCodeValue(typeData[PARAM_MASTER.IRN_GEN_STATUS.id], selectedOrder?.irnStatus), isLoading)}
                                    <div className={styles.tooltipAlign}>
                                        {CoDealerDetails?.showInfo &&
                                            addToolTip(
                                                <div>
                                                    <p>
                                                        {translateContent('vehicleInvoiceGeneration.heading.profileCard.irnDate')}
                                                        <span>{checkAndSetDefaultValue(selectedOrder?.irnDate, isLoading, DATA_TYPE?.DATE?.key ?? 'Na')}</span>
                                                    </p>
                                                    <p>
                                                        {translateContent('vehicleInvoiceGeneration.heading.profileCard.irnNumber')}
                                                        <span>{checkAndSetDefaultValue(selectedOrder?.irnNumber ?? 'Na', isLoading)}</span>
                                                    </p>
                                                    <p>
                                                        {translateContent('vehicleInvoiceGeneration.heading.profileCard.description')}
                                                        <span>{checkAndSetDefaultValue(selectedOrder?.irnDesc ?? 'Na', isLoading)}</span>
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
                )}
            </Panel>
        </Collapse>
    );
};

export default CoDealerCard;
