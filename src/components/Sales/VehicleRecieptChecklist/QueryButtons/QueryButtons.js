/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { Button } from 'antd';

import styles from 'assets/sass/app.module.scss';
import { translateContent } from 'utils/translateContent';

export const QueryButtons = ({ items = {}, onClick, currentItem = items?.PENDING?.key, moduleKey = undefined }) => {
    return (
        <div className={`${styles.userManagement} ${styles.headingToggle}`}>
            {Object.entries(items)?.map(([keyName, item], index) => {
                return (
                    <Button onClick={() => onClick(item, keyName)} type={currentItem === item?.key ? 'primary' : 'link'}>
                        {moduleKey ? translateContent(`${moduleKey}.constants.${item?.translateKey ? item?.translateKey : item?.title}`) : item?.title}
                    </Button>
                );
            })}
        </div>
    );
};
