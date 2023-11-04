/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Button, Row, Col, Form, Input } from 'antd';
import { RxCross2 } from 'react-icons/rx';
// import { SearchBox } from 'components/utils/SearchBox';
import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

const { Search } = Input;

export default function AdvanceVinBlockMasterFilter(props) {
    const {
        extraParams,
        removeFilter,
        handleResetFilter,
        advanceFilter = false,
        vinFilter = false,
        title,
        filterString,
        searchForm,
        handleSearch,
    } = props;

    
    return (
        <div className={styles.contentHeaderBackground}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                    <Form autoComplete="off" form={searchForm} colon={false} className={styles.masterListSearchForm}>
                        <Form.Item label={`${title}`} name="vinNo">
                            <Row gutter={20}>
                                {vinFilter && (
                                    <Col xs={24} sm={24} md={14} lg={14} xl={14}>
                                        <Search placeholder={translateContent('vinBlockMaster.label.searchVin')} onSearch={handleSearch} allowClear className={styles.headerSearchField} />
                                    </Col>
                                )}
                            </Row>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
            {advanceFilter && filterString?.advanceFilter && extraParams.find((i) => i.name) && (
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.advanceFilterTop}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={22} xl={22} className={styles.advanceFilterContainer}>
                                <div className={styles.advanceFilterTitle}> {translateContent('vinBlockMaster.heading.appliedAdvanceFilters')} : </div>
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
                                    translateContent('vinBlockMaster.button.clear')
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            )}
        </div>
    );
}
