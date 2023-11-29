/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Button, Row, Col, Form } from 'antd';
import { FilterIcon } from 'Icons';
import { RxCross2 } from 'react-icons/rx';
import { PlusOutlined } from '@ant-design/icons';
import { SearchBox } from 'components/utils/SearchBox';
import { translateContent } from 'utils/translateContent';
import styles from 'assets/sass/app.module.scss';
import { PARAM_MASTER } from 'constants/paramMaster';

export function NormalSearch(props) {
    const { extraParams, removeFilter, handleResetFilter, typeData, setAdvanceSearchVisible, searchForm, setFilterString, filterString, addFormOpen, title } = props;
    const serachBoxProps = {
        searchForm,
        filterString,
        optionType: typeData?.[PARAM_MASTER.CRM_SCHEME_TYPE_SEARCH.id],
        setFilterString,
    };
    return (
        <div className={styles.contentHeaderBackground}>
            <Row gutter={20}>
                <Col xs={24} sm={20} md={20} lg={20} xl={20}>
                    <Form autoComplete="off" colon={false} className={styles.masterListSearchForm}>
                        <Form.Item label={`${title}`}>
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={10} lg={10} xl={10} className={styles.verticallyCentered}>
                                    <div className={styles.fullWidth}>
                                        <SearchBox {...serachBoxProps} />
                                    </div>
                                </Col>
                                <Col xs={24} sm={24} md={6} lg={6} xl={6} className={styles.verticallyCentered}>
                                    <Button
                                        icon={<FilterIcon />}
                                        type="link"
                                        className={styles.verticallyCentered}
                                        onClick={() => {
                                            setAdvanceSearchVisible(true);
                                        }}
                                    >
                                        {translateContent('global.advanceFilter.title')}
                                    </Button>
                                </Col>
                            </Row>
                        </Form.Item>
                    </Form>
                </Col>
                <Col xs={24} sm={4} md={4} lg={4} xl={4} className={styles.buttonsGroupRight}>
                    <Button icon={<PlusOutlined />} className={styles.actionbtn} type="primary" onClick={addFormOpen}>
                        {translateContent('crmSchemeEnrolment.button.addScheme')}
                    </Button>
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
                                    {translateContent('global.buttons.clear')}
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            )}
        </div>
    );
}
