/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Button, Row, Col, Form, Input, Divider, Checkbox } from 'antd';
import { FilterIcon } from 'Icons';
import { RxCross2 } from 'react-icons/rx';
import { SearchBox } from 'components/utils/SearchBox';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';
import { USER_TYPE } from 'constants/userType';
import { customSelectBox } from 'utils/customSelectBox';
import { preparePlaceholderSelect, preparePlaceholderText } from 'utils/preparePlaceholder';

const { Search } = Input;

export default function AdvanceVehiclePriceMasterFilter(props) {
    const { showMoreList, setShowMoreList } = props;

    console.log('showMoreList', showMoreList);

    const handleChangeCheckbox = (event) => {
        console.log('event', event.target.name);
        console.log('value', event.target.checked);
        setShowMoreList((prev) => ({
            ...prev,
            [event.target.name]: event.target.checked,
        }));
    };

    return (
        <div className={styles.contentHeaderBackground}>
            <Form
                // layout="inline"
                layout="vertical"
                autoComplete="off"
                // size='small'
                colon={false}
            >
                <Row gutter={20}>

                    <Col xs={24} sm={4} md={4} lg={4} xl={4}>
                        <Form.Item label={'Part No'} name={'partNo'}>
                            <Search maxLength={50} placeholder={preparePlaceholderText('Part No')} loading={false} allowClear />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={4} md={4} lg={4} xl={4}>
                        <Form.Item label={translateContent('Part Description' || 'city.label.countryCode')} name="partDescription" placeholder={preparePlaceholderSelect('Part Description' || translateContent('city.placeholder.country'))}>
                            <Input placeholder={preparePlaceholderText('Part Description' || translateContent('city.placeholder.cityCode'))} />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={4} md={4} lg={4} xl={4}>
                        <Form.Item label={'Branch' || translateContent('designationMaster.label.mileSkill')} name="Branch">
                            {customSelectBox({ data: [], placeholder: preparePlaceholderSelect('Branch' || translateContent('designationMaster.placeholder.mileSkill')) })}
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12} md={4} lg={4} xl={4} className={styles.verticallyCentered}>
                        <Button type="primary">Get Details</Button>
                    </Col>
                    <Col xs={6} sm={6} md={6} lg={6} xl={6} className={styles.verticallyCentered}>
                        <Row gutter={16} style={{ borderLeft: '1px solid black' }}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Checkbox onChange={handleChangeCheckbox} name="isDealer">
                                    Show Dealer Wise Stock
                                </Checkbox>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Checkbox onChange={handleChangeCheckbox} name="isPlant">
                                    Show Plant Wise Stock
                                </Checkbox>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}
