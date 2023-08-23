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
    const { currentSection, setCurrentSection, formActionType } = props;
    const vehicleSectionList = Object.values(VEHICLE_RECIEPT_CHECKLIST_SECTION);

    const onHandle = (key) => {
        setCurrentSection(key);
    };

    const className = (id) => {
        return formActionType?.addMode && id > currentSection ? styles.cursorNotAllowed : styles.cursorPointer;
    };

    const mapIconAndClass = (id) => {
        let activeClassName = '';
        let menuNavIcon = '';

        switch (true) {
            case formActionType?.addMode: {
                switch (true) {
                    case id === currentSection: {
                        activeClassName = styles.active;
                        menuNavIcon = <BsRecordCircleFill className={styles.activeForm} />;
                        break;
                    }
                    case id > currentSection: {
                        activeClassName = styles.inActive;
                        menuNavIcon = <BsRecordCircleFill className={styles.tableTextColor85} />;
                        break;
                    }
                    case id < currentSection: {
                        activeClassName = styles.inActive;
                        menuNavIcon = <FaCheckCircle />;
                        break;
                    }
                    default: {
                        break;
                    }
                }
                break;
            }
            case formActionType?.editMode: {
                switch (true) {
                    case id === currentSection: {
                        activeClassName = styles.active;
                        menuNavIcon = <BsRecordCircleFill className={styles.activeForm} />;
                        break;
                    }

                    default: {
                        activeClassName = styles.inActive;
                        menuNavIcon = <FaCheckCircle />;
                        break;
                    }
                }

                break;
            }
            case formActionType?.viewMode: {
                menuNavIcon = <FaCheckCircle />;
                switch (true) {
                    case id === currentSection: {
                        activeClassName = styles.viewActive;
                        break;
                    }

                    default: {
                        activeClassName = styles.viewInActive;
                        break;
                    }
                }
                break;
            }
            default: {
                break;
            }
        }

        return { activeClassName, menuNavIcon };
    };

    const items = vehicleSectionList
        ?.filter((i) => i?.displayOnList)
        ?.map((item) => ({
            dot: mapIconAndClass(item?.id)?.menuNavIcon,
            children: (
                <div className={className(item?.id)} onClick={() => (!formActionType?.addMode || (formActionType?.addMode && item?.id < currentSection) ? onHandle(item?.id) : '')}>
                    {item.title}
                </div>
            ),
            className: mapIconAndClass(item?.id)?.activeClassName,
        }));

    const finalItem = items?.filter((i) => i);

    return finalItem && <Timeline items={finalItem} />;
};

export default MenuNav;
