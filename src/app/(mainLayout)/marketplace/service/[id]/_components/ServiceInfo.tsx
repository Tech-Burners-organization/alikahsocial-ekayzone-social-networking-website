import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ServiceDetail } from "../_lib/data";

export default function ServiceInfo({ service }: { service: ServiceDetail }) {
    return (
        <div className="flex flex-col gap-2">
            {service.badge && (
                <span className="w-fit rounded-sm border border-border bg-muted px-3 py-1 text-sm font-extrabold text-foreground">
                    {service.badge}
                </span>
            )}

            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">{service.title}</h1>

            <div className="flex items-center gap-1">
                {Array.from({ length: 5 }, (_, index) => (
                    <Star
                        key={index}
                        className={cn(
                            "size-5",
                            index < Math.round(service.rating)
                                ? "fill-amber-400 text-amber-400"
                                : "fill-muted text-muted"
                        )}
                    />
                ))}
                <span className="ml-1 text-base font-semibold text-foreground">{service.rating}</span>
                <span className="text-base text-muted-foreground">({service.reviewCount})</span>
            </div>

            <p className="text-2xl font-bold text-secondary-color">
                From {service.currency}
                {service.priceFrom}
            </p>
        </div>
    );
}
