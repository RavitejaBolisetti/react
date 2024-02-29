/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Collapse, Space, Button, Avatar, Typography, Divider } from 'antd';
import { AiOutlineInfoCircle } from 'react-icons/ai';

import { QUERY_BUTTONS_CONSTANTS } from '../QueryButtons';

import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { addToolTip } from 'utils/customMenuLink';
import { getCodeValue } from 'utils/getCodeValue';
import { ConfirmationModal } from 'utils/ConfirmationModal';
import { translateContent } from 'utils/translateContent';
import { seeMoreLessIcon } from 'utils/seeMoreLessIcon';

import { PARAM_MASTER } from 'constants/paramMaster';
import { IRN_STATUS } from 'constants/IRNStatus';
import { DATA_TYPE } from 'constants/dataType';

import styles from 'assets/sass/app.module.scss';

const { Panel } = Collapse;
const { Text, Title } = Typography;

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
        <Collapse bordered={true} expandIcon={seeMoreLessIcon} collapsible="icon">
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
                            Payment Number <span>INV24D010228</span>
                        </div>
                    </>
                }
                key={1}
            >
                <Divider />
                <div className={styles.detailCardText}>
                Paymnet Date <span>{checkAndSetDefaultValue(selectedOrder?.invoiceDate, isLoading, DATA_TYPE?.DATE?.key) || 'NA'}</span>
                </div>
                <Divider />
                <div className={styles.detailCardText}>
                Paymnet Status <span>{checkAndSetDefaultValue(selectedOrder?.invoiceDate, isLoading, DATA_TYPE?.DATE?.key) || 'NA'}</span>
                </div>
                {/* <Divider />
                <div className={styles.detailCardText}>
                Paymnet Mode <span>{checkAndSetDefaultValue(selectedOrder?.invoiceDate, isLoading, DATA_TYPE?.DATE?.key) || 'NA'}</span>
                </div>
                <Divider />
                <div className={styles.detailCardText}>
                Paymnet Amount <span>{checkAndSetDefaultValue(selectedOrder?.invoiceDate, isLoading, DATA_TYPE?.DATE?.key) || 'NA'}</span>
                </div> */}
               
                
                {/* <div className={styles.detailCardText}>
                    {translateContent('vehicleInvoiceGeneration.heading.profileCard.bookingNumber')}
                    <span>{checkAndSetDefaultValue(selectedOrder?.bookingNumber || selectedOrder?.otfNumber, isLoading)}</span>
                </div>
                <Divider />
                <div className={styles.detailCardText}>
                    {translateContent('vehicleInvoiceGeneration.heading.profileCard.bookingDate')}
                    <span>{checkAndSetDefaultValue(selectedOrder?.orderDate ? selectedOrder?.orderDate : selectedOrder?.otfDate, isLoading, DATA_TYPE?.DATE?.key) || 'NA'}</span>
                </div> */}
            </Panel>
        </Collapse>
    );
};

export default LeftProfileCard;
