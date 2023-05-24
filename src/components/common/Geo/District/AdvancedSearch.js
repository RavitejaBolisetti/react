import React, { useEffect } from 'react';
import { Col, Form, Row, Select, Input, Button } from 'antd';
import { validateRequiredSelectField, searchValidator } from 'utils/validation';
import { withModal } from 'components/withModal';

import styles from 'components/common/Common.module.css';

const { Option } = Select;

export const AdvancedSearchFrom = (props) => {
    const { isDataCountryLoaded, countryData, defaultCountry, handleFilterChange, filteredStateData } = props;
    const { filterString, setFilterString, advanceFilterForm, handleResetFilter, setAdvanceSearchVisible } = props;

    useEffect(() => {
        advanceFilterForm.resetFields();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString]);

    const onFinish = (values) => {
        setFilterString({ ...values, advanceFilter: true });
        handleFilterChange(false);
        setAdvanceSearchVisible(false);
    };

    const onFinishFailed = () => {
        return;
    };

    const selectProps = {
        optionFilterProp: 'children',
        showSearch: true,
        allowClear: true,
        className: styles.headerSelectField,
    };
    return (
        <Form autoComplete="off" layout="vertical" form={advanceFilterForm} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item initialValue={defaultCountry} label="Country" name="countryCode" rules={[validateRequiredSelectField('Country')]}>
                        {defaultCountry && (
                            <Select defaultValue={defaultCountry} className={styles.headerSelectField} onChange={handleFilterChange('countryCode')} showSearch loading={!isDataCountryLoaded} placeholder="Select" allowClear>
                                {countryData?.map((item) => (
                                    <Option value={item?.countryCode}>{item?.countryName}</Option>
                                ))}
                            </Select>
                        )}
                    </Form.Item>
                </Col>

                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item label="State" initialValue={filterString?.stateCode} name="stateCode">
                        <Select placeholder="Select" {...selectProps} onChange={handleFilterChange('stateCode')}>
                            {filteredStateData?.map((item) => (
                                <Option value={item?.code}>{item?.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Form.Item label="District" initialValue={filterString?.keyword} name="keyword" rules={[{ validator: searchValidator }]}>
                        <Input placeholder="Search" maxLength={50} allowClear />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={20}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.alignLeft}>
                    <Button onClick={handleResetFilter} danger>
                        Reset
                    </Button>
                </Col>

                <Col xs={24} sm={12} md={12} lg={12} xl={12} className={styles.alignRight}>
                    <Button htmlType="submit" type="primary">
                        Search
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export const AdvancedSearch = withModal(AdvancedSearchFrom, {});
