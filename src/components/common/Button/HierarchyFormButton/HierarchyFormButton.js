/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import { Button } from 'antd';

import { FROM_ACTION_TYPE } from 'constants/formActionType';
import styles from './HierarchyFormButton.module.css';

export const HierarchyFormButton = ({ buttonData, handleButtonClick }) => {
    return (
        <div className={styles.hierarchyButtonContainer}>
            <div className={styles.btnLeft}>
                {buttonData?.editBtn && (
                    <Button
                        danger
                        onClick={() => {
                            handleButtonClick(FROM_ACTION_TYPE.EDIT);
                        }}
                    >
                        Edit
                    </Button>
                )}
            </div>

            <div className={styles.btnRight}>
                {buttonData?.childBtn && (
                    <Button type="primary" onClick={() => handleButtonClick(FROM_ACTION_TYPE.CHILD)}>
                        Add Child
                    </Button>
                )}

                {buttonData?.siblingBtn && (
                    <Button type="primary" onClick={() => handleButtonClick(FROM_ACTION_TYPE.SIBLING)}>
                        Add Sibling
                    </Button>
                )}
            </div>
        </div>
    );
};
