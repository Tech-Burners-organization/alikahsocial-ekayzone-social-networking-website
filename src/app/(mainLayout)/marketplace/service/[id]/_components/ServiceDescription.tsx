export default function ServiceDescription({ description }: { description: string }) {
    return (
        <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold text-foreground">About This Service</h2>
            <p className="text-base leading-relaxed text-foreground/90">{description}</p>
        </div>
    );
}
