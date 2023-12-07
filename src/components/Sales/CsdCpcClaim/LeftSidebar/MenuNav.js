/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Timeline } from 'antd';
import { BsRecordCircleFill } from 'react-icons/bs';
import { FaCheckCircle } from 'react-icons/fa';
import styles from 'assets/sass/app.module.scss';
import { DEALER_CORPORATE_SECTION } from 'constants/modules/DealerCorporateClaim/dealerClaimSections';


const MenuNav = (props) => {
    const { currentSection, setCurrentSection, formActionType, previousSection } = props;
    const vehicleSectionList = Object.values(DEALER_CORPORATE_SECTION);
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

                    default: {
                        activeClassName = styles.active;
                        menuNavIcon = <FaCheckCircle />;
                        break;
                    }
                    //     case id === currentSection: {
                    //         activeClassName = styles.active;
                    //         menuNavIcon = <BsRecordCircleFill className={styles.activeForm} />;
                    //         break;
                    //     }
                    //     case id > currentSection: {
                    //         activeClassName = styles.AddmodeinActive;
                    //         menuNavIcon = <BsRecordCircleFill className={styles.tableTextColor85} />;
                    //         break;
                    //     }
                    //     case id < currentSection: {
                    //         activeClassName = styles.inActive;
                    //         menuNavIcon = <FaCheckCircle />;
                    //         break;
                    //     }
                    //     default: {
                    //         break;
                    //     }
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
                        activeClassName = styles.activeForm;
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
                // <div className={className(item?.id)} onClick={() => (!formActionType?.addMode || (formActionType?.addMode && item?.id <= previousSection) ? onHandle(item?.id) : '')}>
                <div className={className(item?.id)} onClick={() => onHandle(item?.id)}>
                    {item.title}
                </div>
            ),
            className: mapIconAndClass(item?.id)?.activeClassName,
        }));

    const finalItem = items?.filter((i) => i);

    return finalItem && <Timeline items={finalItem} />;
};

export default MenuNav;
