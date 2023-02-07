import { Modal } from 'antd';
import { FaRegCheckCircle } from 'react-icons/fa';
import { TiInfoOutline } from 'react-icons/ti';

const { success, error } = Modal;

export const handleSuccessModal = ({ title, message }) => {
    success({
        title: title,
        icon: <FaRegCheckCircle size={22} />,
        content: message,
    });
};

export const handleErrorModal = (message) => {
    error({
        title: 'ERROR',
        icon: <TiInfoOutline size={22} />,
        content: message,
    });
};
