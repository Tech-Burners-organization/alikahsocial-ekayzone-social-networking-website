'use client';

import { toast } from 'sonner';
import ConfirmModal from '@/components/ui/CustomUi/Modal/ConfirmModal';

interface BlockUserConfirmModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    targetUsername: string;
}

export function BlockUserConfirmModal({ open, onOpenChange, targetUsername }: BlockUserConfirmModalProps) {
    return (
        <ConfirmModal<string>
            open={open}
            onCancel={() => onOpenChange(false)}
            currentRecord={targetUsername}
            onConfirm={(username) => {
                toast.success(`@${username} has been blocked`);
                onOpenChange(false);
            }}
            title="Block User"
            description={`Are you sure you want to block @${targetUsername}? They won't be able to find your profile, videos, or comment on your posts.`}
            confirmText="Block"
            variant="danger"
            iconPreset="block"
        />
    );
}
