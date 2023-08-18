/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { Form, Button, Row, Col, Input } from 'antd';

import styles from 'components/common/Common.module.css';
import { FilterIcon } from 'Icons';
import { RxCross2 } from 'react-icons/rx';
import { VEHICLE_TYPE } from 'constants/VehicleType';

const { Search } = Input;

export default function AdvanceFilter(props) {
    const { vehicleSearchvalue, ChangeSearchHandler, onSearchHandle, setAdvanceSearchVisible, handleResetFilter, toggleButton, settoggleButton, advanceFilter, removeFilter, filterString, extraParams } = props;

    return (
        <>
            <div className={styles.contentHeaderBackground}>
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        {/* <div className={styles.contentHeaderBackground}> */}
                        <Form autoComplete="off" colon={false} className={styles.masterListSearchForm}>
                            <Form.Item>
                                <Row gutter={20}>
                                    <Col xs={24} sm={24} md={5} lg={5} xl={5} className={styles.verticallyCentered}>
                                        <div className={`${styles.userManagement} ${styles.headingToggle}`}>
                                            {Object.values(VEHICLE_TYPE)?.map((item) => {
                                                return (
                                                    <Button type={toggleButton === item?.id ? 'primary' : 'link'} onClick={() => settoggleButton(item?.id)}>
                                                        {item?.title}
                                                    </Button>
                                                );
                                            })}
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={24} md={7} lg={7} xl={7} className={styles.fullWidth}>
                                        <div className={styles.selectSearchBg}>
                                            <Search placeholder="Search by VIN No./Chassis No." value={vehicleSearchvalue} onChange={ChangeSearchHandler} allowClear onSearch={onSearchHandle} className={styles.headerSearchField} />
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
                                            Advanced Filters
                                        </Button>
                                    </Col>
                                </Row>
                            </Form.Item>
                        </Form>

                        {/* </div> */}
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
        </>
    );
}
