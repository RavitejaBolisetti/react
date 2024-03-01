/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Collapse, Divider } from 'antd';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';
import { seeMoreLessIcon } from 'utils/seeMoreLessIcon';

const { Panel } = Collapse;
const GstAuthenticationDetailCard = (props) => {
    const { isLoading } = props;

    return (
        <Collapse bordered={true} defaultActiveKey={[1]} expandIcon={seeMoreLessIcon} collapsible="icon">
            <Panel
                header={
                    <>
                        <div className={`${styles.detailCardText} ${styles.marB5}`} style={{ fontSize: '14px' }}>
                            {translateContent('gstIRNAuthentication.leftSideBar.label.dealerName')}
                            <span> {checkAndSetDefaultValue(props?.userId, isLoading)} </span>
                        </div>
                    </>
                }
                key={1}
            >
                <Divider />
                <div className={styles.detailCardText}>
                    {translateContent('gstIRNAuthentication.leftSideBar.label.gstin')} <span>{checkAndSetDefaultValue(props?.currentGst, isLoading)}</span>
                </div>
            </Panel>
        </Collapse>
    );
};

export default GstAuthenticationDetailCard;
