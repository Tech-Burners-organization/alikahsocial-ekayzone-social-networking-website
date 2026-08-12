import Image from "next/image";
import Link from "next/link";
import { EXPLORE_CATEGORIES } from "../_lib/data";

export default function CategoryGrid() {
    return (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {EXPLORE_CATEGORIES.map((category) => (
                <Link
                    key={category.id}
                    href={`/explore/category/${category.id}`}
                    className="flex flex-col items-start gap-2 rounded-[20px] border px-2.5 py-5 shadow-sm transition-transform hover:-translate-y-0.5"
                    style={{ backgroundColor: category.bg, borderColor: category.border }}
                >
                    <Image src={category.iconSrc} alt="" width={30} height={30} />
                    <div className="flex flex-col gap-1 text-[#0a2c07]">
                        <p className="text-base font-bold">{category.label}</p>
                        <p className="text-sm">{category.videoCount} Videos</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}
