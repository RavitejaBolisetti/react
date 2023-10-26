/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Timeline } from 'antd';
import { BsRecordCircleFill } from 'react-icons/bs';
import { FaCheckCircle } from 'react-icons/fa';

import { USER_TYPE_USER } from 'constants/modules/UserManagement/userType';
import { DEALER_USER_SECTION } from 'constants/modules/UserManagement/DealerUserSection';
import { MANUFACTURER_USER_SECTION } from 'constants/modules/UserManagement/ManufacturerUserSection';

import styles from 'assets/sass/app.module.scss';

const MenuNav = (props) => {
    const { userType, currentSection, setCurrentSection, previousSection, formActionType } = props;
    const profileOptions = userType === USER_TYPE_USER?.DEALER?.id ? Object.values(DEALER_USER_SECTION) : Object.values(MANUFACTURER_USER_SECTION);
    const onHandle = (key) => {
        setCurrentSection(key);
    };

    const className = (id) => {
        return formActionType?.addMode && id > previousSection ? styles.cursorNotAllowed : styles.cursorPointer;
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
                        activeClassName = styles.AddmodeinActive;
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

    const items = profileOptions
        ?.filter((i) => i?.displayOnList)
        ?.map((item) => ({
            dot: mapIconAndClass(item?.id)?.menuNavIcon,
            children: (
                <div className={className(item?.id)} onClick={() => (!formActionType?.addMode || (formActionType?.addMode && item?.id <= previousSection) ? onHandle(item?.id) : '')}>
                    {item.title}
                </div>
            ),
            className: mapIconAndClass(item?.id)?.activeClassName,
        }))
        ?.filter((i) => i);

    return items && <Timeline items={items} />;
};

export default MenuNav;
