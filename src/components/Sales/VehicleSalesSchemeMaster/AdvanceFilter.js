/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Button, Row, Col, Form } from 'antd';
import { FilterIcon } from 'Icons';
import { RxCross2 } from 'react-icons/rx';
import { SearchBox } from 'components/utils/SearchBox';
import { PARAM_MASTER } from 'constants/paramMaster';
import { PlusOutlined } from '@ant-design/icons';

import styles from 'assets/sass/app.module.scss';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { translateContent } from 'utils/translateContent';

export default function AdvanceFilter(props) {
    const { extraParams, removeFilter, handleResetFilter, advanceFilter = false, title, filterString, setFilterString, typeData, setAdvanceSearchVisible, searchForm, showAddButton = true, handleButtonClick, handleOnClick ,record} = props;

    const serachBoxProps = {
        searchForm,
        filterString,
        optionType: typeData[PARAM_MASTER?.SCHEME_CODE?.id],
        defaultOption: 'schemeCode',
        setFilterString,
        // allowClear: false,
    };

    return (
        <div className={styles.contentHeaderBackground}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={16} lg={16} xl={16}>
                    <Form autoComplete="off" colon={false} className={styles.masterListSearchForm}>
                        <Form.Item label={`${title}`}>
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={14} lg={14} xl={14}>
                                    <SearchBox {...serachBoxProps} />
                                </Col>

                                <Col xs={24} sm={24} md={6} lg={6} xl={6} className={styles.verticallyCentered}>
                                    <Button
                                        type="link"
                                        icon={<FilterIcon />}
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
                <Col xs={24} sm={24} md={8} lg={8} xl={8} className={styles.buttonsGroupRight}>
                    <Button type="primary" onClick={handleOnClick}>
                        {translateContent('global.buttons.upload')}
                    </Button>
                    {showAddButton && (
                        <Button icon={<PlusOutlined />} type="primary" onClick={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE.ADD, record, openDefaultSection: false })}>
                            {translateContent('vehicleSalesSchemeMaster.button.addScheme')}
                        </Button>
                    )}
                </Col>
                {/* <Col className={styles.buttonsGroupRight} xs={24} sm={24} md={6} lg={6} xl={6}>
                    {showAddButton && (
                        <Button icon={<PlusOutlined />} type="primary" onClick={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.ADD })}>
                            Add
                        </Button>
                    )}
                </Col> */}
            </Row>
            {advanceFilter && filterString?.advanceFilter && extraParams.find((i) => i.name) && (
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.advanceFilterTop}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={22} xl={22} className={styles.advanceFilterContainer}>
                                <div className={styles.advanceFilterTitle}>{translateContent('global.advanceFilter.appliedAdvanceFilter')}</div>
                                {extraParams?.map((filter) => {
                                    return (
                                        filter?.value &&
                                        filter?.filter && (
                                            <div className={styles.advanceFilterItem} key={filter?.key}>
                                                {filter?.name}
                                                {filter?.canRemove && (
                                                    <span>
                                                        <RxCross2 onClick={() => removeFilter(filter?.key)} data-testid="removeBtn" />
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
