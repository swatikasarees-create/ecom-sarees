import nodemailer from 'nodemailer';

export interface OrderItemEmailData {
  id: string;
  name: string;
  unitPrice: number;
  qty: number;
  lineTotal: number;
  image?: string | null;
}

export interface CustomerEmailData {
  name: string;
  phone: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  stateName: string;
  pincode: string;
  notes?: string;
}

export interface SendOrderEmailsParams {
  orderId: string;
  customer: CustomerEmailData;
  items: OrderItemEmailData[];
  amount: number;
  paymentMode: 'COD' | 'RAZORPAY';
  status: 'PLACED' | 'PAID';
  paymentId?: string | null;
}

/**
 * Creates and caches a Nodemailer SMTP transporter.
 */
function getTransporter() {
  const host = process.env.SMTP_HOST?.trim() || 'smtppro.zoho.in';
  const port = Number(process.env.SMTP_PORT?.trim() || 465);
  const user = process.env.SMTP_AUTH_USER?.trim() || process.env.SMTP_USER?.trim() || 'superadmin.swatika@swatikasarees.com';
  const pass = process.env.SMTP_PASSWORD?.trim() || 'UxLU42174WMB';
  const secure = process.env.SMTP_SECURE !== 'false'; // default true for 465 SSL

  if (!user || !pass) {
    console.warn('[email] SMTP credentials (SMTP_USER / SMTP_PASSWORD) not configured. Emails will not be sent.');
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
}

/**
 * Formats an Indian currency number nicely (e.g. ₹2,999.00)
 */
function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}

/**
 * Generates the responsive HTML order confirmation template for the customer.
 */
