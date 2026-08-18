"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { FaqItem } from "../../_lib/data";

/** FAQ list where one entry is expanded at a time, matching the design's single-open state. */
export default function FaqAccordion({ items }: { items: FaqItem[] }) {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <div className="flex flex-col gap-2">
            {items.map((item, index) => {
                const isOpen = index === openIndex;

                return (
                    <div
                        key={item.question}
                        className={`flex flex-col gap-4 rounded-[20px] border border-[#e5e8ea] bg-white px-2.5 shadow-[0_1px_0.5px_rgba(0,0,0,0.03)] ${
                            isOpen ? "py-6" : "py-4"
                        }`}
                    >
                        <button
                            type="button"
                            onClick={() => setOpenIndex(isOpen ? -1 : index)}
                            aria-expanded={isOpen}
                            className="flex w-full items-start gap-3 text-left"
                        >
                            <span className="flex-1 text-base font-semibold leading-6 text-[#1b1c1c]">
                                {item.question}
                            </span>
                            {isOpen ? (
                                <ChevronUp className="size-6 shrink-0 text-[#1b1c1c]" />
                            ) : (
                                <ChevronDown className="size-6 shrink-0 text-[#1b1c1c]" />
                            )}
                        </button>

                        {isOpen && (
                            <>
                                <div className="h-px w-full bg-[#e5e8ea]" />
                                <p className="text-sm font-medium text-[#5e6062]">{item.answer}</p>
                            </>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
