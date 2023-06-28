/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { Result } from 'antd';

const SuccessPage = ({ status, title, subTitle }) => {
    return <Result status={status || 'success'} title={title} subTitle={subTitle} />;
};

export default SuccessPage;
