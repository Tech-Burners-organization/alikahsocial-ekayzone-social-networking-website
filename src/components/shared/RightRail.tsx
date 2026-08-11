import Image from "next/image";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AllImages } from "../../../public/images/AllImages";
import { FollowButton } from "./FollowButton";

// TODO: replace with real data once the creators/trending/products endpoints exist.
const TOP_CREATORS = [
  { name: "Emma Jones", handle: "@emma0101" },
  { name: "Thandi Nkosi", handle: "@learn_with_thandi" },
  { name: "Sipho Dlamini", handle: "@sipho.d" },
];

const TRENDING_TOPICS = [
  { tag: "#SouthAfrica", count: "14.2K" },
  { tag: "#LearnOnEkayzone", count: "9.8K" },
  { tag: "#SmallBusinessSA", count: "7.4K" },
  { tag: "#GradeTwelve", count: "5.1K" },
  { tag: "#NailArt", count: "3.9K" },
];

const TRENDING_PRODUCTS = [
  { name: "Nail Art & Manicure", shop: "NailBar SA", price: "R180" },
  { name: "Braids & Styling", shop: "HairHub SA", price: "R250" },
];

export function RightRail() {
  return (
    <>
      {/* Flow placeholder — the rail itself is fixed, so this reserves its width */}
      <div className="hidden w-80 shrink-0 lg:block" aria-hidden />
      <aside className="fixed top-14 right-0 bottom-0 z-10 hidden w-80 flex-col gap-6 overflow-y-auto scrollbar-none  border-l border-slate-100 bg-white px-5 py-6 lg:flex">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search post, creators, topics"
            className="h-11 rounded-full border-none bg-input-color pl-10 text-sm"
          />
        </div>

        <section>
          <h2 className="mb-3 text-lg font-bold text-base-color">Top Creators</h2>
          <div className="flex flex-col gap-4">
            {TOP_CREATORS.map((creator) => (
              <div key={creator.handle} className="flex items-center gap-3">
                <Avatar size="lg">
                  <AvatarImage src={AllImages.profile.src} alt={creator.name} />
                  <AvatarFallback>{creator.name[0]}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-base-color">
                    {creator.name}
                  </p>
                  <p className="truncate text-xs text-lighter-color">
                    {creator.handle}
                  </p>
                </div>
                <FollowButton />
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-bold text-base-color">Trending Now</h2>
          <div className="flex flex-col">
            {TRENDING_TOPICS.map((topic, index) => (
              <div
                key={topic.tag}
                className="border-b border-slate-100 py-3 last:border-b-0"
              >
                <p className="text-xs font-medium text-lighter-color">
                  {index + 1}. Trending
                </p>
                <p className="text-[15px] font-bold text-base-color">{topic.tag}</p>
                <p className="text-xs text-lighter-color">{topic.count} videos</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-bold text-base-color">
            Trending Products
          </h2>
          <div className="flex flex-col gap-4">
            {TRENDING_PRODUCTS.map((product) => (
              <div key={product.name} className="flex items-center gap-3">
                <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                  <Image
                    src={AllImages.cover}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 80px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-base-color">
                    {product.name}
                  </p>
                  <p className="truncate text-xs text-lighter-color">
                    {product.shop}
                  </p>
                  <p className="text-sm font-bold text-secondary-color">
                    {product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </aside>
    </>
  );
}
