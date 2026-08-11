'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import ReusableModal from '@/components/ui/CustomUi/ReuseableModal';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { REPORT_REASONS, type ReportReason } from './types';

interface ReportModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    targetUsername: string;
    target: 'video' | 'profile';
}

export function ReportModal({ open, onOpenChange, targetUsername, target }: ReportModalProps) {
    const [reason, setReason] = useState<ReportReason | ''>('');
    const [details, setDetails] = useState('');

    const reset = () => {
        setReason('');
        setDetails('');
    };

    const handleSubmit = () => {
        if (!reason) return;
        toast.success(`Report submitted for @${targetUsername}`);
        reset();
        onOpenChange(false);
    };

    const title = target === 'video' ? 'Report Video' : 'Report Profile';
    const subject = target === 'video' ? 'this video' : `@${targetUsername}`;

    return (
        <ReusableModal
            open={open}
            onOpenChange={(next) => {
                if (!next) reset();
                onOpenChange(next);
            }}
            title={title}
            description={`Tell us why you're reporting ${subject}. Your report is anonymous.`}
            footer={
                <Button type="button" disabled={!reason} onClick={handleSubmit}>
                    Submit Report
                </Button>
            }
        >
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-base-color">Reason</label>
                    <Select value={reason} onValueChange={(value) => setReason(value as ReportReason)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a reason" />
                        </SelectTrigger>
                        <SelectContent>
                            {REPORT_REASONS.map((option) => (
                                <SelectItem key={option} value={option}>
                                    {option}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-base-color">Details (Optional)</label>
                    <Textarea
                        value={details}
                        onChange={(event) => setDetails(event.target.value)}
                        placeholder={`Describe the reason for reporting ${target === 'video' ? 'this video' : 'this profile'}`}
                        rows={4}
                    />
                </div>
            </div>
        </ReusableModal>
    );
}
