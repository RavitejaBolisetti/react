/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Collapse, Divider } from 'antd';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';
import { CopytoClipboard } from 'utils/CopytoClipboard';
import dayjs from 'dayjs';
import { addToolTip } from 'utils/customMenuLink';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { dateFormatView } from 'utils/formatDateTime';

import styles from 'assets/sass/app.module.scss';

const { Panel } = Collapse;

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

const VehicleDetailCard = (props) => {
    const { ProfileData, typeData, tooltTipText, VehicleLovCodeData, record } = props;
    const findStatus = (key) => typeData?.find((element) => element?.key === key)?.value || 'NA';

    return (
        <Collapse bordered={true} defaultActiveKey={[1]} expandIcon={expandIcon} collapsible="icon">
            <Panel
                header={
                    <div className={`${styles.detailCardText} ${styles.marB5}`} style={{ fontSize: '14px' }}>
                        CheckList Number:
                        <span className={styles.activeForm}>
                            {ProfileData?.checklistNumber || 'New'}
                            <CopytoClipboard text={ProfileData?.checklistNumber} />
                        </span>
                    </div>
                }
                key={1}
            >
                <Divider />
                <div className={styles.detailCardText}>
                    Checklist Date: <span>{ProfileData?.checklistDate ? dayjs(ProfileData?.checklistDate)?.format(dateFormatView) : 'NA'}</span>
                </div>
                <Divider />
                <div className={styles.detailCardText}>
                    Checklist Status: <span>{findStatus(ProfileData?.checklistStatus)}</span>
                </div>
                <Divider />
                <div className={styles.detailCardText}>
                    GRN Number: <span>{ProfileData?.grnNumber || 'NA'}</span>
                </div>
                <Divider />
                <div className={styles.detailCardText}>
                    GRN Date: <span>{ProfileData?.grnDate ? dayjs(ProfileData?.grnDate)?.format(dateFormatView) : 'NA'}</span>
                </div>
                <Divider />
                <div className={styles.detailCardText}>
                    GRN Status: <span>{ProfileData?.grnStatusDescription || 'NA'}</span>
                </div>
                <Divider />
                <div className={styles.detailCardText}>
                    VIN: <span>{ProfileData?.vinNumber || 'NA'}</span>
                </div>
                <Divider />
                <div className={styles.detailCardText}>
                    MODEL:
                    <span>
                        {record?.modelName ? record?.modelName : 'NA'}
                        {addToolTip(tooltTipText, 'bottom', '#D3EDFE', styles.toolTip)(<AiOutlineInfoCircle className={styles.infoIconColor} size={13} />)}
                    </span>
                </div>
            </Panel>
        </Collapse>
    );
};

export default VehicleDetailCard;
