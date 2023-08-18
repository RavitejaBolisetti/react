/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Collapse, Space } from 'antd';
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';
import dayjs from 'dayjs';

import styles from 'components/common/Common.module.css';

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

const VehicleDetailCard = (props) => {
    const { ProfileData } = props;
    return (
        <Collapse bordered={true} defaultActiveKey={[1]} expandIcon={expandIcon} collapsible="icon">
            <Panel
                header={
                    <Space>
                        <div>
                            <div>
                                CheckList Number: <span className={styles.floatRight}>{ProfileData?.checklistNumber}</span>
                            </div>
                        </div>
                    </Space>
                }
                key={1}
            >
                {ProfileData?.checklistDate && (
                    <p>
                        Checklist Date: <span className={styles.floatRight}>{dayjs(ProfileData?.checklistDate)?.format('DD MM YYYY')}</span>
                    </p>
                )}
                <p>
                    Checklist Status: <span className={styles.floatRight}>{ProfileData?.checklistStatus || 'NA'}</span>
                </p>
                <p>
                    GRN Number: <span className={styles.floatRight}>{ProfileData?.grnNumber || 'NA'}</span>
                </p>

                <p>
                    GRN Date: <span className={styles.floatRight}>{ProfileData?.grnDate ? dayjs(ProfileData?.grnDate)?.format('DD-MM-YYYY') : 'NA'}</span>
                </p>
                <p>
                    GRN Status: <span className={styles.floatRight}>{ProfileData?.grnStatus || 'NA'}</span>
                </p>
                <p>
                    VIN: <span className={styles.floatRight}>{ProfileData?.vinNumber || 'NA'}</span>
                </p>
                <p>
                    MODEL: <span className={styles.floatRight}>{ProfileData?.model || 'NA'}</span>
                </p>
            </Panel>
        </Collapse>
    );
};

export default VehicleDetailCard;
