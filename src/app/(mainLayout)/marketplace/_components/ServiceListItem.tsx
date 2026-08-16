import Image from "next/image";
import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import type { Service } from "../_lib/services";

export default function ServiceListItem({ service }: { service: Service }) {
    return (
        <Link
            href={`/marketplace/service/${service.id}`}
            className="flex items-center gap-1.5 rounded-xl border border-border bg-white p-2.5 shadow-[0px_1px_0.5px_rgba(0,0,0,0.03),0px_3px_1.5px_rgba(0,0,0,0.03)] transition-shadow hover:shadow-md"
        >
            <div className="relative h-27.25 w-28.25 shrink-0 overflow-hidden rounded-lg bg-muted">
                <Image src={service.image} alt={service.title} fill sizes="113px" className="object-cover" />
            </div>
            <div className="flex flex-1 flex-col gap-1 py-0.5">
                <div className="flex flex-col">
                    <p className="text-lg font-bold text-foreground">{service.title}</p>
                    <p className="text-sm text-muted-foreground">{service.seller}</p>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3.5">
                        <div className="flex items-center gap-1">
                            <Star className="size-4 fill-amber-400 text-amber-400" />
                            <span className="text-sm font-semibold text-foreground">{service.rating}</span>
                            <span className="text-sm text-muted-foreground">({service.reviewCount})</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <MapPin className="size-4 text-muted-foreground" />
                            <span className="text-sm font-semibold text-foreground">{service.location}</span>
                        </div>
                    </div>
                    <p className="text-lg font-bold text-secondary-color">
                        From {service.currency}
                        {service.priceFrom}
                    </p>
                </div>
            </div>
        </Link>
    );
}
