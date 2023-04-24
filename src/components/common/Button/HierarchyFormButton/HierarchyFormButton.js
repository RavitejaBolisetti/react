import React from 'react';
import { Button } from 'antd';

import { FROM_ACTION_TYPE } from 'constants/formActionType';
import styles from './HierarchyFormButton.module.css';

export const HierarchyFormButton = ({ buttonData, handleButtonClick, cardBtmDisableAction }) => {
    return (
        <div className={styles.hierarchyButtonContainer}>
            <div className={styles.btnLeft}>
                {buttonData?.editBtn && (
                    <Button
                        danger
                        onClick={() => {
                            handleButtonClick(FROM_ACTION_TYPE.EDIT);
                            cardBtmDisableAction(false);
                        }}
                    >
                        Edit
                    </Button>
                )}
            </div>

            <div className={styles.btnRight}>
                {buttonData?.childBtn && (
                    <Button danger type="primary" onClick={() => handleButtonClick(FROM_ACTION_TYPE.CHILD)}>
                        Add Child
                    </Button>
                )}

                {buttonData?.siblingBtn && (
                    <Button danger type="primary" onClick={() => handleButtonClick(FROM_ACTION_TYPE.SIBLING)}>
                        Add Sibling
                    </Button>
                )}
            </div>
        </div>
    );
};
