'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DeliveryForm from './DeliveryForm';
import OrderSummaryStep from './OrderSummaryStep';
import OrderPlacedDialog from './OrderPlacedDialog';
import type { DeliveryDetailsFormValues } from '@/schemas/checkout';
import type { PaymentMethod } from '../_lib/types';
import type { ProductDetail } from '../../_lib/data';
import Container from '@/components/ui/CustomUi/Container';

type Step = 'delivery' | 'summary';

const EMPTY_DELIVERY: DeliveryDetailsFormValues = {
    fullName: '',
    phone: '',
    streetAddress1: '',
    streetAddress2: '',
    city: '',
    province: '',
    postalCode: '',
    note: '',
};

export default function CheckoutFlow({ product }: { product: ProductDetail }) {
    const router = useRouter();
    const [step, setStep] = useState<Step>('delivery');
    const [delivery, setDelivery] = useState<DeliveryDetailsFormValues>(EMPTY_DELIVERY);
    const [quantity, setQuantity] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('payfast');
    const [orderPlaced, setOrderPlaced] = useState(false);

    return (
        <div>
            <Container>
                <div className="flex flex-col gap-6 py-6">
                    {step === 'delivery' ? (
                        <DeliveryForm
                            defaultValues={delivery}
                            onBack={() => router.push(`/marketplace/${product.id}`)}
                            onContinue={(values) => {
                                setDelivery(values);
                                setStep('summary');
                            }}
                        />
                    ) : (
                        <OrderSummaryStep
                            product={product}
                            quantity={quantity}
                            onQuantityChange={setQuantity}
                            delivery={delivery}
                            paymentMethod={paymentMethod}
                            onPaymentMethodChange={setPaymentMethod}
                            onBack={() => setStep('delivery')}
                            onPlaceOrder={() => setOrderPlaced(true)}
                        />
                    )}
                </div>
            </Container>

            <OrderPlacedDialog
                open={orderPlaced}
                onOpenChange={(open) => {
                    setOrderPlaced(open);
                    if (!open) router.push(`/marketplace/${product.id}`);
                }}
            />
        </div>
    );
}
