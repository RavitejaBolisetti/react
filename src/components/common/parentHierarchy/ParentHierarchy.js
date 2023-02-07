import React from 'react';
import TreeView from 'components/common/TreeView';
import { Modal } from 'antd';

export function ParentHierarchy({ isModalOpen, setIsModalOpen, dataList, title, fieldNames }) {
    return (
        <div>
            <Modal style={{ top: 100 }} title={title} open={isModalOpen} onOk={() => setIsModalOpen(false)} onCancel={() => setIsModalOpen(false)}>
                <TreeView fieldNames={fieldNames} dataList={dataList} isOpenInModal={true} />
            </Modal>
        </div>
    );
}
