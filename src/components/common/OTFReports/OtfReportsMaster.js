/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Row, Col, Button, Select, Checkbox, Space } from 'antd';
import { bindActionCreators } from 'redux';

import { showGlobalNotification } from 'store/actions/notification';
import { convertDate } from 'utils/formatDateTime';

import styles from 'assets/sass/app.module.scss';
//import styles from 'components/common/Common.module.css';

import { BASE_URL_OTF_DOWNLAOD_REPORT } from 'constants/routingApi';

import { otfReportsDataActions } from 'store/actions/data/otfReports';

const { Option } = Select;

const mapStateToProps = (state) => {
    const {
        auth: { userId, token },
        data: {
            OtfReports: { isLoaded: isDataOtfLoaded = false, isLoading: isOtfReportLoading = false, data: otfReportData = [] },
        },
    } = state;

    const moduleTitle = 'OTF Reports';

    let returnValue = {
        userId,
        token,
        isDataOtfLoaded,
        isOtfReportLoading,
        otfReportData,
        moduleTitle,
    };
    return returnValue;
};

const mapDispatchToProps = (dispatch) => ({
    dispatch,
    ...bindActionCreators(
        {
            fetchList: otfReportsDataActions.fetchList,
            saveData: otfReportsDataActions.saveData,
            resetData: otfReportsDataActions.reset,
            listShowLoading: otfReportsDataActions.listShowLoading,
            showGlobalNotification,
        },
        dispatch
    ),
});

export const OtfReportsMasterBase = (props) => {
    const { fetchList, userId, token, isDataOtfLoaded, listShowLoading, showGlobalNotification, otfReportData } = props;

    const [form] = Form.useForm();

    const [selectedColumn, setSelectedColumn] = useState();
    const [reportOption, setReportOption] = useState();

    useEffect(() => {
        if (userId && !isDataOtfLoaded) {
            fetchList({ setIsLoading: listShowLoading, userId });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, isDataOtfLoaded]);

    useEffect(() => {
        if (otfReportData) {
            setReportOption(otfReportData);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [otfReportData]);

    useEffect(() => {
        if (isDataOtfLoaded) {
            const finalData = otfReportData
                ?.filter((item) => item.status)
                ?.map((i) => {
                    return i?.id;
                });
            setSelectedColumn(finalData);
            form.setFieldValue('column', finalData);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDataOtfLoaded]);

    const onFinish = (values) => {
        const AuthStr = 'Bearer '.concat(token);
        const headers = { Authorization: AuthStr, userId, accessToken: token, deviceType: 'W', deviceId: '' };
        let sExtraParamsString = '?id='.concat(values?.column);

        fetch(BASE_URL_OTF_DOWNLAOD_REPORT + sExtraParamsString, {
            method: 'GET',
            headers: headers,
        }).then((response) => {
            response.blob().then((blob) => {
                let url = window.URL.createObjectURL(blob);
                let a = document.createElement('a');
                a.href = url;
                a.download = 'OTF-Report-' + convertDate(undefined, 'YYYY-MM-DD_HH:mm:ss') + '.csv';
                a.click();
                // form.resetFields();
                showGlobalNotification({ notificationType: 'success', title: 'SUCCESS', message: 'Your download should start automatically in a few seconds' });
            });
        });
    };

    const onFinishFailed = (errorInfo) => {
        form.validateFields().then((values) => {});
    };

    const handleOtfReportChange = (values) => {
        const finalReport = reportOption?.map((option, index) => {
            return { ...option, status: values?.includes(option?.id) };
        });
        setReportOption(finalReport);
    };

    let reportOptions = [];
    otfReportData.forEach((element) => {
        reportOptions.push({ key: element.id, label: element?.reportDisplayName });
    });

    return (
        <>
            <div className={styles.contentHeaderBackground}>
                <Form layout="vertical" form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
                    <Row gutter={20}>
                        <Col xs={24} sm={24} md={3} lg={3} xl={3}>
                            <Form.Item label="Model Group" name="modelGroup">
                                <Select defaultValue="All">
                                    <Option value="-1">All</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={3} lg={3} xl={3}>
                            <Form.Item label="Location" name="location">
                                <Select defaultValue="All">
                                    <Option value="-1">All</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={3} lg={3} xl={3}>
                            <Form.Item label="Aging" name="aging">
                                <Select defaultValue="All">
                                    <Option value="-1">All</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={11} lg={11} xl={11}>
                            <Form.Item label="Column" name="column" initialValue={selectedColumn}>
                                <Select optionLabelProp="label" onChange={handleOtfReportChange} mode="multiple" placeholder="Select Column">
                                    {reportOption?.map((element, index) => (
                                        <Option value={element?.id} label={element?.reportDisplayName}>
                                            <Space>
                                                <span>
                                                    <Checkbox checked={element?.status}></Checkbox>
                                                </span>
                                                {element?.reportDisplayName}
                                            </Space>
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                            <Button style={{ marginTop: '20px' }} htmlType="submit" type="primary">
                                Download
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </>
    );
};

export const OtfReportsMaster = connect(mapStateToProps, mapDispatchToProps)(OtfReportsMasterBase);
