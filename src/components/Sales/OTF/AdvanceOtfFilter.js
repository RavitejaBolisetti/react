/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { Form, Button, Row, Col, Input, Select } from 'antd';
import { FilterIcon } from 'Icons';
import styles from 'components/common/Common.module.css';

import { PARAM_MASTER } from 'constants/paramMaster';

const { Search } = Input;
const { Option } = Select;

export default function AdvanceOtfFilter(props) {
    const { advanceFilter = false, otfFilter = false, title, filterString, handleSearchTypeChange, handleSearchParamChange, handleSearchParamSearch, typeData, setAdvanceSearchVisible, searchForm, otfSearchRules, reff } = props;

    return (
        <>
            <div className={styles.contentHeaderBackground}>
                <Row gutter={20}>
                    <span className={styles.headerText}>{title}</span>
                    <Col xs={24} sm={24} md={16} lg={16} xl={16} className={styles.subheading}>
                        <Row gutter={20}>
                            {otfFilter && (
                                <Col xs={24} sm={24} md={14} lg={14} xl={14}>
                                    <div className={styles.selectSearchBg}>
                                        <Form form={searchForm} layout="vertical" autoComplete="off">
                                            <Select className={styles.headerSelectField} name="searchType" onChange={handleSearchTypeChange} placeholder="Select Parameter" allowClear>
                                                {typeData[PARAM_MASTER.OTF_SER.id]?.map((item) => (
                                                    <Option value={item.key} selected>
                                                        {item.value}
                                                    </Option>
                                                ))}
                                            </Select>
                                            <Form.Item {...otfSearchRules} name="searchParam" validateTrigger={['onChange', 'onSearch']}>
                                                <Search placeholder="Search" value={filterString?.searchParam} onChange={handleSearchParamChange} allowClear onSearch={handleSearchParamSearch} className={styles.headerSearchField} />
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
            </div>
        </>
    );
}
