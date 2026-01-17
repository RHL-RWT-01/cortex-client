"use client";

import api from '@/lib/api';
import { CheckoutResponse, Subscription, UsageLimits } from '@/lib/types';
import { useCallback, useEffect, useState } from 'react';

interface UseSubscriptionResult {
    subscription: Subscription | null;
    usage: UsageLimits | null;
    loading: boolean;
    error: string | null;
    isPro: boolean;
    canSubmitTask: boolean;
    canSubmitDrill: boolean;
    createCheckout: (discountCode?: string) => Promise<string | null>;
    refreshUsage: () => Promise<void>;
}

export function useSubscription(): UseSubscriptionResult {
    const [subscription, setSubscription] = useState<Subscription | null>(null);
    const [usage, setUsage] = useState<UsageLimits | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchSubscription = useCallback(async () => {
        try {
            const response = await api.get('/subscriptions/me');
            setSubscription(response.data);
        } catch (err) {
            console.error('Failed to fetch subscription:', err);
        }
    }, []);

    const fetchUsage = useCallback(async () => {
        try {
            const response = await api.get('/subscriptions/usage');
            setUsage(response.data);
        } catch (err) {
            console.error('Failed to fetch usage:', err);
        }
    }, []);

    const refreshUsage = useCallback(async () => {
        await fetchUsage();
    }, [fetchUsage]);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            setError(null);
            try {
                await Promise.all([fetchSubscription(), fetchUsage()]);
            } catch (err) {
                setError('Failed to load subscription data');
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [fetchSubscription, fetchUsage]);

    const createCheckout = useCallback(async (discountCode?: string): Promise<string | null> => {
        try {
            const response = await api.post<CheckoutResponse>('/subscriptions/checkout', {
                discount_code: discountCode || null,
                success_url: `${window.location.origin}/dashboard?upgraded=true`,
                cancel_url: `${window.location.origin}/pricing?cancelled=true`
            });

            // Redirect to checkout
            const checkoutUrl = response.data.payment_link || response.data.checkout_url;
            if (checkoutUrl) {
                window.location.href = checkoutUrl;
                return checkoutUrl;
            }
            return null;
        } catch (err: any) {
            console.error('Failed to create checkout:', err);
            setError(err.response?.data?.detail || 'Failed to create checkout session');
            return null;
        }
    }, []);

    const isPro = subscription?.plan === 'pro' && subscription?.status === 'active';
    const canSubmitTask = usage?.can_submit_task ?? true;
    const canSubmitDrill = usage?.can_submit_drill ?? true;

    return {
        subscription,
        usage,
        loading,
        error,
        isPro,
        canSubmitTask,
        canSubmitDrill,
        createCheckout,
        refreshUsage
    };
}
