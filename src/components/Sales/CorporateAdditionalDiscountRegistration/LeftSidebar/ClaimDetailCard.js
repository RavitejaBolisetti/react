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
    const { ProfileData, isProductHierarchyLoading, record, isProfileDataLoading } = props;
    if (isProfileDataLoading || isProductHierarchyLoading) return <CardSkeleton />;

    return (
        <Collapse bordered={true} defaultActiveKey={[1]} expandIcon={expandIcon} collapsible="icon">
            <Panel
                header={
                    <div className={`${styles.detailCardText} ${styles.marB5}`} style={{ fontSize: '14px' }}>
                        {'Sch ID'}
                        <span className={styles.detailCardText}>
                            {'N/A'}
                            <CopytoClipboard text={ProfileData?.checklistNumber} />
                        </span>
                    </div>
                }
                key={1}
            >
                <div className={styles.detailCardText}>
                    {'Scheme Date'}
                    <span>{record?.claimType}</span>
                </div>
                <Divider />
                <div className={styles.detailCardText}>
                    {'Status'}
                    <span>{record?.claimDate}</span>
                </div>
            </Panel>
        </Collapse>
    );
};

export default ClaimDetailCard;
