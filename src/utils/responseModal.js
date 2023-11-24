/*
 *   Copyright (c) 2023 Mahindra & Mahindra Ltd.
 *   All rights reserved.
 *   Redistribution and use of any source or binary or in any form, without written approval and permission is prohibited. Please read the Terms of Use, Disclaimer & Privacy Policy on https://www.mahindra.com/
 */
import { Modal } from 'antd';
import { FaRegCheckCircle } from 'react-icons/fa';
import { TiInfoOutline } from 'react-icons/ti';
import { translateContent } from './translateContent';

const { success, error } = Modal;

export const handleSuccessModal = ({ title, message }) => {
    success({
        title: title,
        icon: <FaRegCheckCircle size={22} style={{ color: '#00A310', paddingRight: '8px' }} />,
        content: message,
    });
};

export const handleErrorModal = (message) => {
    error({
        title: translateContent('global.notificationError.title'),
        icon: <TiInfoOutline size={22} style={{ color: '#FF3E5B', paddingRight: '8px' }} />,
        content: message,
    });
};
