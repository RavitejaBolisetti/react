/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Button, Row, Col, Form, Select } from 'antd';
import { RxCross2 } from 'react-icons/rx';
import { SearchBox } from 'components/utils/SearchBox';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';
import { OTF_SO_MAPPING_UNMAPPING_CONSTANTS } from './Constants';

const SomappingUnmappingFilter = (props) => {
    const { extraParams, removeFilter, handleResetFilter, advanceFilter = false, selectBoxkey, searchBoxProps, selectBoxProps, filterString, status } = props;
    return (
        <div className={styles.contentHeaderBackground}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Form autoComplete="off" colon={false} className={styles.masterListSearchForm}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Row gutter={20} className={styles.verticallyCentered}>
                                    <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                                        <div className={`${styles.userManagement}`}>
                                            <Form.Item name={selectBoxkey}>
                                                <Select {...selectBoxProps} />
                                            </Form.Item>
                                        </div>
                                    </Col>
                                    {[OTF_SO_MAPPING_UNMAPPING_CONSTANTS?.SO_UNMAPPING?.key, OTF_SO_MAPPING_UNMAPPING_CONSTANTS?.SO_CANCELLATION?.key, OTF_SO_MAPPING_UNMAPPING_CONSTANTS?.SO_MAPPING?.key]?.includes(status?.key) && (
                                        <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                                            <SearchBox {...searchBoxProps} />
                                        </Col>
                                    )}
                                </Row>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
            {advanceFilter && filterString?.advanceFilter && extraParams.find((i) => i.name) && (
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.advanceFilterTop}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={22} xl={22} className={styles.advanceFilterContainer}>
                                <div className={styles.advanceFilterTitle}> {translateContent('global.advanceFilter.appliedAdvanceFilter')} </div>
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
                                    {translateContent('global.buttons.clear')}
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            )}
        </div>
    );
};
export default SomappingUnmappingFilter;
