/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Button, Row, Col, Input, Form } from 'antd';
import { FilterIcon } from 'Icons';
import { RxCross2 } from 'react-icons/rx';
import { QueryButtons } from 'components/Sales/VehicleRecieptChecklist/QueryButtons';

import { DELIVERY_NOTE_INVOICE_STATUS } from './utils/DeliveryNoteInvoiceStatus';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';
const { Search } = Input;

export default function AdvanceFilter(props) {
    const { extraParams, handleResetFilter, handleButtonQuery, handleSearchChange, invoiceStatusType, advanceFilter = false, filter = false, filterString, setAdvanceSearchVisible, searchForm, removeFilter } = props;
    return (
        <div className={styles.contentHeaderBackground}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.verticallyCentered}>
                    <QueryButtons currentItem={invoiceStatusType} items={Object.values(DELIVERY_NOTE_INVOICE_STATUS)} onClick={handleButtonQuery} />
                    {filter && (
                        <Form form={searchForm} className={styles.masterListSearchForm}>
                            <Form.Item name="Search">
                                <div className={styles.verticallyCentered}>
                                    <Search placeholder={translateContent('rsmAsmApproval.label.searchByDealer')} allowClear onSearch={handleSearchChange} className={styles.headerSearchField} />
                                </div>
                            </Form.Item>
                        </Form>
                    )}
                    {advanceFilter && (
                        <div className={styles.advanceFilterBtn}>
                            <Button
                                icon={<FilterIcon />}
                                type="link"
                                className={styles.verticallyCentered}
                                onClick={() => {
                                    setAdvanceSearchVisible(true);
                                }}
                            >
                                {translateContent('rsmAsmApproval.label.titleOverride')}
                            </Button>
                        </div>
                    )}
                </Col>
            </Row>
            {filterString?.advanceFilter && extraParams.find((i) => i.name) && (
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
