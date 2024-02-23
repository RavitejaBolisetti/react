/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Button, Row, Col, Form } from 'antd';
import { FilterIcon } from 'Icons';
import { FiPlus } from 'react-icons/fi';
import { RxCross2 } from 'react-icons/rx';
import { SearchBox } from 'components/utils/SearchBox';
import { STOCK_TRANSFER } from 'constants/StockTransfer';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';

export default function AdvanceOTFFilter(props) {
    const { extraParams, removeFilter, handleResetFilter, advanceFilter = false, filterString, setFilterString, toggleButton, setToggleButton, setAdvanceSearchVisible, searchForm, handleOnAddIndentClick } = props;

    useEffect(() => {
        searchForm.resetFields();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toggleButton]);

    const serachBoxProps = {
        searchForm,
        filterString,
        setFilterString,
        singleField: true,
        placeholder: translateContent('stockTransferIndent.label.selectIndentNo'),
    };

    return (
        <div className={styles.contentHeaderBackground}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                    <Form autoComplete="off" colon={false} className={styles.masterListSearchForm}>
                        <Form.Item>
                            <Row gutter={24}>
                                <Col xs={24} sm={24} md={14} lg={14} xl={14} className={styles.verticallyCentered}>
                                    <div className={`${styles.userManagement} ${styles.headingToggle}`}>
                                        {Object.values(STOCK_TRANSFER)?.map((item) => {
                                            return (
                                                <Button type={toggleButton === item?.key ? 'primary' : 'link'} onClick={() => setToggleButton(item?.key)}>
                                                    {item?.title}
                                                </Button>
                                            );
                                        })}
                                    </div>
                                    <Col xs={24} sm={24} md={14} lg={14} xl={14}>
                                        <SearchBox {...serachBoxProps} />
                                    </Col>

                                    {advanceFilter && (
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
                                    )}
                                </Col>
                            </Row>
                        </Form.Item>
                    </Form>
                </Col>

                {toggleButton === STOCK_TRANSFER?.RAISED.key && (
                    <Col xs={24} sm={24} md={6} lg={6} xl={6} className={styles.buttonsGroupRight}>
                        <Button type="primary" icon={<FiPlus />} className={styles.verticallyCentered} onClick={handleOnAddIndentClick}>
                            {translateContent('global.buttons.addIndent')}
                        </Button>
                    </Col>
                )}
            </Row>
            {advanceFilter && filterString?.advanceFilter && extraParams.find((i) => i.name) && (
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.advanceFilterTop}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={22} xl={22} className={styles.advanceFilterContainer}>
                                <div className={styles.advanceFilterTitle}>{translateContent('global.advanceFilter.appliedAdvanceFilter')}: </div>
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
                                <Button className={styles.clearBtn} onClick={() => handleResetFilter()} danger data-testid="clear">
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
