/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { Button } from 'antd';
import styles from 'components/common/Common.module.css';

export const QueryButtons = ({ items = {}, onClick, currentItem = '' }) => {
    const handleQuery = (name) => {
        onClick(name);
    };
    return (
        <div className={`${styles.userManagement} ${styles.headingToggle}`}>
            {Object.values(items)?.map((item, index) => {
                return (
                    <Button onClick={() => handleQuery(item?.key)} type={currentItem ? 'primary' : item?.active ? 'primary' : 'link'}>
                        {item?.title}
                    </Button>
                );
            })}
        </div>
    );
};
