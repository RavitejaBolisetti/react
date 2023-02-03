import React from 'react';
import TreeView from 'components/common/TreeView';
import { Modal } from 'antd';

export default function ParentHierarchy({ open, setOpen, title }) {
    return (
        <div>
            <Modal style={{ top: 100 }} title={title} open={open} onOk={() => setOpen(false)} onCancel={() => setOpen(false)}>
                <TreeView isOpenInModal={true} />
            </Modal>
        </div>
    );
}
