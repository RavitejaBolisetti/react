/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Collapse, Space, Divider } from 'antd';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';
import { DATA_TYPE } from 'constants/dataType';
import { checkAndSetDefaultValue } from 'utils/checkAndSetDefaultValue';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';
import { AMCStatusValues } from '../utils/AMCStatusTags';
import dayjs from 'dayjs';
import { dateFormatView } from 'utils/formatDateTime';

const { Panel } = Collapse;

const expandIcon = ({ isActive }) =>
    isActive ? (
        <>
            <span>{translateContent('amcRegistration.label.seeLess')}</span>
            <SlArrowUp size={13} />
        </>
    ) : (
        <>
            <span>{translateContent('amcRegistration.label.seeMore')}</span>
            <SlArrowDown size={13} />
        </>
    );

const AMCRegistrationCard = (props) => {
    const { formActionType, selectedAMC, requestPayload, isLoading } = props;
    return (
        <Collapse bordered={true} defaultActiveKey={[1]} expandIcon={expandIcon} collapsible="icon">
            <Panel
                header={
                    <>
                        <Space>
                            <div className={styles.detailCardText}>
                                {translateContent('amcRegistration.label.amcRegistrationNumber')}: <span>{checkAndSetDefaultValue(selectedAMC?.amcRegistrationNumber)}</span>
                            </div>
                        </Space>
                    </>
                }
                key={1}
            >
                <Divider />
                <div className={styles.detailCardText}>
                    {translateContent('amcRegistration.label.amcRegistrationDate')}: <span>{formActionType?.addMode ? dayjs()?.format(dateFormatView) : checkAndSetDefaultValue(requestPayload?.amcRegistration?.amcRegistrationDate || selectedAMC?.amcRegistrationDate, isLoading, DATA_TYPE?.DATE?.key) || 'NA'}</span>
                </div>
                <Divider />
                <div className={styles.detailCardText}>
                    {translateContent('amcRegistration.label.status')}: <span>{selectedAMC?.status ? AMCStatusValues(selectedAMC?.status) : 'In-Progress'}</span>
                </div>
            </Panel>
        </Collapse>
    );
};

export default AMCRegistrationCard;
