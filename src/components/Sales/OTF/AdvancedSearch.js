import React, { useState, useEffect } from 'react';
import { Col, Form, Row, Select, Button, DatePicker } from 'antd';
import { withModal } from 'components/withModal';
import styles from 'components/common/Common.module.css';

const { Option } = Select;

export const AdvancedSearchFrom = (props) => {
    const { handleFilterChange } = props;
    const { filterString, setFilterString, form, handleResetFilter, setAdvanceSearchVisible, otfStatusList } = props;
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState();

    useEffect(() => {
        form.resetFields();
        form.setFieldsValue({ code: filterString?.code });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterString]);

    const onFinish = (values) => {
        setFilterString({ ...values, advanceFilter: true });
        handleFilterChange(false);
        setAdvanceSearchVisible(false);
        form.resetFields();
    };
    const { isDivisionDataLoaded } = props;
    //const { departmentData } = props;

    //const [filteredDepartmentData, setFilteredDepartmentData] = useState([]);
    const handleDivisionChange = (division) => {
        handleFilterChange('divisionCode');
        //setFilteredDepartmentData(departmentData?.filter((i) => i?.parentKey === division));
    };

    const onFinishFailed = () => {
        return;
    };

    // const selectProps = {
    //     optionFilterProp: 'children',
    //     showSearch: true,
    //     allowClear: true,
    //     className: styles.headerSelectField,
    // };
    return (
        <Form autoComplete="off" layout="vertical" form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={16}>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item  label="From Date" name="fromDate" >
                        <DatePicker style={{ width: '100%' }} selected={startDate} onChange={(date) => setStartDate(date)} selectsStart maxDate={endDate} />
                    </Form.Item>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                    <Form.Item  label="To Date" name="toDate">
                        <DatePicker style={{ width: '100%' }} selected={endDate} onChange={(date) => setEndDate(date)} selectsEnd startDate={startDate} minDate={startDate} />
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Form.Item  label="OTF Status" name="orderStatus" >
                        <Select className={styles.headerSelectField} showSearch loading={!isDivisionDataLoaded} placeholder="Select" allowClear onChange={handleDivisionChange}>
                            {otfStatusList?.map((item) => (
                                <Option key={item?.key} value={item?.key}>
                                    {item?.value}
                                </Option>
                            ))}
                        </Select>
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
                        Apply
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export const AdvancedSearch = withModal(AdvancedSearchFrom, {});
