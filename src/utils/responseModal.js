import { Modal } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';

const { success, error } = Modal;

export const handleSuccessModal = ({ title, message }) => {
    success({
        title: title,
        icon: <ExclamationCircleFilled />,
        content: message,
    });
};

export const handleErrorModal = (message) => {
    error({
        title: 'ERROR',
        icon: <ExclamationCircleFilled />,
        content: message,
    });
};
