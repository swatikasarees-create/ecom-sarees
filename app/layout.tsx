import type { Metadata } from "next";
import { Jost, Marcellus } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "aos/dist/aos.css";
import "./swiper-custom.css";
import Script from "next/script";

const jost = Jost({
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ["latin"],
  variable: "--font-jost",
});

const marcellus = Marcellus({
  weight: '400',
  subsets: ["latin"],
  variable: "--font-marcellus",
});

export const metadata: Metadata = {
  title: "Kaira - Fashion Store",
  description: "Bootstrap 5 Fashion Store HTML CSS Template",
  keywords: "ecommerce,fashion,store",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" type="text/css" href="/css/vendor.css" />
        <link rel="stylesheet" type="text/css" href="/style.css" />
      </head>
      <body className={`${jost.variable} ${marcellus.variable} homepage`}>
        {children}
        
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" 
          integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" 
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
