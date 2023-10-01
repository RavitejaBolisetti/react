/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Button, Row, Col, Form } from 'antd';
import { RxCross2 } from 'react-icons/rx';
import { SearchBox } from 'components/utils/SearchBox';
import styles from 'assets/sass/app.module.scss';

export default function AdvanceVinBlockMasterFilter(props) {
    const {
        extraParams,
        removeFilter,
        handleResetFilter,
        advanceFilter = false,
        onRoadFilter = false,
        title,
        filterString,
        setFilterString,
        searchForm,
        searchForm: { setFieldsValue },
    } = props;

    
    const searchBoxProps = {
        singleField: true,
        searchForm,
        filterString,
        setFilterString,
        placeholder: 'Search By VIN',
        singleFieldKey: 'vin',
    };

    useEffect(() => {
        setFieldsValue({ searchParam: filterString?.searchParam, searchType: filterString?.searchType });
    }, [filterString]);

    return (
        <div className={styles.contentHeaderBackground}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                    <Form autoComplete="off" colon={false} className={styles.masterListSearchForm}>
                        <Form.Item label={`${title}`}>
                            <Row gutter={20}>
                                {onRoadFilter && (
                                    <Col xs={24} sm={24} md={14} lg={14} xl={14}>
                                        <SearchBox {...searchBoxProps} />
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
