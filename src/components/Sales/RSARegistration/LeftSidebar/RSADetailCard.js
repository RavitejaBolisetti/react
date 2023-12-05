/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Collapse, Divider } from 'antd';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';
import { convertDateTime, dateFormatView } from 'utils/formatDateTime';
import { CopytoClipboard } from 'utils/CopytoClipboard';
import { RSAStatusValues } from '../utils/RSARegistrationStatusTag';

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
    const { selectedCardData } = props;
    return (
        <Collapse bordered={true} expandIcon={expandIcon} collapsible="icon">
            <Panel
                header={
                    <>
                        <div className={`${styles.detailCardText} ${styles.marB5}`} style={{ fontSize: '14px' }}>
                            <span> RSA Reg. No.:</span>
                            <span>
                                {selectedCardData?.rsaRegistrationNumber}
                                {selectedCardData?.rsaRegistrationNumber && (
                                    <a className={styles.marL5} href="javascript.void(0)">
                                        <CopytoClipboard buttonText={null} text={selectedCardData?.rsaRegistrationNumber} />
                                    </a>
                                )}
                            </span>
                        </div>
                    </>
                }
                key={1}
            >
                <Divider />
                <div className={styles.detailCardText}>
                    Registration Date: <span>{convertDateTime(selectedCardData?.rsaRegistrationDate || '', dateFormatView)}</span>
                </div>
                <Divider />
                <div className={styles.detailCardText}>
                    Status: <span>{RSAStatusValues(selectedCardData?.status) || 'In-Progress'}</span>
                </div>
            </Panel>
        </Collapse>
    );
};

export default RSADetailCard;
