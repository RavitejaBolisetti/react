/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Timeline } from 'antd';
import { BsRecordCircleFill } from 'react-icons/bs';
import { FaCheckCircle } from 'react-icons/fa';
import styles from 'components/common/Common.module.css';
import { VEHICLE_RECIEPT_CHECKLIST_SECTION } from 'constants/VehicleRecieptCheckListSection';

const MenuNav = (props) => {
    const { currentSection, setCurrentSection, addMode, editMode, viewMode } = props;
    const vehicleSectionList = Object.values(VEHICLE_RECIEPT_CHECKLIST_SECTION);

    const onHandle = (key) => {
        setCurrentSection(key);
    };

    const className = (item) => {
        return addMode ? styles.cursorNotAllowed : styles.cursorPointer;
    };

    const mapIconAndClass = (id) => {
        let activeClassName = '';
        let menuNavIcon = '';

        if (addMode) {
            if (currentSection === id) {
                activeClassName = styles.active;
                menuNavIcon = <BsRecordCircleFill className={styles.activeForm} />;
            } else if (id > currentSection) {
                activeClassName = styles.inActive;
                menuNavIcon = <BsRecordCircleFill className={styles.tableTextColor85} />;
            } else if (id < currentSection) {
                activeClassName = styles.inActive;
                menuNavIcon = <FaCheckCircle />;
            }
        } else if (editMode) {
            if (currentSection === id) {
                activeClassName = styles.active;
                menuNavIcon = <BsRecordCircleFill className={styles.activeForm} />;
            } else {
                activeClassName = styles.inActive;
                menuNavIcon = <FaCheckCircle />;
            }
        } else {
            menuNavIcon = <FaCheckCircle />;
            if (currentSection === id) {
                activeClassName = styles.viewActive;
            } else {
                activeClassName = styles.viewInActive;
            }
        }

        return { activeClassName, menuNavIcon };
    };

    const items = vehicleSectionList
        ?.filter((i) => i?.displayOnList)
        ?.map((item) => ({
            dot: mapIconAndClass(item?.id)?.menuNavIcon,
            children: (
                <div className={className(item)} onClick={() => (!addMode ? onHandle(item?.id) : '')}>
                    {item.title}
                </div>
            ),
            className: mapIconAndClass(item?.id)?.activeClassName,
        }));

    const finalItem = items?.filter((i) => i);

    return finalItem && <Timeline items={finalItem} />;
};

export default MenuNav;
