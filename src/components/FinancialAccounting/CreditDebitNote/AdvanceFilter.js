/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Button, Row, Col } from 'antd';
import { FilterIcon } from 'Icons';

import styles from 'assets/sass/app.module.scss';

import { FROM_ACTION_TYPE } from 'constants/formActionType';
import { SearchBox } from 'components/utils/SearchBox';
import { RxCross2 } from 'react-icons/rx';

export default function AdvanceFilter(props) {
    const { handleButtonClick, extraParams, handleResetFilter, advanceFilter = false, otfFilter = false, title, filterString, setFilterString, setAdvanceSearchVisible, searchForm, removeFilter } = props;

    const handleSearchWithoutParameter = (values) => {
        if (values.trim() === '') {
            return;
        }
        searchForm
            .validateFields()
            .then((values) => {
                setFilterString({ ...values, searchType: 'voucherNumber', advanceFilter: true, current: 1 });
                searchForm.resetFields();
            })
            .catch((err) => {
                return;
            });
    };

    const searchBoxProps = {
        singleField: true,
        searchForm,
        filterString,
        setFilterString,
        placeholder: 'Search By Voucher Number',
        label: title,
        handleSearchWithoutParameter,
    };

    return (
        <div className={styles.contentHeaderBackground}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                    <Row gutter={20}>
                        {otfFilter && (
                            <Col xs={24} sm={24} md={14} lg={14} xl={14}>
                                <SearchBox {...searchBoxProps} />
                            </Col>
                        )}
                        {advanceFilter && (
                            <Col xs={24} sm={10} md={10} lg={10} xl={10} className={styles.verticallyCentered}>
                                <Button
                                    icon={<FilterIcon />}
                                    type="link"
                                    className={styles.verticallyCentered}
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
                <Col xs={24} sm={24} md={6} lg={6} xl={6} className={styles.buttonsGroupRight}>
                    <Button type="primary" onClick={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.ADD, transactionType: 'credit' })}>
                        Add Credit Note
                    </Button>
                    <Button type="primary" onClick={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE?.ADD, transactionType: 'debit' })}>
                        Add Debit Note
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
                                                        <RxCross2 onClick={() => removeFilter(filter?.key)} data-testid="remove-filter" />
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
