import React, { Fragment, useState, useReducer } from 'react';
import { Form, Divider, Row, Col } from 'antd';

import AddEditForm from './AddEditForm';
import AllowedTimingCard from './AllowedTimingCard';
import { LANGUAGE_EN } from 'language/en';

import styles from 'components/common/Common.module.css';

const AllowedTimingList = (props) => {
    const [isBtnDisabled, setIsBtnDisabled] = useState(false);
    const [timingForm] = Form.useForm();
    const { footerEdit = false, onFinishFailed = () => {}, isReadOnly = false, setFormBtnDisable, setFinalFormdata, finalFormdata, actions } = props;
    const { timeData, setTimeData } = props;
    const { formActionType, isViewModeVisible, criticalityGroupData, formData, setFormData, disabledProps, showGlobalNotification, removeItem, setTimesegmentLengthTracker, forceUpdate, TimesegmentLengthTracker } = props;

    const validatedDuplicateTime = (timeSlotFrom, timeSlotTo) => {
        let timeSegments = [...timeData, { timeSlotFrom, timeSlotTo }];
        if (timeSegments?.length === 1) {
            return false;
        }

        timeSegments?.sort((timeSegment1, timeSegment2) => timeSegment1['timeSlotFrom']?.localeCompare(timeSegment2['timeSlotFrom']));

        for (let i = 0; i < timeSegments.length - 1; i++) {
            const currentEndTime = timeSegments[i]['timeSlotTo'];
            const nextStartTime = timeSegments[i + 1]['timeSlotFrom'];
            if (currentEndTime > nextStartTime) {
                showGlobalNotification({ notificationType: 'error', title: 'Error', message: LANGUAGE_EN.GENERAL.TIME_OVERLAPPING.MESSAGE, placement: 'bottomRight' });
                return true;
            }
        }
        return false;
    };

    const onTimingFormFinish = (values) => {
        let timeSlotFrom = values?.timeSlotFrom?.format('HH:mm');
        let timeSlotTo = values?.timeSlotTo?.format('HH:mm');
        let overlap = validatedDuplicateTime(timeSlotFrom, timeSlotTo);
        !overlap && setTimeData([...timeData, { timeSlotFrom, timeSlotTo }]);
        timingForm.resetFields();
    };

    const cardProps = {
        forceUpdate,
        setTimeData,
        timeData,
        formData,
        removeItem,
        setTimesegmentLengthTracker,
        TimesegmentLengthTracker,
        disabledProps,
        showGlobalNotification,
        setFormData,
    };

    return (
        <Fragment>
            <Row gutter={20}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                    <p className={styles.allowedTimingAlignment}>
                        Allowed Timings<span>*</span>
                    </p>
                </Col>
            </Row>
            {timeData?.length === 0 && formActionType === 'view' ? (
                ''
            ) : (
                <Row gutter={20}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <div className={styles.timingHeader}>
                            <Row gutter={20}>
                                <Col xs={10} sm={10} md={10} lg={10} xl={10} xxl={10}>
                                    <div className={styles.paddingLeft}>Start Time</div>
                                </Col>
                                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                                    <div className={styles.paddingLeft}> End Time</div>
                                </Col>
                            </Row>
                        </div>
                    </Col>
                </Row>
            )}
            <div className={styles.advanceTimingContainer}>
                {!isViewModeVisible ? <AddEditForm setFormBtnDisable={setFormBtnDisable} disabledProps={disabledProps} finalFormdata={finalFormdata} form={timingForm} onFinish={onTimingFormFinish} setIsBtnDisabled={setIsBtnDisabled} isBtnDisabled={isBtnDisabled} criticalityGroupData={criticalityGroupData} validatedDuplicateTime={validatedDuplicateTime} /> : ''}
                {timeData.length > 0 && (
                    <div className={styles.viewTiming}>
                        <div className={styles.seprator}></div>
                        {timeData?.map((timing) => {
                            return <AllowedTimingCard styles={{ marginBottom: '10px', backgroundColor: '#B5B5B6' }} form={timingForm} onFinish={onTimingFormFinish} setFormData={setFormData} forceUpdate={forceUpdate} {...cardProps} {...timing} />;
                        })}
                    </div>
                )}
            </div>
        </Fragment>
    );
};

export default AllowedTimingList;
