/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useMemo } from 'react';
import { Collapse, Space, Avatar, Typography, Divider } from 'antd';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { DATA_TYPE } from 'constants/dataType';
import { getCodeValue } from 'utils/getCodeValue';
import { PARAM_MASTER } from 'constants/paramMaster';
import styles from 'assets/sass/app.module.scss';
import { addToolTip } from 'utils/customMenuLink';

import { AiOutlineInfoCircle } from 'react-icons/ai';

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

const VehicleDeliveryNoteCard = (props) => {
    const { selectedOrder, typeData, isLoading, toolTipContent, formActionType } = props;
    const fullName = selectedOrder?.customerName?.split(' ');
    const userAvatar = fullName ? fullName[0]?.slice(0, 1) + (fullName[1] ? fullName[1].slice(0, 1) : '') : '';
    const deliveryTitles = useMemo(() => {
        switch (props?.soldByDealer) {
            case true: {
                return { invoiceType: 'Delivery Note', deliveryDate: 'Delivery Note Date', fullName, userAvatar };
            }
            case false: {
                return { invoiceType: 'Challan', deliveryDate: 'Challan Date', fullName, userAvatar };
            }
            default: {
                return { invoiceType: 'Delivery Note', deliveryDate: 'Delivery Note Date', fullName, userAvatar };
            }
        }
    }, [selectedOrder]);
    return (
        <Collapse bordered={true} expandIcon={expandIcon} collapsible="icon">
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
                                Mobile No.: <span> {checkAndSetDefaultValue(selectedOrder?.mobileNumber)}</span>
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
                    Status:
                    <div className={styles.tooltipAlign}>
                        {checkAndSetDefaultValue(getCodeValue(typeData[PARAM_MASTER.DLVR_NT_STS.id], selectedOrder?.deliveryNoteStatus, isLoading))}
                        {formActionType?.viewMode && selectedOrder?.deliveryNoteStatus === 'cancelled' && <span className={styles.marL5}>{toolTipContent && selectedOrder?.deliveryNoteStatus && <div className={styles.toolTip}>{addToolTip(toolTipContent, 'bottom', '#FFFFFF', styles.toolTip)(<AiOutlineInfoCircle className={styles.infoIconColor} size={13} />)}</div>}</span>}
                    </div>
                </div>

                <Divider />
                <div className={styles.detailCardText}>
                    Invoice Number: <span> {checkAndSetDefaultValue(selectedOrder?.invoiceId)}</span>
                </div>
                <Divider />
                <div className={styles.detailCardText}>
                    Invoice Date: <span> {checkAndSetDefaultValue(selectedOrder?.invoiceDate, isLoading, DATA_TYPE?.DATE?.key) || 'NA'}</span>
                </div>
                <Divider />
                <div className={styles.detailCardText}>
                    Booking Number: <span> {checkAndSetDefaultValue(selectedOrder?.bookingNumber || selectedOrder?.otfNumber)}</span>
                </div>
            </Panel>
        </Collapse>
    );
};

export default VehicleDeliveryNoteCard;
