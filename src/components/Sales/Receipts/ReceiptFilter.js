/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Button, Row, Col, Input, Form } from 'antd';
import { FilterIcon } from 'Icons';
import { PlusOutlined } from '@ant-design/icons';
import { RxCross2 } from 'react-icons/rx';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { QueryButtons } from 'components/Sales/VehicleRecieptChecklist/QueryButtons';

import styles from 'assets/sass/app.module.scss';

const { Search } = Input;

export default function ReceiptFilter(props) {
    const { extraParams, removeFilter, handleResetFilter, advanceFilter = false, receiptStatusList, handleReceiptTypeChange, filterString, setAdvanceSearchVisible, handleButtonClick, handleSearch, receiptStatus, handleChange, searchForm } = props;

    return (
        <div className={styles.contentHeaderBackground}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                    <Row gutter={20}>
                        <Col xs={24} sm={18} md={18} lg={18} xl={18} className={styles.verticallyCentered}>
                            <QueryButtons currentItem={receiptStatus} items={receiptStatusList} onClick={handleReceiptTypeChange} />
                            <div className={styles.masterListSearchForm}>
                                <Form autoComplete="off" layout="vertical" form={searchForm}>
                                    <Form.Item label="" name="Search">
                                        <Search placeholder="Search Receipt No." onChange={handleChange} onSearch={handleSearch} allowClear className={styles.headerSearchField} />
                                    </Form.Item>
                                </Form>
                            </div>
                        </Col>
                        <Col xs={24} sm={6} md={6} lg={6} xl={6} className={styles.verticallyCentered}>
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
                        </Col>
                    </Row>
                </Col>
                <Col xs={24} sm={8} md={8} lg={8} xl={8} className={styles.buttonsGroupRight}>
                    <Button icon={<PlusOutlined />} className={styles.actionbtn} type="primary" onClick={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.ADD })}>
                        Add
                    </Button>
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
                                                        <RxCross2 onClick={() => removeFilter(filter?.key)} data-testid="removeFilter" />
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
