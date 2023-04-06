import { Tree } from 'antd';
import styles from './TreeView.module.css';

const LeftPanel = (props) => {
    const { expandedKeys, autoExpandParent, finalTreeData, selectedTreeKey, onExpand, handleTreeViewClick, isOpenInModal } = props;
    const panelParentClass = styles.panelVisible;

    return (
        <div className={`${styles.leftpanel} ${panelParentClass}`}>
            <div className={styles.treeViewContainer}>
                <div className={styles.treemenu}>
                    <div className={isOpenInModal ? styles.modalView : ''}>
                        <div className={styles.scrollTreeData}>
                            <Tree expandedKeys={expandedKeys} selectedKeys={selectedTreeKey} onSelect={handleTreeViewClick} showLine={true} showIcon={true} onExpand={onExpand} autoExpandParent={autoExpandParent} treeData={finalTreeData} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default LeftPanel;
