/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Collapse, Space, Button, Avatar, Typography, Divider } from 'antd';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';
import { DATA_TYPE } from 'constants/dataType';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { addToolTip } from 'utils/customMenuLink';
import { getCodeValue } from 'utils/getCodeValue';
import { QUERY_BUTTONS_CONSTANTS } from '../QueryButtons';
import { PARAM_MASTER } from 'constants/paramMaster';

import { ConfirmationModal } from 'utils/ConfirmationModal';
import { IRN_STATUS } from 'constants/IRNStatus';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';

const { Panel } = Collapse;
const { Text, Title } = Typography;

const expandIcon = ({ isActive }) =>
    isActive ? (
        <>
            <span>{translateContent('global.buttons.seeLess')}</span>
            <SlArrowUp size={13} />
        </>
    ) : (
        <>
            <span>{translateContent('global.buttons.seeMore')}</span>
            <SlArrowDown size={13} />
        </>
    );

const LeftProfileCard = (props) => {
    const { profileCardData: selectedOrder, formActionType, typeData, handleIRNGeneration, isLoading } = props;
    const { confirmRequest, setConfirmRequest } = props;

    const fullName = selectedOrder?.customerName?.split(' ');
    const userAvatar = fullName ? fullName[0]?.slice(0, 1) + (fullName[1] ? fullName[1].slice(0, 1) : '') : '';

    const showConfirmation = () => {
        setConfirmRequest({
            isVisible: true,
            titleOverride: 'IRN Generation Confirmation',
            text: 'Do you want to generate IRN?',
            submitText: 'Yes',
            onCloseAction: onCloseAction,
            onSubmitAction: handleIRNGeneration,
        });
    };

    const onCloseAction = () => {
        setConfirmRequest({
            ...confirmRequest,
            isVisible: false,
        });
    };

    return (
        <Collapse bordered={true} expandIcon={expandIcon} collapsible="icon">
            <Panel
                header={
                    <>
                        <Space>
                            <Avatar size={50}>{userAvatar?.toUpperCase()}</Avatar>
                            <div>
                                <Title level={5}>{checkAndSetDefaultValue(selectedOrder?.customerName?.toLowerCase(), isLoading)}</Title>
                                <Text>{checkAndSetDefaultValue(selectedOrder?.customerId, isLoading)}</Text>
                            </div>
                        </Space>
                        <Divider />
                        <div className={styles.detailCardText}>
                            {translateContent('vehicleInvoiceGeneration.heading.profileCard.invoiceNumber')} <span>{checkAndSetDefaultValue(selectedOrder?.invoiceNumber, isLoading)}</span>
                        </div>
                    </>
                }
                key={1}
            >
                <Divider />
                <div className={styles.detailCardText}>
                    {translateContent('vehicleInvoiceGeneration.heading.profileCard.invoiceDate')} <span>{checkAndSetDefaultValue(selectedOrder?.invoiceDate, isLoading, DATA_TYPE?.DATE?.key) || 'NA'}</span>
                </div>
                <Divider />
                {formActionType?.viewMode && (
                    <>
                        <div className={styles.detailCardText}>
                            {translateContent('vehicleInvoiceGeneration.heading.profileCard.status')}
                            <span className={styles.tooltipAlign}>
                                {checkAndSetDefaultValue(getCodeValue(typeData[PARAM_MASTER.INVC_STATS.id], selectedOrder?.invoiceStatus))}
                                <span className={styles.marL5}>
                                    {selectedOrder?.invoiceStatus === QUERY_BUTTONS_CONSTANTS.CANCELLED.key &&
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
                                                    <span>{checkAndSetDefaultValue(getCodeValue(typeData[PARAM_MASTER.INVOICE_CANCEL_REASON.id], selectedOrder?.cancelReason))}</span>
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
                            {translateContent('vehicleInvoiceGeneration.heading.profileCard.irnStatus')}
                            <div className={styles.buttonsGroupRight}>
                                {selectedOrder?.invoiceNumber && !selectedOrder?.irnStatus && selectedOrder?.invoiceStatus === QUERY_BUTTONS_CONSTANTS.INVOICED.key ? (
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
                                            {selectedOrder?.irnStatus &&
                                                selectedOrder?.irnStatus !== IRN_STATUS?.PENDING?.key &&
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
                        <Divider />
                    </>
                )}
                <div className={styles.detailCardText}>
                    {translateContent('vehicleInvoiceGeneration.heading.profileCard.bookingNumber')}
                    <span>{checkAndSetDefaultValue(selectedOrder?.bookingNumber || selectedOrder?.otfNumber, isLoading)}</span>
                </div>
                <Divider />
                <div className={styles.detailCardText}>
                    {translateContent('vehicleInvoiceGeneration.heading.profileCard.bookingDate')}
                    <span>{checkAndSetDefaultValue(selectedOrder?.orderDate ? selectedOrder?.orderDate : selectedOrder?.otfDate, isLoading, DATA_TYPE?.DATE?.key) || 'NA'}</span>
                </div>
            </Panel>
        </Collapse>
    );
};

export default LeftProfileCard;
