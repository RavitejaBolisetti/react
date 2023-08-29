/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { Col, Row, Space, Checkbox } from 'antd';
import styles from 'assets/sass/app.module.scss';
//import styles from 'components/common/Common.module.css';

const BranchMapping = ({ branchMappingData, finalFormdata, setfinalFormdata, forceUpdate }) => {
    const [dealerBranches, setDealerBranches] = useState([]);

    console.log('🚀 ~ file: BranchMapping.js:18 ~ BranchMapping ~ dealerBranches:', dealerBranches);

    const onChanges = (values, checkedValues, index) => {
        const isCheckedDefault = checkedValues?.includes('defaulIndicator');
        const isaccessible = checkedValues?.includes('accessible');
        // if (isCheckedDefault && !isaccessible) {
        //     forceUpdate();
        //     console.error('default can not be inactive');
        //     return;
        // }

        const newVal = {
            branchName: values?.branchName,
            accessible: isaccessible,
            defaulIndicator: isCheckedDefault && !isaccessible ? false : isCheckedDefault,
        };
        setfinalFormdata((prev) => {
            const updatedValues = isCheckedDefault ? prev?.branches?.map((i) => ({ ...i, defaulIndicator: false })) : [...prev?.branches];
            updatedValues.splice(index, 1, newVal);
            return { ...prev, branches: [...updatedValues] };
        });
        forceUpdate();
    };

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    {finalFormdata?.branches?.map((el, i) => {
                        return (
                            <Row gutter={20}>
                                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className={styles.marB10}>
                                    {/* {`${i + 1}. ${el?.branchName}`} */}
                                    {el?.branchName}
                                </Col>
                                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} className={styles.marB10}>
                                    <Checkbox.Group onChange={(checkedValues) => onChanges(el, checkedValues, i)} defaultValue={[el.accessible && 'accessible', el.defaulIndicator && 'defaulIndicator']}>
                                        <Row gutter={20}>
                                            <Col span={12}>
                                                <Checkbox value={'accessible'} defaultChecked={el?.accessible} checked={el?.accessible}>
                                                    Accessible
                                                </Checkbox>
                                            </Col>
                                            <Col span={12}>
                                                <Checkbox value={'defaulIndicator'} defaultChecked={el?.defaulIndicator} checked={el?.defaulIndicator} disabled={!el?.accessible}>
                                                    Default
                                                </Checkbox>
                                            </Col>
                                        </Row>
                                    </Checkbox.Group>
                                </Col>
                            </Row>
                        );
                    })}
                </Col>
            </Row>
        </>
    );
};

export default BranchMapping;
