/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */

import {useState} from 'react';
import { Button, Row, Col, Input, Select } from 'antd';

import styles from 'components/common/Common.module.css';
import { PlusOutlined } from '@ant-design/icons';
import { FilterIcon } from 'Icons';
import { VEHICLE_TYPE } from 'constants/VehicleType';

const { Search } = Input;
const { Option } = Select;


export default function AdvanceFilter(props) {
    const { vehicleSearchvalue, ChangeSearchHandler, onSearchHandle, handleChange, FROM_ACTION_TYPE, setAdvanceSearchVisible } = props;
    const [toggleButton, settoggleButton] = useState(VEHICLE_TYPE?.UNALLOTED.id);

    return (
        <>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <div className={styles.contentHeaderBackground}>
                        <Row gutter={20}>
                            <Col xs={24} sm={24} md={5} lg={5} xl={5}>
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
                            <Col xs={24} sm={24} md={7} lg={7} xl={7}>
                                <div className={styles.selectSearchBg}>
                                    <Search placeholder="Search by VIN No./Chassis No." value={vehicleSearchvalue} onChange={ChangeSearchHandler} allowClear onSearch={onSearchHandle} className={styles.headerSearchField} />
                                </div>
                            </Col>
                            <Col xs={24} sm={24} md={6} lg={6} xl={6} className={styles.verticallyCentered}>
                                <Button icon={<FilterIcon />}  type="link"
                                    onClick={() => {
                                        setAdvanceSearchVisible(true);
                                    }}
                                >
                                    Advanced Filters
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </>
    );
}
