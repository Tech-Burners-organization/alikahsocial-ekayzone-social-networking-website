import Image from "next/image";
import type { ShopStat } from "../_lib/data";

export default function ShopStatCard({ stat }: { stat: ShopStat }) {
    return (
        <div className="flex flex-1 flex-col gap-1.5 rounded-xl border border-[#e5e8ea] bg-white px-3 py-2.5">
            <Image src={stat.iconSrc} alt="" width={20} height={20} className="size-5" />
            <div className="flex flex-col text-[#0a2c07]">
                <p className="text-lg font-bold leading-7">{stat.value}</p>
                <p className="text-xs">{stat.label}</p>
            </div>
        </div>
    );
}
