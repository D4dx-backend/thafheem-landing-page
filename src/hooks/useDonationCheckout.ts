import { useCallback, useState } from 'react';
import { launchDonationCheckout } from '@/services/donationCheckout';

const DONATION_CAMPAIGN_ID =
  (import.meta.env.VITE_DONATION_CAMPAIGN_ID as string | undefined) ??
  'general-support';

export interface DonorInfo {
  name: string;
  email: string;
  phone: string;
}

export const useDonationCheckout = () => {
  const [isLaunchingCheckout, setIsLaunchingCheckout] = useState(false);

  const startDonation = useCallback(
    async (amountInRupees: number, donor: DonorInfo) => {
      if (isLaunchingCheckout) {
        return;
      }

      if (amountInRupees < 1) {
        window.alert('Minimum donation amount is ₹1.');
        return;
      }

      try {
        setIsLaunchingCheckout(true);
        await launchDonationCheckout({
          amount: amountInRupees,
          donorName: donor.name || undefined,
          donorEmail: donor.email || undefined,
          donorPhone: donor.phone || undefined,
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
          error instanceof Error
            ? error.message
            : 'Unable to start payment flow.';
        window.alert(message);
      } finally {
        setIsLaunchingCheckout(false);
      }
    },
    [isLaunchingCheckout]
  );

  return { isLaunchingCheckout, startDonation };
};
