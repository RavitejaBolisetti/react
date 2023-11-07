/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Collapse, Divider } from 'antd';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';
import { DATA_TYPE } from 'constants/dataType';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { getCodeValue } from 'utils/getCodeValue';
import { PARAM_MASTER } from 'constants/paramMaster';

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

const VehicleReceiptDetailCard = (props) => {
    const { receiptDetailData, isLoading, typeData } = props;
    return (
        <Collapse bordered={true} defaultActiveKey={[1]} expandIcon={expandIcon} collapsible="icon">
            <Panel
                header={
                    <>
                        <div className={`${styles.detailCardText} ${styles.marB5}`} style={{ fontSize: '14px' }}>
                            Receipt No.:
                            <span className={styles.verticallyCentered}>
                                {receiptDetailData?.receiptsDetails?.receiptNumber}
                                {/* <a className={`${styles.verticallyCentered} ${styles.marL5}`}>
                                    <FiCopy className={styles.activeForm} />
                                </a> */}
                            </span>
                        </div>
                    </>
                }
                key={1}
            >
                <Divider />
                <div className={styles.detailCardText}>
                    Receipt Date: <span>{checkAndSetDefaultValue(receiptDetailData?.receiptsDetails?.receiptDate, isLoading, DATA_TYPE?.DATE?.key) || 'NA'}</span>
                </div>
                <Divider />
                <div className={styles.detailCardText}>
                    Status: <span>{checkAndSetDefaultValue(getCodeValue(typeData[PARAM_MASTER.INDNT_STATS.id], receiptDetailData?.receiptsDetails?.receiptStatus, isLoading))}</span>
                </div>
            </Panel>
        </Collapse>
    );
};

export default VehicleReceiptDetailCard;
