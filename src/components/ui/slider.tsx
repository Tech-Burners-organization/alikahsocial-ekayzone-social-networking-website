"use client"

import * as React from "react"
import { Slider as SliderPrimitive } from "@base-ui/react/slider"

import { cn } from "@/lib/utils"

function Slider<Value extends number | readonly number[]>({
  className,
  ...props
}: SliderPrimitive.Root.Props<Value>) {
  return (
    <SliderPrimitive.Root data-slot="slider" className={cn("relative", className)} {...props}>
      <SliderPrimitive.Control
        data-slot="slider-control"
        className="relative flex h-6 w-full touch-none items-center"
      >
        <SliderPrimitive.Track
          data-slot="slider-track"
          className="relative h-2 w-full grow rounded-full bg-[#e4e7ec]"
        >
          <SliderPrimitive.Indicator
            data-slot="slider-indicator"
            className="absolute h-full rounded-full bg-secondary-color"
          />
          <SliderThumbs values={props.value ?? props.defaultValue} />
        </SliderPrimitive.Track>
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  )
}

function SliderThumbs({ values }: { values: number | readonly number[] | undefined }) {
  const count = Array.isArray(values) ? values.length : 1

  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <SliderPrimitive.Thumb
          key={index}
          index={index}
          data-slot="slider-thumb"
          className="block size-6 shrink-0 rounded-full border-2 border-white bg-secondary-color shadow-[0_1px_3px_rgba(0,0,0,0.25)] outline-none transition-transform focus-visible:ring-3 focus-visible:ring-ring/50"
        />
      ))}
    </>
  )
}

export { Slider }
