export function ListingNoticeBanner() {
    return (
        <div className="flex items-center justify-center rounded-sm border border-amber-200 bg-amber-50 px-4 py-4 text-center shadow-sm">
            <p className="text-sm text-amber-800">
                Your listing will be{" "}
                <strong className="font-bold text-amber-900">active for 60 days free</strong>. You
                will be notified before it expires.
            </p>
        </div>
    );
}