function renderCustomerOrderEmail(data: SendOrderEmailsParams): string {
  const { orderId, customer, items, amount, paymentMode, status } = data;
  const isPaid = status === 'PAID' || paymentMode === 'RAZORPAY';
  const paymentBadge = isPaid
    ? '<span style="display:inline-block;padding:4px 10px;background:#e8f5e9;color:#2e7d32;border:1px solid #c8e6c9;border-radius:4px;font-size:12px;font-weight:700;">PAID ONLINE (Razorpay)</span>'
    : '<span style="display:inline-block;padding:4px 10px;background:#fff8e1;color:#b78103;border:1px solid #ffe082;border-radius:4px;font-size:12px;font-weight:700;">CASH ON DELIVERY</span>';

  const orderDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const fullAddress = [
    customer.addressLine1,
    customer.addressLine2,
    `${customer.city}, ${customer.stateName} - ${customer.pincode}`,
  ]
    .filter(Boolean)
    .join('<br/>');

  const itemsRows = items
    .map((item) => {
      const imgCell = item.image
        ? `<img src="${item.image}" alt="${item.name}" width="60" height="75" style="border-radius:6px;object-fit:cover;display:block;border:1px solid #eeeeee;" />`
        : '<div style="width:60px;height:75px;background:#f5f5f5;border-radius:6px;border:1px solid #eeeeee;"></div>';

      return `
        <tr>
          <td style="padding:12px 8px;border-bottom:1px solid #f0f0f0;vertical-align:middle;width:70px;">
            ${imgCell}
          </td>
          <td style="padding:12px 8px;border-bottom:1px solid #f0f0f0;vertical-align:middle;">
            <div style="font-weight:600;color:#222;font-size:14px;line-height:1.4;">${item.name}</div>
            <div style="color:#777;font-size:12px;margin-top:2px;">Qty: ${item.qty} × ${formatCurrency(item.unitPrice)}</div>
          </td>
          <td style="padding:12px 8px;border-bottom:1px solid #f0f0f0;vertical-align:middle;text-align:right;font-weight:700;color:#222;font-size:14px;">
            ${formatCurrency(item.lineTotal)}
          </td>
        </tr>
      `;
    })
    .join('');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Order Confirmation - Swatika Sarees</title>
</head>
<body style="margin:0;padding:0;background-color:#f7f7f7;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#333333;line-height:1.5;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#f7f7f7;padding:24px 12px;">
    <tr>
      <td align="center">
        <!-- Main Container -->
        <table role="presentation" width="100%" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.06);" cellspacing="0" cellpadding="0">
          
          <!-- Header Banner -->
          <tr>
            <td style="background:linear-gradient(135deg, #1c1b1f 0%, #2e2b33 100%);padding:28px 24px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:24px;letter-spacing:2px;font-weight:700;text-transform:uppercase;">
                SWATIKA SAREES
              </h1>
              <p style="margin:6px 0 0;color:#e0e0e0;font-size:13px;letter-spacing:1px;text-transform:uppercase;">
                Handcrafted Luxury & Timeless Elegance
              </p>
            </td>
          </tr>

          <!-- Thank You Message -->
          <tr>
            <td style="padding:32px 28px 20px;">
              <div style="font-size:20px;font-weight:700;color:#1c1b1f;margin-bottom:8px;">
                Thank you for your order, ${customer.name}!
              </div>
              <p style="margin:0;color:#555;font-size:14px;line-height:1.6;">
                We have received your order and our team is preparing it with care. You can find all the details of your purchase below.
              </p>
            </td>
          </tr>

          <!-- Order Summary Card -->
          <tr>
            <td style="padding:0 28px 24px;">
              <table role="presentation" width="100%" style="background:#fafafa;border-radius:8px;padding:16px;border:1px solid #eeeeee;" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding:4px 0;font-size:13px;color:#666;"><strong>Order ID:</strong></td>
                  <td style="padding:4px 0;font-size:13px;color:#1c1b1f;text-align:right;font-family:monospace;font-weight:700;">${orderId}</td>
                </tr>
                <tr>
                  <td style="padding:4px 0;font-size:13px;color:#666;"><strong>Order Date:</strong></td>
                  <td style="padding:4px 0;font-size:13px;color:#1c1b1f;text-align:right;">${orderDate}</td>
                </tr>
                <tr>
                  <td style="padding:4px 0;font-size:13px;color:#666;"><strong>Payment Method:</strong></td>
                  <td style="padding:4px 0;text-align:right;">${paymentBadge}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Items Table -->
          <tr>
            <td style="padding:0 28px 20px;">
              <div style="font-size:16px;font-weight:700;color:#1c1b1f;margin-bottom:12px;border-bottom:2px solid #1c1b1f;padding-bottom:6px;">
                Ordered Items
              </div>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                ${itemsRows}
              </table>
            </td>
          </tr>

          <!-- Total Calculation -->
          <tr>
            <td style="padding:0 28px 24px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-top:1px solid #e0e0e0;padding-top:12px;">
                <tr>
                  <td style="padding:4px 0;font-size:13px;color:#666;">Subtotal</td>
                  <td style="padding:4px 0;font-size:13px;color:#222;text-align:right;font-weight:600;">${formatCurrency(amount)}</td>
                </tr>
                <tr>
                  <td style="padding:4px 0;font-size:13px;color:#666;">Shipping Charges</td>
                  <td style="padding:4px 0;font-size:13px;color:#2e7d32;text-align:right;font-weight:700;">FREE</td>
                </tr>
                <tr>
                  <td style="padding:8px 0 0;font-size:16px;font-weight:700;color:#1c1b1f;">Total Amount</td>
                  <td style="padding:8px 0 0;font-size:18px;font-weight:800;color:#dc747d;text-align:right;">${formatCurrency(amount)}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Shipping Address -->
          <tr>
            <td style="padding:0 28px 28px;">
              <div style="font-size:16px;font-weight:700;color:#1c1b1f;margin-bottom:10px;border-bottom:2px solid #1c1b1f;padding-bottom:6px;">
                Delivery Details
              </div>
              <div style="background:#fafafa;border:1px solid #eeeeee;border-radius:8px;padding:14px;font-size:13px;color:#444;line-height:1.6;">
                <strong>${customer.name}</strong><br/>
                ${fullAddress}<br/>
                <strong>Phone:</strong> ${customer.phone}<br/>
                <strong>Email:</strong> ${customer.email}
                ${customer.notes ? `<div style="margin-top:6px;padding-top:6px;border-top:1px dashed #ddd;color:#666;"><strong>Note:</strong> ${customer.notes}</div>` : ''}
              </div>
            </td>
          </tr>

          <!-- Footer / Support -->
          <tr>
            <td style="background:#f4f4f4;padding:22px 24px;text-align:center;border-top:1px solid #eeeeee;">
              <p style="margin:0 0 6px;font-size:13px;color:#555;font-weight:600;">
                Questions about your order? We are here to help!
              </p>
              <p style="margin:0;font-size:12px;color:#777;">
                Email us at <a href="mailto:swatikasarees@gmail.com" style="color:#dc747d;text-decoration:none;font-weight:600;">swatikasarees@gmail.com</a>
                or visit <a href="https://swatikasarees.com" style="color:#dc747d;text-decoration:none;font-weight:600;">swatikasarees.com</a>
              </p>
              <p style="margin:12px 0 0;font-size:11px;color:#999;">
                © ${new Date().getFullYear()} Swatika Sarees. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

/**
 * Generates the admin alert email template when a new order is received.
 */
