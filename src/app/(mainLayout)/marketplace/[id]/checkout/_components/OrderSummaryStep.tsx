'use client';

import Image from 'next/image';
import { ChevronLeft, Minus, Plus } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import type { ProductDetail } from '../../_lib/data';
import type { DeliveryDetailsFormValues } from '@/schemas/checkout';
import type { PaymentMethod } from '../_lib/types';

const PAYMENT_OPTIONS: { value: PaymentMethod; label: string; description: string }[] = [
    { value: 'payfast', label: 'PayFast', description: 'Pay by Card- Secure checkout' },
    { value: 'cod', label: 'Cash on Delivery', description: 'Pay when your order arrives' },
];

interface OrderSummaryStepProps {
    product: ProductDetail;
    quantity: number;
    onQuantityChange: (quantity: number) => void;
    delivery: DeliveryDetailsFormValues;
    paymentMethod: PaymentMethod;
    onPaymentMethodChange: (method: PaymentMethod) => void;
    onBack: () => void;
    onPlaceOrder: () => void;
}

export default function OrderSummaryStep({
    product,
    quantity,
    onQuantityChange,
    delivery,
    paymentMethod,
    onPaymentMethodChange,
    onBack,
    onPlaceOrder,
}: OrderSummaryStepProps) {
    const total = product.price * quantity;

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
                <button
                    type="button"
                    onClick={onBack}
                    aria-label="Go back"
                    className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary-color text-white transition-colors hover:bg-secondary-color/90"
                >
                    <ChevronLeft className="size-5" />
                </button>
                <h1 className="text-2xl font-bold text-foreground">Order Summary</h1>
            </div>

            <div className="flex items-start gap-2.5 rounded-xl border border-border bg-card p-2.5">
                <div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                    <Image src={product.image} alt={product.title} fill sizes="80px" className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col gap-3.5">
                    <p className="text-lg font-bold text-foreground">{product.title}</p>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                            <button
                                type="button"
                                onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
                                aria-label="Decrease quantity"
                                disabled={quantity <= 1}
                                className="flex size-6.5 items-center justify-center rounded-full border border-border bg-muted text-foreground disabled:opacity-40"
                            >
                                <Minus className="size-3.5" />
                            </button>
                            <span className="min-w-4 text-center text-base font-bold text-foreground">{quantity}</span>
                            <button
                                type="button"
                                onClick={() => onQuantityChange(quantity + 1)}
                                aria-label="Increase quantity"
                                className="flex size-6.5 items-center justify-center rounded-full bg-secondary-color text-white"
                            >
                                <Plus className="size-3.5" />
                            </button>
                        </div>
                        <p className="text-lg font-bold text-secondary-color">
                            {product.currency}
                            {total.toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <h2 className="text-lg font-bold text-foreground">Delivering to</h2>
                <div className="rounded-xl border border-border bg-card p-2.5">
                    <p className="text-base font-bold text-foreground">{delivery.fullName}</p>
                    <div className="mt-1 flex flex-col gap-0.5 text-sm font-medium text-muted-foreground">
                        <p>{delivery.phone}</p>
                        <p>
                            {delivery.streetAddress1}
                            {delivery.streetAddress2 ? `, ${delivery.streetAddress2}` : ''}
                        </p>
                        <p>
                            {delivery.city}, {delivery.province} {delivery.postalCode}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <h2 className="text-lg font-bold text-foreground">Payment Method</h2>
                <RadioGroup
                    value={paymentMethod}
                    onValueChange={(next) => onPaymentMethodChange(next as PaymentMethod)}
                    className="gap-1.5"
                >
                    {PAYMENT_OPTIONS.map((option) => (
                        <label
                            key={option.value}
                            className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-border bg-card px-3 py-4"
                        >
                            <RadioGroupItem value={option.value} />
                            <span className="flex flex-col">
                                <span className="text-base font-bold text-foreground">{option.label}</span>
                                <span className="text-sm font-medium text-muted-foreground">{option.description}</span>
                            </span>
                        </label>
                    ))}
                </RadioGroup>
            </div>

            <div className="rounded-xl border border-border bg-card p-2.5">
                <div className="flex items-center justify-between border-b border-border px-1.5 py-2.5">
                    <span className="text-sm font-medium text-foreground">Subtotal</span>
                    <span className="text-base font-bold text-secondary-color">
                        {product.currency}
                        {total.toLocaleString()}
                    </span>
                </div>
                <div className="flex items-center justify-between px-1.5 py-2.5">
                    <span className="text-base font-bold text-foreground">Total</span>
                    <span className="text-lg font-bold text-secondary-color">
                        {product.currency}
                        {total.toLocaleString()}
                    </span>
                </div>
            </div>

            <button
                type="button"
                onClick={onPlaceOrder}
                className="h-14 w-full rounded-full border-2 border-secondary-color bg-secondary-color text-xl font-bold text-white shadow-[inset_0_3px_3px_rgba(255,255,255,0.12)] transition-colors hover:bg-secondary-color/90"
            >
                Continue
            </button>
        </div>
    );
}
