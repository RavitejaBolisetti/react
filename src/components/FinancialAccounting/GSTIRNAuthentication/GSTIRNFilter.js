/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Button, Row, Col, Input, Form, Select } from 'antd';
import { RxCross2 } from 'react-icons/rx';
import { validateRequiredInputField } from 'utils/validation';

import styles from 'assets/sass/app.module.scss';
const { Option } = Select;
 
export default function GSTIRNFilter(props) {
    const { extraParams, removeFilter, handleResetFilter, advanceFilter = false, filterString, dealerGstData } = props;
    const { userId, isReadOnly = true, handleGstinNumber, } = props;
    const disabledProps = { disabled: isReadOnly };

    return (
        <div className={styles.contentHeaderBackground}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Row gutter={20}>
                        <Col xs={24} sm={4} md={4} lg={4} xl={4} className={styles.verticallyCentered}>
                            GST IRN Authentication
                        </Col>
                        <Col xs={24} sm={4} md={4} lg={4} xl={4} className={styles.verticallyCentered}>
                            <Form.Item className={styles.marB0}>
                                <Input maxLength={6} placeholder="Dealer Name" value={userId} {...disabledProps} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={5} md={5} lg={5} xl={5} className={styles.selectError} >
                            <Form.Item name="gstinNumber" className={styles.marB0} rules={[validateRequiredInputField('gstinNumber')]}>
                                <Select onChange={handleGstinNumber}  placeholder="SELECT GSTIN" allowClear>
                                            {dealerGstData?.map((item) => (
                                                <Option value={item.value}>{item.value}</Option>
                                            ))}
                                        </Select>
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