function renderAdminOrderAlertEmail(data: SendOrderEmailsParams): string {
  const { orderId, customer, items, amount, paymentMode, status, paymentId } = data;
  const isPaid = status === 'PAID' || paymentMode === 'RAZORPAY';
  const paymentBadge = isPaid
    ? '<span style="display:inline-block;padding:4px 10px;background:#e8f5e9;color:#2e7d32;border:1px solid #c8e6c9;border-radius:4px;font-size:12px;font-weight:700;">PAID ONLINE (Razorpay)</span>'
    : '<span style="display:inline-block;padding:4px 10px;background:#fff8e1;color:#b78103;border:1px solid #ffe082;border-radius:4px;font-size:12px;font-weight:700;">CASH ON DELIVERY</span>';

  const itemsList = items
    .map(
      (item) => `
        <li style="margin-bottom:8px;">
          <strong>${item.name}</strong> × ${item.qty} — ${formatCurrency(item.lineTotal)} (Unit: ${formatCurrency(item.unitPrice)})
          ${item.image ? `<br/><img src="${item.image}" width="50" height="60" style="object-fit:cover;border-radius:4px;margin-top:4px;border:1px solid #ddd;" />` : ''}
        </li>
      `
    )
    .join('');

  const fullAddress = [
    customer.addressLine1,
    customer.addressLine2,
    `${customer.city}, ${customer.stateName} - ${customer.pincode}`,
  ]
    .filter(Boolean)
    .join(', ');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Order Alert - Swatika Sarees</title>
</head>
<body style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;background:#f7f7f7;padding:20px;color:#333;">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:8px;padding:24px;border:1px solid #e0e0e0;">
    <h2 style="color:#1c1b1f;margin-top:0;border-bottom:2px solid #dc747d;padding-bottom:8px;">
      🛍️ New Order Received: ${orderId}
    </h2>

    <div style="background:#f9f9f9;padding:12px 16px;border-radius:6px;margin-bottom:18px;">
      <p style="margin:4px 0;"><strong>Total Bill Amount:</strong> <span style="font-size:18px;color:#dc747d;font-weight:700;">${formatCurrency(amount)}</span></p>
      <p style="margin:4px 0;"><strong>Payment Status:</strong> ${paymentBadge}</p>
      ${paymentId ? `<p style="margin:4px 0;font-size:12px;color:#666;"><strong>Razorpay Payment ID:</strong> <code>${paymentId}</code></p>` : ''}
    </div>

    <h3 style="color:#1c1b1f;margin-bottom:8px;">👤 Customer Details</h3>
    <ul style="line-height:1.6;margin-top:4px;">
      <li><strong>Name:</strong> ${customer.name}</li>
      <li><strong>Phone:</strong> <a href="tel:${customer.phone}" style="color:#1c1b1f;font-weight:600;">${customer.phone}</a></li>
      <li><strong>Email:</strong> <a href="mailto:${customer.email}">${customer.email}</a></li>
      <li><strong>Shipping Address:</strong> ${fullAddress}</li>
      ${customer.notes ? `<li><strong>Customer Notes:</strong> ${customer.notes}</li>` : ''}
    </ul>

    <h3 style="color:#1c1b1f;margin-bottom:8px;">📦 Order Items</h3>
    <ul style="line-height:1.6;margin-top:4px;">
      ${itemsList}
    </ul>

    <div style="margin-top:24px;padding-top:16px;border-top:1px solid #eee;font-size:12px;color:#777;text-align:center;">
      View full order details in your <a href="https://swatikasarees.com/admin/orders" style="color:#dc747d;font-weight:600;">Admin Orders Portal</a>.
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Sends both the customer order confirmation and the admin notification email.
 * This runs safely and logs errors without throwing so order creation never breaks.
 */
export async function sendOrderNotificationEmails(data: SendOrderEmailsParams): Promise<{
  customerEmailSent: boolean;
  adminEmailSent: boolean;
}> {
  const transporter = getTransporter();
  if (!transporter) {
    return { customerEmailSent: false, adminEmailSent: false };
  }

  const senderEmail = process.env.SMTP_FROM_EMAIL?.trim() || 'orderandbilling@swatikasarees.com';
  const senderName = process.env.SMTP_FROM_NAME?.trim() || 'Swatika Sarees';
  const fromHeader = `"${senderName}" <${senderEmail}>`;

  const adminRecipient = process.env.ADMIN_NOTIFICATION_EMAIL?.trim() || 'superadmin.swatika@swatikasarees.com';

  let customerEmailSent = false;
  let adminEmailSent = false;

  // 1. Send confirmation to the customer
  try {
    if (data.customer.email?.trim()) {
      await transporter.sendMail({
        from: fromHeader,
        to: data.customer.email.trim(),
        replyTo: senderEmail,
        subject: `Your Swatika Sarees Order Confirmation - ${data.orderId}`,
        html: renderCustomerOrderEmail(data),
      });
      customerEmailSent = true;
      console.log(`[email] Order confirmation sent to customer: ${data.customer.email.trim()} for ${data.orderId}`);
    }
  } catch (err) {
    console.error(`[email] Failed to send order confirmation to customer (${data.customer.email}):`, err);
  }

  // 2. Send alert to store admin
  try {
    if (adminRecipient) {
      await transporter.sendMail({
        from: fromHeader,
        to: adminRecipient,
        replyTo: data.customer.email?.trim() || undefined,
        subject: `🔔 New Order Received: ${data.orderId} from ${data.customer.name} (${formatCurrency(data.amount)})`,
        html: renderAdminOrderAlertEmail(data),
      });
      adminEmailSent = true;
      console.log(`[email] Admin order alert sent to ${adminRecipient} for ${data.orderId}`);
    }
  } catch (err) {
    console.error(`[email] Failed to send admin order alert to ${adminRecipient}:`, err);
  }

  return { customerEmailSent, adminEmailSent };
}
