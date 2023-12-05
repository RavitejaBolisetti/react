/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useMemo } from 'react';
import { Collapse, Space, Avatar, Typography, Divider } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { DATA_TYPE } from 'constants/dataType';
import { getCodeValue } from 'utils/getCodeValue';
import { PARAM_MASTER } from 'constants/paramMaster';
import { addToolTip } from 'utils/customMenuLink';

import { AiOutlineInfoCircle } from 'react-icons/ai';
import { DELIVERY_NOTE_STATUS } from '../constants/deliveryNoteStatus';
import { translateContent } from 'utils/translateContent';
import { seeMoreLessIcon } from 'utils/seeMoreLessIcon';

import styles from 'assets/sass/app.module.scss';

const { Panel } = Collapse;
const { Text, Title } = Typography;

const VehicleDeliveryNoteCard = (props) => {
    const { selectedOrder, typeData, isLoading, toolTipContent, formActionType } = props;
    const fullName = selectedOrder?.customerName?.split(' ');
    const userAvatar = fullName ? fullName[0]?.slice(0, 1) + (fullName[1] ? fullName[1].slice(0, 1) : '') : '';
    const deliveryTitles = useMemo(() => {
        switch (props?.soldByDealer) {
            case true: {
                return { invoiceType: translateContent('vehicleDeliveryNote.heading.mainTitle'), deliveryDate: translateContent('vehicleDeliveryNote.label.deliveryNoteDate'), fullName, userAvatar };
            }
            case false: {
                return { invoiceType: translateContent('vehicleDeliveryNote.buttons.challan'), deliveryDate: translateContent('vehicleDeliveryNote.label.challanDate'), fullName, userAvatar };
            }
            default: {
                return { invoiceType: translateContent('vehicleDeliveryNote.heading.mainTitle'), deliveryDate: translateContent('vehicleDeliveryNote.label.deliveryNoteDate'), fullName, userAvatar };
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedOrder]);
    return (
        <Collapse bordered={true} expandIcon={seeMoreLessIcon} collapsible="icon">
            <Panel
                header={
                    <>
                        <Space>
                            <Avatar size={50}>{deliveryTitles?.userAvatar?.toUpperCase()}</Avatar>
                            <div>
                                <Title level={5}>{selectedOrder?.customerName?.toLowerCase()}</Title>
                                <Text>{selectedOrder?.customerId || 'NA'}</Text>
                            </div>
                        </Space>
                        <Divider />
                        <div className={styles.detailCardText}>
                            {deliveryTitles?.invoiceType} No.: <span> {checkAndSetDefaultValue(selectedOrder?.vehicleDeliveryNote)}</span>
                        </div>
                        <Divider />
                        {selectedOrder?.mobileNumber && (
                            <div className={styles.detailCardText}>
                                {translateContent('vehicleDeliveryNote.label.mobileNo')} <span> {checkAndSetDefaultValue(selectedOrder?.mobileNumber)}</span>
                            </div>
                        )}
                    </>
                }
                key={1}
            >
                <Divider />
                <div className={styles.detailCardText}>
                    {deliveryTitles?.deliveryDate} <span> {checkAndSetDefaultValue(selectedOrder?.deliveryNoteDate, isLoading, DATA_TYPE?.DATE?.key) || 'NA'}</span>
                </div>
                <Divider />
                <div className={styles.detailCardText}>
                    {translateContent('vehicleDeliveryNote.label.status')}
                    <div className={styles.tooltipAlign}>
                        {checkAndSetDefaultValue(getCodeValue(typeData[PARAM_MASTER.DLVR_NT_STS.id], selectedOrder?.deliveryNoteStatus, isLoading))}
                        {formActionType?.viewMode && selectedOrder?.deliveryNoteStatus === DELIVERY_NOTE_STATUS?.CANCELLED?.key && <span className={styles.marL5}>{toolTipContent && selectedOrder?.deliveryNoteStatus && <div className={styles.toolTip}>{addToolTip(toolTipContent, 'bottom', '#FFFFFF', styles.toolTip)(<AiOutlineInfoCircle className={styles.infoIconColor} size={13} />)}</div>}</span>}
                    </div>
                </div>

                <Divider />
                <div className={styles.detailCardText}>
                    {translateContent('vehicleDeliveryNote.label.invoiceNo')} <span> {checkAndSetDefaultValue(selectedOrder?.invoiceId)}</span>
                </div>
                <Divider />
                <div className={styles.detailCardText}>
                    {translateContent('vehicleDeliveryNote.label.invoiceDate')} <span> {checkAndSetDefaultValue(selectedOrder?.invoiceDate, isLoading, DATA_TYPE?.DATE?.key) || 'NA'}</span>
                </div>
                <Divider />
                {(selectedOrder?.bookingNumber || selectedOrder?.otfNumber) && (
                    <div className={styles.detailCardText}>
                        {translateContent('vehicleDeliveryNote.label.bookingNumber')} <span> {checkAndSetDefaultValue(selectedOrder?.bookingNumber || selectedOrder?.otfNumber)}</span>
                    </div>
                )}
            </Panel>
        </Collapse>
    );
};

export default VehicleDeliveryNoteCard;
