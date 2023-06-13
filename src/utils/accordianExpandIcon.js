import { PlusBorderedIcon, MinusBorderedIcon } from 'Icons';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import styles from 'components/common/Common.module.css';


export const accordianExpandIcon = (isActive ) => isActive ? <MinusBorderedIcon /> : <PlusBorderedIcon />

export const expandIcon = ( isActive ) => (isActive ? <MinusOutlined className={styles.iconsColor} /> : <PlusOutlined className={styles.iconsColor} />);