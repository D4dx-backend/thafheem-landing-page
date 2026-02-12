const RAZORPAY_SCRIPT_URL = 'https://checkout.razorpay.com/v1/checkout.js';

type PaymentCurrency = 'INR';

export interface CreateDonationOrderPayload {
  amount: number;
  currency: PaymentCurrency;
  donorName?: string;
  donorEmail?: string;
  donorPhone?: string;
  campaignId?: string;
}

interface CreateDonationOrderResponse {
  orderId: string;
  amount: number;
  currency: PaymentCurrency;
  keyId: string;
}

interface VerifyPaymentPayload {
  orderId: string;
  paymentId: string;
  signature: string;
}

interface RazorpayHandlerResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayPrefill {
  name?: string;
  email?: string;
  contact?: string;
}

interface RazorpayModal {
  ondismiss?: () => void;
}

interface RazorpayTheme {
  color?: string;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: PaymentCurrency;
  order_id: string;
  name: string;
  description: string;
  handler: (response: RazorpayHandlerResponse) => void;
  prefill?: RazorpayPrefill;
  modal?: RazorpayModal;
  theme?: RazorpayTheme;
}

interface RazorpayInstance {
  open: () => void;
  on: (event: 'payment.failed', callback: () => void) => void;
}

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

let razorpayScriptPromise: Promise<void> | null = null;

const ensureApiBaseUrl = () => {
  const rawBaseUrl = import.meta.env.VITE_PAYMENT_API_BASE_URL as
    | string
    | undefined;

  if (!rawBaseUrl) {
    throw new Error('Missing VITE_PAYMENT_API_BASE_URL in environment.');
  }

  return rawBaseUrl.replace(/\/+$/, '');
};

const buildPaymentsApiPath = (path: string) => {
  const apiPrefix =
    (import.meta.env.VITE_PAYMENT_API_PREFIX as string | undefined) ??
    '/api/payments';

  const normalizedPrefix = apiPrefix.startsWith('/')
    ? apiPrefix
    : `/${apiPrefix}`;

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return `${normalizedPrefix}${normalizedPath}`;
};

const loadRazorpayScript = () => {
  if (window.Razorpay) {
    return Promise.resolve();
  }

  if (razorpayScriptPromise) {
    return razorpayScriptPromise;
  }

  razorpayScriptPromise = new Promise<void>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${RAZORPAY_SCRIPT_URL}"]`
    );

    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(), { once: true });
      existingScript.addEventListener(
        'error',
        () => reject(new Error('Failed to load Razorpay checkout script.')),
        { once: true }
      );
      return;
    }

    const script = document.createElement('script');
    script.src = RAZORPAY_SCRIPT_URL;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error('Failed to load Razorpay checkout script.'));
    document.body.appendChild(script);
  });

  return razorpayScriptPromise;
};

const parseErrorMessage = async (response: Response) => {
  try {
    const data = (await response.json()) as { error?: string };
    return data.error ?? 'Something went wrong while processing payment.';
  } catch {
    return 'Something went wrong while processing payment.';
  }
};

const createOrder = async (payload: CreateDonationOrderPayload) => {
  const baseUrl = ensureApiBaseUrl();
  const endpoint = `${baseUrl}${buildPaymentsApiPath('/create-order')}`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }

  return (await response.json()) as CreateDonationOrderResponse;
};

const verifyOrder = async (payload: VerifyPaymentPayload) => {
  const baseUrl = ensureApiBaseUrl();
  const endpoint = `${baseUrl}${buildPaymentsApiPath('/verify')}`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }

  return response.json();
};

export interface LaunchDonationCheckoutOptions {
  amount: number;
  currency?: PaymentCurrency;
  donorName?: string;
  donorEmail?: string;
  donorPhone?: string;
  campaignId?: string;
  name?: string;
  description?: string;
  onSuccess?: () => void;
  onFailure?: (message: string) => void;
}

export const launchDonationCheckout = async (
  options: LaunchDonationCheckoutOptions
) => {
  await loadRazorpayScript();

  if (!window.Razorpay) {
    throw new Error('Razorpay is not available in this browser.');
  }

  const currency = options.currency ?? 'INR';

  const order = await createOrder({
    amount: options.amount,
    currency,
    donorName: options.donorName,
    donorEmail: options.donorEmail,
    donorPhone: options.donorPhone,
    campaignId: options.campaignId,
  });

  const checkout = new window.Razorpay({
    key: order.keyId,
    amount: order.amount,
    currency: order.currency,
    order_id: order.orderId,
    name: options.name ?? 'Thafheemul Quran',
    description: options.description ?? 'Donation',
    prefill: {
      name: options.donorName,
      email: options.donorEmail,
      contact: options.donorPhone,
    },
    handler: async (response) => {
      try {
        await verifyOrder({
          orderId: response.razorpay_order_id,
          paymentId: response.razorpay_payment_id,
          signature: response.razorpay_signature,
        });
        options.onSuccess?.();
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Payment verification failed.';
        options.onFailure?.(message);
      }
    },
    modal: {
      ondismiss: () => {
        options.onFailure?.('Payment popup closed before completion.');
      },
    },
    theme: {
      color: '#0d9ba8',
    },
  });

  checkout.on('payment.failed', () => {
    options.onFailure?.('Payment failed. Please try again.');
  });

  checkout.open();
};
