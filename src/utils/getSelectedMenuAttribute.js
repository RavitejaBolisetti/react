/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { BsRecordCircleFill } from 'react-icons/bs';
import { FaCheckCircle } from 'react-icons/fa';

import styles from 'assets/sass/app.module.scss';

export const getSelectedMenuAttribute = ({ id, formActionType, currentSection }) => {
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
