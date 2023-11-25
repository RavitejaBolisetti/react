/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
export const CollapseOnChange = (key, activeKey, setActiveKey, defaultCollapse = true) => {
    if (defaultCollapse) {
        if (key && activeKey && Array?.isArray(activeKey) && setActiveKey && setActiveKey instanceof Function) {
            if (activeKey?.includes(key)) {
                setActiveKey(
                    activeKey?.reduce((prev, curr) => {
                        if (curr !== key) {
                            prev.push(curr);
                        }
                        return prev;
                    }, [])
                );
            } else {
                setActiveKey([...activeKey, key]);
            }
        }
    } else {
        if (key && !Array?.isArray(activeKey) && setActiveKey instanceof Function) {
            setActiveKey((prev) => (prev === key ? '' : key));
        } else {
            return false;
        }
    }
};
