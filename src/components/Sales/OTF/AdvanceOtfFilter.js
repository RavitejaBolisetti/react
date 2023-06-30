/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Form, Button, Row, Col, Input, Select } from 'antd';
import { RxCross2 } from 'react-icons/rx';

import { FilterIcon } from 'Icons';
import { validateRequiredSelectField } from 'utils/validation';
import { preparePlaceholderText, preparePlaceholderSelect } from 'utils/preparePlaceholder';
import { PARAM_MASTER } from 'constants/paramMaster';

import styles from 'components/common/Common.module.css';

const { Search } = Input;
const { Option } = Select;

export default function AdvanceOTFFilter(props) {
    const {
        extraParams,
        removeFilter,
        advanceFilter = false,
        otfFilter = false,
        title,
        filterString,
        handleSearchTypeChange,
        handleSearchParamSearch,
        typeData,
        setAdvanceSearchVisible,
        searchForm,
        searchForm: { setFieldsValue },
        otfSearchRules,
    } = props;

    useEffect(() => {
        setFieldsValue({ searchParam: filterString?.searchParam, searchType: filterString?.searchType });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString]);

    const handleResetFilter = (e) => {
        setFieldsValue({ searchParam: undefined, searchType: undefined });
    };
    return (
        <div className={styles.contentHeaderBackground}>
            <Row gutter={20}>
                <span className={styles.headerText}>{title}</span>
                <Col xs={24} sm={24} md={16} lg={16} xl={16} className={styles.subheading}>
                    <Row gutter={20}>
                        {otfFilter && (
                            <Col xs={24} sm={24} md={14} lg={14} xl={14}>
                                <div className={styles.selectSearchBg}>
                                    <Form form={searchForm} layout="vertical" autoComplete="off">
                                        <Form.Item name="searchType" initialValue={filterString?.searchType} rules={[validateRequiredSelectField('parameter')]}>
                                            <Select placeholder={preparePlaceholderSelect('Parameter')} onChange={handleSearchTypeChange} fieldNames={{ label: 'value', value: 'key' }} options={typeData[PARAM_MASTER.OTF_SER.id]} allowClear className={styles.headerSelectField}></Select>
                                        </Form.Item>
                                        <Form.Item {...otfSearchRules} name="searchParam" initialValue={filterString?.searchParam} validateTrigger={['onChange', 'onSearch']}>
                                            <Search placeholder={preparePlaceholderText('Parameter')} allowClear onSearch={handleSearchParamSearch} className={styles.headerSearchField} />
                                        </Form.Item>
                                    </Form>
                                </div>
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
