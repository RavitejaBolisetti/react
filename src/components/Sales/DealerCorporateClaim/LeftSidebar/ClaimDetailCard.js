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
import { CardSkeleton } from 'components/common/Skeleton';
import { translateContent } from 'utils/translateContent';

const { Panel } = Collapse;

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

const ClaimDetailCard = (props) => {
    const { ProfileData, typeData, tooltTipText, isProductHierarchyLoading, record, isProfileDataLoading } = props;
    if (isProfileDataLoading || isProductHierarchyLoading) return <CardSkeleton />;

    const findStatus = (key) => typeData?.find((element) => element?.key === key)?.value || 'NA';

    return (
        <Collapse bordered={true} defaultActiveKey={[1]} expandIcon={expandIcon} collapsible="icon">
            <Panel
                header={
                    <div className={`${styles.detailCardText} ${styles.marB5}`} style={{ fontSize: '14px' }}>
                        {/* {translateContent('vehicleReceiptChecklist.heading.profileCard.checklistNumber')} */}
                        {record?.calimNumber || 'CLAIM8978'}
                        <span className={styles.activeForm}>
                            {record?.status || 'Pending status'}
                            <CopytoClipboard text={ProfileData?.checklistNumber} />
                        </span>
                    </div>
                }
                key={1}
            >
                <div className={styles.detailCardText}>
                    Claim Type
                    <span>{record?.claimType}</span>
                </div>
                <Divider />
                <div className={styles.detailCardText}>
                    {'Claim Number'}
                    <span>{record?.claimNumber}</span>
                </div>
                <Divider />
                <div className={styles.detailCardText}>
                    {'Claim Date'}
                    <span>{record?.claimDate}</span>
                </div>
                <Divider />
                {/* <div className={styles.detailCardText}>
                    {'Claim Status'}
                    <span>{record?.claimStatus}</span>
                </div> */}

                {/* <div className={styles.detailCardText}>
                    {translateContent('vehicleReceiptChecklist.heading.profileCard.model')}

                    <span>
                        {record?.modelName ? record?.modelName : 'NA'}
                        {addToolTip(tooltTipText, 'bottom', '#D3EDFE', styles.toolTip)(<AiOutlineInfoCircle className={styles.infoIconColor} size={13} />)}
                    </span>
                </div> */}
            </Panel>
        </Collapse>
    );
};

export default ClaimDetailCard;
