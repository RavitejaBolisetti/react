/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Button, Row, Col, Form } from 'antd';
import { FilterIcon } from 'Icons';
import { RxCross2 } from 'react-icons/rx';
import { QueryButtons } from 'components/Sales/VehicleRecieptChecklist/QueryButtons';
import { translateContent } from 'utils/translateContent';

import styles from 'assets/sass/app.module.scss';
import { SearchBox } from 'components/utils/SearchBox';

export default function EvrDetailsCapturingFilter(props) {
    const { extraParams, removeFilter, handleClear, advanceFilter, setAdvanceSearchVisible, searchForm, chargingStatusType, handleChargingTypeChange, handleSearch, filterString, evrStatusList } = props;
    const searchBoxProps = {
        placeholder: translateContent('evrDetailsCapturing.placeholder.headerSearch'),
        allowClear: false,
        singleField: true,
        handleSearchWithoutParameter: handleSearch,
    };
    return (
        <div className={styles.contentHeaderBackground}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                    <Form autoComplete="off" form={searchForm} colon={false} className={styles.masterListSearchForm}>
                        <Form.Item name="normalSearch">
                            <Row gutter={20}>
                                <Col xs={24} sm={24} md={20} lg={20} xl={20} className={styles.verticallyCentered}>
                                    <QueryButtons currentItem={chargingStatusType} items={evrStatusList} onClick={handleChargingTypeChange} />

                                    <div className={styles.fullWidth}>
                                        <SearchBox {...searchBoxProps} />
                                    </div>
                                </Col>
                                {advanceFilter && (
                                    <Col xs={24} sm={24} md={4} lg={4} xl={4} className={styles.verticallyCentered}>
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
                            </Row>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
            {filterString?.advanceFilter && extraParams.find((i) => i.name) && (
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.advanceFilterTop}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={24} lg={22} xl={22} className={styles.advanceFilterContainer}>
                                <div className={styles.advanceFilterTitle}>{translateContent('global.advanceFilter.appliedAdvanceFilter')} </div>
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
                                <Button className={styles.clearBtn} onClick={() => handleClear()} danger>
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
