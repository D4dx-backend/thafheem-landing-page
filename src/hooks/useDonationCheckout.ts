import { useCallback, useState } from 'react';
import { launchDonationCheckout } from '@/services/donationCheckout';

const DONATION_CAMPAIGN_ID =
  (import.meta.env.VITE_DONATION_CAMPAIGN_ID as string | undefined) ??
  'general-support';

export const useDonationCheckout = () => {
  const [isLaunchingCheckout, setIsLaunchingCheckout] = useState(false);

  const startDonation = useCallback(async (amountInRupees: number) => {
    if (isLaunchingCheckout) {
      return;
    }

    const amountInPaise = Math.round(amountInRupees * 100);

    if (amountInPaise < 100) {
      window.alert('Minimum donation amount is ₹1.');
      return;
    }

    try {
      setIsLaunchingCheckout(true);
      await launchDonationCheckout({
        amount: amountInPaise,
        donorName: 'Supporter',
        campaignId: DONATION_CAMPAIGN_ID,
        name: 'Thafheemul Quran',
        description: 'Support Quran learning mission',
        onSuccess: () => {
          window.alert(
            'Payment is being verified. Final confirmation will arrive once webhook is processed.'
          );
        },
        onFailure: (message) => {
          window.alert(message);
        },
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Unable to start payment flow.';
      window.alert(message);
    } finally {
      setIsLaunchingCheckout(false);
    }
  }, [isLaunchingCheckout]);

  return { isLaunchingCheckout, startDonation };
};
