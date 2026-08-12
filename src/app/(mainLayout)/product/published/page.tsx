"use client";

import PageWraper from "@/components/ui/CustomUi/PageWraper";
import Container from "@/components/ui/CustomUi/Container";
import { Button } from "@/components/ui/button";
import {
    CheckCircle2,
    Package,
    ExternalLink,
    Eye,
    Heart,
    MessageCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProductPublishedPage() {
    const router = useRouter();

    return (
        <PageWraper title="Product Published">
            <Container className="flex flex-col gap-6">
                <div className="flex flex-col items-center gap-5 text-center py-8">
                    <div className="p-8 rounded-full bg-emerald-100/60">
                        <CheckCircle2 className="size-[44px] text-emerald-500" />
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold text-[#0a2c07]">
                            Product Launched!
                        </h1>
                        <p className="text-base text-base-color/60 max-w-xs mx-auto">
                            Your product is now live and reaching people.
                        </p>
                    </div>
                </div>

                {/* Product preview */}
                <div className="rounded-lg border border-base-color/30 bg-white p-6 flex items-center gap-4">
                    <div className="size-20 rounded-lg bg-base-color/10 flex items-center justify-center">
                        <Package className="size-8 text-base-color/40" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-[#1b1c1c]">Your Product</h3>
                        <p className="text-sm text-base-color/60">Active for 60 days free</p>
                        <div className="flex gap-4 mt-2">
                            <span className="flex items-center gap-1 text-xs text-base-color/60">
                                <Eye className="size-3" /> 0 views
                            </span>
                            <span className="flex items-center gap-1 text-xs text-base-color/60">
                                <Heart className="size-3" /> 0 likes
                            </span>
                            <span className="flex items-center gap-1 text-xs text-base-color/60">
                                <MessageCircle className="size-3" /> 0 comments
                            </span>
                        </div>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full"
                    >
                        <ExternalLink className="size-4 mr-2" />
                        View
                    </Button>
                </div>

                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        className="flex-1 rounded-full font-semibold"
                        onClick={() => router.push("/create-product")}
                    >
                        Edit Product
                    </Button>
                    <Button
                        className="flex-1 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold"
                        onClick={() => router.push("/")}
                    >
                        Back to Home
                    </Button>
                </div>
            </Container>
        </PageWraper>
    );
}
