/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Form, Button, Row, Col } from 'antd';

import styles from 'assets/sass/app.module.scss';

import { FilterIcon } from 'Icons';
import { RxCross2 } from 'react-icons/rx';
import { VEHICLE_TYPE } from 'constants/VehicleType';

import { SearchBox } from 'components/utils/SearchBox';
import { translateContent } from 'utils/translateContent';

export default function AdvanceFilter(props) {
    const { setResetAdvanceFilter, setFilterString, setAdvanceSearchVisible, handleResetFilter, toggleButton, settoggleButton, advanceFilter, removeFilter, filterString, extraParams } = props;

    const [searchForm] = Form.useForm();

    useEffect(() => {
        searchForm.resetFields();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toggleButton]);

    const searchBoxProps = {
        singleField: true,
        searchForm,
        filterString,
        setFilterString,
        placeholder: translateContent('orderDeliveryVehicleAllotment.label.searchByVin'),
        singleFieldKey: 'searchParam',
        setResetAdvanceFilter,
    };
    return (
        <>
            <div className={styles.contentHeaderBackground}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                        {/* <div className={styles.contentHeaderBackground}> */}
                        <Form autoComplete="off" colon={false} className={styles.masterListSearchForm}>
                            <Form.Item>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={14} lg={14} xl={14} className={styles.verticallyCentered}>
                                        <div className={`${styles.userManagement} ${styles.headingToggle}`}>
                                            {Object.values(VEHICLE_TYPE)?.map((item) => {
                                                return (
                                                    <Button type={toggleButton === item?.key ? 'primary' : 'link'} onClick={() => settoggleButton(item?.key)}>
                                                        {item?.title}
                                                    </Button>
                                                );
                                            })}
                                        </div>
                                        <div className={styles.fullWidth}>
                                            <SearchBox {...searchBoxProps} />
                                            {/* <Search placeholder="Search by VIN No./Chassis No." value={vehicleSearchvalue} onChange={ChangeSearchHandler} allowClear onSearch={onSearchHandle} className={styles.headerSearchField} /> */}
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={24} md={6} lg={6} xl={6} className={styles.verticallyCentered}>
                                        <Button
                                            icon={<FilterIcon />}
                                            type="link"
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

                        {/* </div> */}
                    </Col>
                </Row>

                {advanceFilter && filterString?.advanceFilter && extraParams.find((i) => i.value && i.filter) && (
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
                                                            <RxCross2 data-testid="removeFilter" onClick={() => removeFilter(filter?.key)} />
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
        </>
    );
}
