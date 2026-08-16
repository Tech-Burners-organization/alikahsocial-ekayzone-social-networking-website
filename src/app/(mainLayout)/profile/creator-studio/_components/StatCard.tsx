import type { StatCardData } from "../_lib/data";

export default function StatCard({ label, value, changePercent, icon: Icon }: StatCardData) {
    return (
        <div className="flex flex-col gap-1.5 rounded-xl border border-border bg-background px-3 py-2.5 shadow-[0px_1px_0.5px_rgba(0,0,0,0.03)]">
            <div className="flex items-center justify-between">
                <Icon className="size-5 text-secondary-color" />
                {changePercent !== 0 && (
                    <span
                        className={
                            changePercent > 0
                                ? "text-sm font-bold text-[#23c56c]"
                                : "text-sm font-bold text-[#d93f3f]"
                        }
                    >
                        {changePercent > 0 ? "+" : ""}
                        {changePercent}%
                    </span>
                )}
            </div>
            <div className="flex flex-col gap-1">
                <p className="text-xl font-bold text-foreground">{value}</p>
                <p className="text-sm text-muted-foreground">{label}</p>
            </div>
        </div>
    );
}
