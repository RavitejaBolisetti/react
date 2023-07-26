/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState } from 'react';
import { Button, Row, Col, Input } from 'antd';
import { FilterIcon } from 'Icons';
import { RxCross2 } from 'react-icons/rx';
import { SearchBox } from 'components/utils/SearchBox';
import { PARAM_MASTER } from 'constants/paramMaster';

import styles from 'components/common/Common.module.css';

const { Search } = Input;

export default function VehicleReceiptFilter(props) {
    const { extraParams, removeFilter, handleResetFilter, advanceFilter = false, otfFilter = false, title, filterString, setFilterString, typeData, setAdvanceSearchVisible, searchForm } = props;

    const [toggleButton, settoggleButton] = useState();
    const handleToggle = (value) => {
        settoggleButton(value);
    };

    return (
        <div className={styles.contentHeaderBackground}>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} className={styles.subheading}>
                    <Row gutter={20}>
                        <Col xs={24} sm={16} md={16} lg={16} xl={16} className={styles.searchAndLabelAlign}>
                            <div className={`${styles.userManagement} ${styles.headingToggle}`}>
                                {/* {Object.values(CUSTOMER_TYPE)?.map((item) => {
                                    return (
                                        <Button type={customerType === item?.id ? 'primary' : 'link'} onClick={() => handleCustomerTypeChange(item?.id)}>
                                            {item?.title}
                                        </Button>
                                    );
                                })} */}
                                <Button className={styles.marR5} type={toggleButton === 'inTransit' ? 'primary' : 'link'} onClick={() => handleToggle('inTransit')}>
                                    In-Transit
                                </Button>
                                <Button type={toggleButton === 'partiallyReceived' ? 'primary' : 'link'} onClick={() => handleToggle('partiallyReceived')}>
                                    Partially Received
                                </Button>
                                <Button type={toggleButton === 'received' ? 'primary' : 'link'} onClick={() => handleToggle('received')}>
                                    Received
                                </Button>
                                <Button type={toggleButton === 'returned' ? 'primary' : 'link'} onClick={() => handleToggle('returned')}>
                                    Returned
                                </Button>
                            </div>
                            <div className={styles.headerSearchField}>
                                <Search placeholder="Search" value="" onChange="" onSearch="" allowClear className={styles.headerSearchField} />
                            </div>
                        </Col>
                        <Col xs={24} sm={8} md={8} lg={8} xl={8} className={styles.verticallyCentered}>
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
