export default function ProductDescription({
    description,
    specs,
}: {
    description: string;
    specs: string[];
}) {
    return (
        <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold text-foreground">Product Details</h2>
            <p className="text-base leading-relaxed text-foreground/90">{description}</p>
            <p className="mt-1 text-base font-semibold text-foreground">Key Specifications</p>
            <ul className="list-disc space-y-1 pl-5 text-base leading-relaxed text-foreground/90">
                {specs.map((spec) => (
                    <li key={spec}>{spec}</li>
                ))}
            </ul>
        </div>
    );
}
