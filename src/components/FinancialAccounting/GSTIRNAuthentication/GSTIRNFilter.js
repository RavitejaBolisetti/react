/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Button, Row, Col, Input, Form } from 'antd';
// import { FilterIcon } from 'Icons';
import { RxCross2 } from 'react-icons/rx';
import { customSelectBox } from 'utils/customSelectBox';
import { preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { validateRequiredInputField } from 'utils/validation';

import styles from 'assets/sass/app.module.scss';

export default function GSTIRNFilter(props) {
    const { extraParams, removeFilter, handleResetFilter, advanceFilter = false, filterString, dealerGstData } = props;
    const { userId, isReadOnly = true, selectedGst, setSelectedGst } = props;
    const disabledProps = { disabled: isReadOnly };

    
    
    return (
        <div className={styles.contentHeaderBackground}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Row gutter={20}>
                        <Col xs={24} sm={4} md={4} lg={4} xl={4} className={styles.verticallyCentered}>
                            GST IRN Authentication
                        </Col>
                        <Col xs={24} sm={6} md={6} lg={6} xl={6} className={styles.verticallyCentered}>
                            <Input maxLength={6} placeholder="Dealer Name" value={userId} {...disabledProps} />
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12} className={styles.verticallyCentered} style={{ marginTop: '20px' }}>
                            <Form.Item name="gstinNumber" rules={[validateRequiredInputField('gstinNumber')]}>
                                {customSelectBox({ data: dealerGstData, fieldNames: { key: 'key', value: 'value' }, placeholder: preparePlaceholderSelect('GSTIN NUMBER') })}
                            </Form.Item>
                        </Col>

                        {/* <Col xs={24} sm={8} md={8} lg={8} xl={8} className={styles.verticallyCentered}>
                            <Button
                                icon={<FilterIcon />}
                                type="link"
                                className={styles.verticallyCentered}
                                onClick={() => {
                                    setAdvanceSearchVisible(true);
                                }}
                            >
                                Advanced Filters
                            </Button>
                        </Col> */}
                    </Row>
                </Col>
            </Row>
            {advanceFilter && filterString?.advanceFilter && extraParams.find((i) => i.name) && (
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.advanceFilterTop}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={22} xl={22} className={styles.advanceFilterContainer}>
                                <div className={styles.advanceFilterTitle}>Applied Advance Filters : </div>
                                {extraParams?.map((filter) => {
                                    return (
                                        filter?.value &&
                                        filter?.filter && (
                                            <div className={styles.advanceFilterItem} key={filter?.key}>
                                                {filter?.name}
                                                {filter?.canRemove && (
                                                    <span>
                                                        <RxCross2 onClick={() => removeFilter(filter?.key)} />
                                                    </span>
                                                )}
                                            </div>
                                        )
                                    );
                                })}
                            </Col>
                            <Col xs={24} sm={2} md={2} lg={2} xl={2} className={styles.advanceFilterClear}>
                                <Button className={styles.clearBtn} onClick={() => handleResetFilter()} danger>
                                    Clear
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            )}
        </div>
    );
}
