/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Form, Button, Row, Col } from 'antd';

import { RxCross2 } from 'react-icons/rx';
import { SearchBox } from 'components/utils/SearchBox';
import styles from 'components/common/Common.module.css';

export default function AdvanceFilter(props) {
    const { resetAdvanceFilter, setResetAdvanceFilter, setFilterString, handleResetFilter, advanceFilter, removeFilter, filterString, extraParams } = props;
    const [searchForm] = Form.useForm();

    useEffect(() => {
        // searchForm.resetFields();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resetAdvanceFilter]);

    const searchBoxProps = {
        singleField: true,
        searchForm,
        filterString,
        setFilterString,
        placeholder: 'Search by VIN No./Chassis No.',
        singleFieldKey: 'searchParam',
        setResetAdvanceFilter,
    };
    return (
        <>
            <div className={styles.contentHeaderBackground}>
                <Row gutter={20}>
                    <Col xs={24} sm={8} md={8} lg={8} xl={8}>
                        <SearchBox {...searchBoxProps} />
                    </Col>
                </Row>

                {advanceFilter && filterString?.advanceFilter && extraParams.find((i) => i.value && i.filter) && (
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
        </>
    );
}
