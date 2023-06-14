import { PlusBorderedIcon, MinusBorderedIcon } from 'Icons';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import styles from 'components/common/Common.module.css';

export const accordianExpandIcon = (isActive) => (isActive ? <MinusBorderedIcon /> : <PlusBorderedIcon />);

export const expandIcon = (isActive) => (isActive ? <MinusOutlined className={styles.iconsColor} /> : <PlusOutlined className={styles.iconsColor} />);

export const dynamicExpandIcon = (isActive, ExpandIcon = <AiOutlinePlus className={styles.iconsColor} />, InactiveIcon = <AiOutlineMinus className={styles.iconsColor} />) => {
    if (isActive) {
        return InactiveIcon;
    }
    return ExpandIcon;
};
