/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Button, Row, Col } from 'antd';
import { FilterIcon } from 'Icons';
import { RxCross2 } from 'react-icons/rx';
import { SearchBox } from 'components/utils/SearchBox';

import styles from 'components/common/Common.module.css';

export default function AdvanceVehiclePriceMasterFilter(props) {
    const {
        extraParams,
        removeFilter,
        handleResetFilter,
        advanceFilter = false,
        otfFilter = false,
        title,
        filterString,
        setFilterString,
        typeData,
        setAdvanceSearchVisible,
        searchForm,
        searchForm: { setFieldsValue },
        moduleTitle,
        handleOnClick,
    } = props;

    const serachBoxProps = {
        searchForm,
        filterString,
        optionType: typeData,
        setFilterString,
    };

    useEffect(() => {
        setFieldsValue({ searchParam: filterString?.searchParam, searchType: filterString?.searchType });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString]);

    return (
        <div className={styles.contentHeaderBackground}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.subheading}>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                            <span className={styles.headerText}>{title}</span>
                        </Col>
                        {otfFilter && (
                            <Col xs={24} sm={24} md={11} lg={11} xl={11}>
                                <SearchBox {...serachBoxProps} />
                            </Col>
                        )}
                        {advanceFilter && (
                            <Col xs={24} sm={24} md={6} lg={6} xl={6} className={styles.verticallyCentered}>
                                <Button
                                    icon={<FilterIcon className={styles.verticallyCentered} />}
                                    type="link"
                                    onClick={() => {
                                        setAdvanceSearchVisible(true);
                                    }}
                                >
                                    Advanced Filters
                                </Button>
                            </Col>
                        )}

                        <Col xs={24} sm={24} md={3} lg={3} xl={3} className={styles.alignRight}>
                            <Button type="primary" onClick={handleOnClick}>
                                Upload
                            </Button>
                        </Col>
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
