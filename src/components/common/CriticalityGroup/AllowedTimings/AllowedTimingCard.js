import React from 'react';

import { Col, Row, Button, Space } from 'antd';

import moment from 'moment';

import { RxCross2 } from 'react-icons/rx';
import { BsTrash3 } from 'react-icons/bs';

import { LANGUAGE_EN } from 'language/en';

import styles from 'components/common/Common.module.css';

const AllowedTimingCard = (props) => {
    const { id } = props;
    const { buttonData, setButtonData, formActionType, setIsAddTimeVisible, setTimeData, timeSlotFrom, timeSlotTo, showGlobalNotification } = props;

    const handleDeleteAction = (val) => {
        showGlobalNotification({ notificationType: 'success', title: 'Success', message: LANGUAGE_EN.GENERAL.ALLOWED_TIMING_DELETED.MESSAGE, placement: 'bottomRight' });
        setTimeData((prev) => {
            const newList = prev;
            const index = prev?.findIndex((el) => el?.timeSlotFrom === val);
            newList.splice(index, 1);
            return [...newList];
        });
    };
    const handleDeleteActionServer = (val) => {
        showGlobalNotification({ notificationType: 'success', title: 'Success', message: LANGUAGE_EN.GENERAL.ALLOWED_TIMING_DELETED.MESSAGE, placement: 'bottomRight' });
        setButtonData({ ...buttonData, formBtnActive: true });

        setTimeData((prev) => {
            const newList = prev;
            const index = prev?.findIndex((el) => el?.id === val);
            setIsAddTimeVisible(true);
            newList[index].isDeleted = 'Y';
            return [...newList];
        });
    };

    return (
        <div className={styles.timingCardItem} key={timeSlotFrom}>
            <Space size="middle">
                <Row>
                    <Col xs={24} sm={24} md={11} lg={11} xl={11} xxl={11}>
                        <p className={styles.timeSlot}>{moment(timeSlotFrom, 'HH:mm').format('hh:mm A')}</p>
                        <p className={styles.timeLabel}>Start Time</p>
                    </Col>
                    <Col xs={24} sm={24} md={11} lg={11} xl={11} xxl={11}>
                        <p className={styles.timeSlot}>{moment(timeSlotTo, 'HH:mm').format('hh:mm A')}</p>
                        <p className={styles.timeLabel}>End Time</p>
                    </Col>
                    <Col xs={24} sm={24} md={2} lg={2} xl={2} className={styles.timeSlotClearBtn}>
                        {!formActionType?.viewMode && (!id ? <Button onClick={() => handleDeleteAction(timeSlotFrom)} type="link" icon={<RxCross2 size={20} />} /> : <Button onClick={() => handleDeleteActionServer(id)} type="link" icon={<BsTrash3 size={20} />} />)}
                    </Col>
                </Row>
            </Space>
        </div>
    );
};

export default AllowedTimingCard;