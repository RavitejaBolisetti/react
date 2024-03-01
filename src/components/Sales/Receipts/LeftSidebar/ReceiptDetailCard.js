/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Collapse, Divider } from 'antd';
import { DATA_TYPE } from 'constants/dataType';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { getCodeValue } from 'utils/getCodeValue';
import { PARAM_MASTER } from 'constants/paramMaster';
import { CopytoClipboard } from 'utils/CopytoClipboard';

import { translateContent } from 'utils/translateContent';
import { seeMoreLessIcon } from 'utils/seeMoreLessIcon';
import styles from 'assets/sass/app.module.scss';

const { Panel } = Collapse;
const VehicleReceiptDetailCard = (props) => {
    const { receiptDetailData, isLoading, typeData } = props;
    return (
        <Collapse bordered={true} defaultActiveKey={[1]} expandIcon={seeMoreLessIcon} collapsible="icon">
            <Panel
                header={
                    <>
                        <div className={`${styles.detailCardText} ${styles.marB5}`} style={{ fontSize: '14px' }}>
                            {translateContent('receipts.heading.profileCard.receiptNumber')}
                            <span className={styles.verticallyCentered}>
                                {receiptDetailData?.receiptsDetails?.receiptNumber}
                                <span>
                                    <CopytoClipboard buttonText={null} text={receiptDetailData?.receiptsDetails?.receiptNumber} />
                                </span>
                            </span>
                        </div>
                    </>
                }
                key={1}
            >
                <Divider />
                <div className={styles.detailCardText}>
                    {translateContent('receipts.heading.profileCard.receiptDate')} <span>{checkAndSetDefaultValue(receiptDetailData?.receiptsDetails?.receiptDate, isLoading, DATA_TYPE?.DATE?.key) || 'NA'}</span>
                </div>
                <Divider />
                <div className={styles.detailCardText}>
                    {translateContent('receipts.heading.profileCard.status')} <span>{checkAndSetDefaultValue(getCodeValue(typeData[PARAM_MASTER.INDNT_STATS.id], receiptDetailData?.receiptsDetails?.receiptStatus, isLoading))}</span>
                </div>
            </Panel>
        </Collapse>
    );
};

export default VehicleReceiptDetailCard;
