/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Collapse, Typography, Divider } from 'antd';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';
import { convertDateTime, dateFormatView } from 'utils/formatDateTime';
import { CopytoClipboard } from 'utils/CopytoClipboard';

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

const RSADetailCard = (props) => {
    const { selectedOrder, formActionType } = props;
    return (
        <Collapse bordered={true} expandIcon={expandIcon} collapsible="icon">
            <Panel
                header={
                    <>
                        <div className={styles.detailCardText}>
                            RSA Reg. No.: <span>{formActionType?.addMode === true ? '-' : selectedOrder?.rsaRegistrationNumber || 'NA'}</span>
                            <CopytoClipboard type={'link'} text={selectedOrder?.rsaRegistrationNumber} />
                        </div>
                    </>
                }
                key={1}
            >
                <Divider />
                <div className={styles.detailCardText}>
                    Registration Date: <span>{formActionType?.addMode === true ? '-' : convertDateTime(selectedOrder?.rsaRegistrationDate || '', dateFormatView) || 'NA'}</span>
                </div>
                <Divider />
                <div className={styles.detailCardText}>
                    Status: <span>{formActionType?.addMode === true ? 'In-Progress' : selectedOrder?.status || '-'}</span>
                </div>
            </Panel>
        </Collapse>
    );
};

export default RSADetailCard;
