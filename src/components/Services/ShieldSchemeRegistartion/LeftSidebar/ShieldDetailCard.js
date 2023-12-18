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
import { CopytoClipboard } from 'utils/CopytoClipboard';
import { getCodeValue } from 'utils/getCodeValue';
import { translateContent } from 'utils/translateContent';

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

const ShieldDetailCard = (props) => {
    const { isLoading, typeData, selectedCardData } = props;
    return (
        <Collapse bordered={true} defaultActiveKey={[1]} expandIcon={expandIcon} collapsible="icon">
            <Panel
                header={
                    <>
                        <div className={`${styles.detailCardText} ${styles.marB5}`} style={{ fontSize: '14px' }}>
                            <span>{translateContent('shieldSchemeRegistration.label.schemeRegNo')}:</span>
                            <span>
                                {selectedCardData?.schemeNumber}
                                {selectedCardData?.schemeNumber && (
                                    <a className={styles.marL5} href="javascript.void(0)" onClick={(e) => e.preventDefault()}>
                                        <CopytoClipboard buttonText={null} text={selectedCardData?.schemeNumber} />
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
                    {translateContent('shieldSchemeRegistration.label.registrationDate')}: <span>{checkAndSetDefaultValue(selectedCardData?.schemeDate, isLoading, DATA_TYPE?.DATE?.key) || 'NA'}</span>
                </div>
                <Divider />
                <div className={styles.detailCardText}>
                    {translateContent('shieldSchemeRegistration.label.status')}: <span>{getCodeValue(typeData?.AMC_REG_APRVL_STAT, selectedCardData?.status) || 'In-Progress'}</span>
                </div>
            </Panel>
        </Collapse>
    );
};

export default ShieldDetailCard;
