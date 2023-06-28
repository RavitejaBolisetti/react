/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React, { useEffect } from 'react';
import { Timeline } from 'antd';
import { BsRecordCircleFill } from 'react-icons/bs';
import { FaCheckCircle } from 'react-icons/fa';
import styles from 'components/common/Common.module.css';
import { OTF_SECTION } from 'constants/OTFSection';
import { OTF_STATUS } from 'constants/OTFStatus';

const MenuNav = (props) => {
    const { currentSection, setCurrentSection, otfData, selectedOrder: { orderStatus = false } = {} } = props;
    const otfSectionList = Object.values(OTF_SECTION);

    useEffect(() => {
        if (currentSection) {
            const TimeLineClass = document.getElementsByClassName('ant-timeline-item');
            for (let i = 0; i < TimeLineClass.length; i++) {
                const activeForm = TimeLineClass[i]['children']['1']['children']['0']['classList']['0'];
                if (activeForm !== undefined && activeForm.match('Common_activeForm')) {
                    TimeLineClass[i].firstChild.style.backgroundColor = '#ff3e5b';
                    TimeLineClass[i].lastChild.firstChild.style.color = '#ff3e5b';
                } else {
                    TimeLineClass[i].firstChild.style.backgroundColor = '#ff3e5b';
                    TimeLineClass[i].lastChild.firstChild.style.color = '#0b0b0c';
                }
            }
            console.log('TimeLineClass', TimeLineClass);
            TimeLineClass[TimeLineClass?.length - 1].firstChild.style.display = 'none';
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentSection]);

    const onHandle = (key) => {
        setCurrentSection(key);
    };

    const validateMenu = (item) => {
        if (item?.id === OTF_SECTION.INVOICE_INFORMATION.id) {
            return orderStatus === OTF_STATUS?.INVOICED.title || orderStatus === OTF_STATUS?.DELIVERED.title;
        }
        switch (item?.id) {
            case OTF_SECTION.FINANCE_DETAILS.id:
                return otfData?.financeArrangedBy === 'DLR';
            case OTF_SECTION.EXCHANGE_VEHICLE.id:
                return otfData?.exchange === 1;
            case OTF_SECTION.REFERRALS.id:
                return otfData?.referral === 'Y';
            case OTF_SECTION.LOYALTY_SCHEME.id:
                return otfData?.loyaltyScheme === 1;
            case OTF_SECTION.INVOICE_INFORMATION.id:
                return otfData?.loyaltyScheme === 1;
            default:
                return true;
        }
    };

    const items = otfSectionList?.map(
        (item) =>
            validateMenu(item) && {
                dot: item?.id === currentSection ? <BsRecordCircleFill className={styles.activeForm} /> : <FaCheckCircle />,
                children: <p onClick={() => onHandle(item?.id)}>{item?.title}</p>,
            }
    );

    return <Timeline items={items} />;
};

export default MenuNav;
