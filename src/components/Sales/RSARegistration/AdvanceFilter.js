/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Button, Row, Col, Input, Form } from 'antd';
import { FilterIcon } from 'Icons';
import { RxCross2 } from 'react-icons/rx';
import { FiPlus } from 'react-icons/fi';
import { SearchBox } from 'components/utils/SearchBox';

import { PARAM_MASTER } from 'constants/paramMaster';
import styles from 'assets/sass/app.module.scss';
import { FROM_ACTION_TYPE } from 'constants/formActionType';
const { Search } = Input;

export default function AdvanceFilter(props) {
    const { extraParams, handleResetFilter, typeData, selectedStatusType, advanceFilter = false, filterString, setFilterString, setResetAdvanceFilter, setAdvanceSearchVisible, searchForm, removeFilter, setSelectedStatusType, handleButtonClick, invoiceStatusList, showAddButton } = props;

    useEffect(() => {
        searchForm.resetFields();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedStatusType]);

    const searchBoxProps = {
        singleField: false,
        searchForm,
        filterString,
        setFilterString,
        optionType: typeData?.[PARAM_MASTER.AMC_SEARCH_TYPE.id],
        placeholder: 'Input Parameter',
        singleFieldKey: 'searchParam',
        setResetAdvanceFilter,
        //defaultOption: 'vin',
    };

    return (
        <div className={styles.contentHeaderBackground}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={20} lg={20} xl={20}>
                    <Form autoComplete="off" colon={false} className={styles.masterListSearchForm}>
                        <Form.Item>
                            <Row gutter={24}>
                                <Col xs={24} sm={24} md={14} lg={14} xl={14} className={styles.verticallyCentered}>
                                    <div className={`${styles.userManagement} ${styles.headingToggle}`}>
                                        {Object.values(invoiceStatusList)?.map((item) => {
                                            return (
                                                <Button type={selectedStatusType === item?.key ? 'primary' : 'link'} onClick={() => setSelectedStatusType(item?.key)}>
                                                    {item?.title}
                                                </Button>
                                            );
                                        })}
                                    </div>
                                    <Col xs={24} sm={24} md={20} lg={20} xl={20}>
                                        <SearchBox {...searchBoxProps} />
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
                                                Advance Filters
                                            </Button>
                                        </Col>
                                    )}
                                </Col>
                            </Row>
                        </Form.Item>
                    </Form>
                </Col>

                {showAddButton && (
                    <Col xs={24} sm={24} md={4} lg={4} xl={4} className={styles.buttonsGroupRight}>
                        <Button type="primary" icon={<FiPlus />} className={styles.verticallyCentered} onClick={() => handleButtonClick({ buttonAction: FROM_ACTION_TYPE.ADD })}>
                            Add
                        </Button>
                    </Col>
                )}
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
