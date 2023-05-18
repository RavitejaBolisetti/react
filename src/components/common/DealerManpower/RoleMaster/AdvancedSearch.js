import React, { useState, useEffect } from 'react';
import { Col, Form, Row, Select, Input, Button } from 'antd';
import { validateRequiredInputField, validateRequiredSelectField, validatePincodeField } from 'utils/validation';
import { withModal } from 'components/withModal';
import { searchValidator } from 'utils/validation';

import styles from 'components/common/Common.module.css';

const { Option } = Select;

export const AdvancedSearchFrom = (props) => {
    const { form, formData, handleFilterChange } = props;
    const { filterString, setFilterString, advanceFilterForm, handleResetFilter, setAdvanceSearchVisible } = props;

    useEffect(() => {
        advanceFilterForm.resetFields();
        advanceFilterForm.setFieldsValue({ code: filterString?.code });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString]);

    const onFinish = (values) => {
        setFilterString({ ...values, advanceFilter: true });
        handleFilterChange(false);
        setAdvanceSearchVisible(false);
    };
    const { isDivisionDataLoaded, divisionData } = props;
    const { isDepartmentDataLoaded, departmentData } = props;

    const [filteredDepartmentData, setFilteredDepartmentData] = useState([]);
    const handleDivisionChange = (division) => {
        handleFilterChange('divisionCode');
        // form.setFieldValue('departmentName', undefined);
        setFilteredDepartmentData(departmentData?.filter((i) => i?.divisionCode === division));
    };

    const onFinishFailed = () => {
        return;
    };

    const filterOption = (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 || option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;

    const selectProps = {
        filterOption,
        showSearch: true,
        allowClear: true,
        className: styles.headerSelectField,
    };
    return (
        <Form layout="vertical" form={advanceFilterForm} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item initialValue={formData?.divisionCode} label="Division Name" name="divisionCode">
                        <Select className={styles.headerSelectField} showSearch loading={!isDivisionDataLoaded} placeholder="Select" allowClear onChange={handleDivisionChange}>
                            {divisionData?.map((item) => (
                                <Option value={item?.code}>{item?.divisionName}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>

                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item initialValue={formData?.departmentCode} label="Department Name" name="departmentCode">
                        <Select className={styles.headerSelectField} {...selectProps} showSearch loading={!isDepartmentDataLoaded} placeholder="Select" allowClear onChange={handleFilterChange('departmentCode')}>
                            {filteredDepartmentData?.map((item) => (
                                <Option value={item?.departmentCode}>{item?.departmentName}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Form.Item initialValue={formData?.roleCode} label="Role Code" name="keyword" rules={[{ validator: searchValidator }]}>
                        <Input className={styles.inputBox} maxLength={6} />
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
