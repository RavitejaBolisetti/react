/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Button, Row, Col } from 'antd';
import { FilterIcon } from 'Icons';
import styles from 'components/common/Common.module.css';
import { SearchBox } from 'components/utils/SearchBox';

export default function AdvanceOTFFilter(props) {
    const { extraParams, handleResetFilter, advanceFilter = false, otfFilter = false, title, filterString, setFilterString, typeData, setAdvanceSearchVisible, searchForm } = props;

    const searchBoxProps = {
        searchForm,
        filterString,
        setFilterString,
        optionType: typeData,
    };

    return (
        <div className={styles.contentHeaderBackground}>
            <Row gutter={20}>
                <span className={styles.headerText}>{title}</span>
                <Col xs={24} sm={24} md={16} lg={16} xl={16} className={styles.subheading}>
                    <Row gutter={20}>
                        {otfFilter && (
                            <Col xs={24} sm={24} md={14} lg={14} xl={14}>
                                <SearchBox {...searchBoxProps} />
                            </Col>
                        )}
                        {advanceFilter && (
                            <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                                <Button
                                    icon={<FilterIcon />}
                                    type="link"
                                    className={styles.filterBtn}
                                    onClick={() => {
                                        setAdvanceSearchVisible(true);
                                    }}
                                >
                                    Advanced Filters
                                </Button>
                            </Col>
                        )}
                    </Row>
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
