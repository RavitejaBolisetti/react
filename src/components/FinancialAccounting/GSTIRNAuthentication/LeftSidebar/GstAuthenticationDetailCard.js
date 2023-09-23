/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Collapse, Divider } from 'antd';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';
// import { getCodeValue } from 'utils/getCodeValue';
// import { DATA_TYPE } from 'constants/dataType';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import styles from 'components/common/Common.module.css';
import { FiCopy } from 'react-icons/fi';

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

const GstAuthenticationDetailCard = (props) => {
    const { selectedRecord, typeData, isLoading } = props;
    return (
        <Collapse bordered={true} defaultActiveKey={[1]} expandIcon={expandIcon} collapsible="icon">
            <Panel
                header={
                    <>
                        <div className={`${styles.detailCardText} ${styles.marB5}`} style={{ fontSize: '14px' }}>
                            Dealer Name:
                            {/* <span>
                                {checkAndSetDefaultValue(selectedRecord?.grnNumber, isLoading)}
                                <a className={`${styles.floatRight} ${styles.marL5}`}>
                                    <FiCopy className={styles.activeForm} />
                                </a>
                            </span> */}
                        </div>
                    </>
                }
                key={1}
            >
                <Divider />
                <div className={styles.detailCardText}>
                    GSTIN: <span>{selectedRecord && checkAndSetDefaultValue(selectedRecord?.grnType, isLoading)}</span>
                </div>
                {/* <Divider />
                <div className={styles.detailCardText}>
                    GRN Date: <span>{checkAndSetDefaultValue(selectedRecord?.grnDate, isLoading, DATA_TYPE?.DATE?.key) || 'NA'}</span>
                </div>
                <Divider />
                <div className={styles.detailCardText}>
                    GRN Status: <span>{getCodeValue(typeData, selectedRecord?.status) || 'NA'}</span>
                </div> */}
            </Panel>
        </Collapse>
    );
};

export default GstAuthenticationDetailCard;
