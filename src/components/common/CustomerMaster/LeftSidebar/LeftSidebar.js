/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import React from 'react';
import MenuNav from './MenuNav';
import ProfileDetailCard from './ProfileDetailCard';
import styles from 'components/common/Common.module.css';
const LeftSidebar = (props) => {
    const { formActionType: { addMode } = undefined } = props;

    return (
        <>
            {!addMode && <ProfileDetailCard {...props} />}
            <div className={styles.marT30}>
                <MenuNav {...props} />
            </div>
        </>
    );
};

export default LeftSidebar;
