import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Poppins, Tajawal } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700", "800", "900"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
});

const siteUrl = "https://gimmycook.chameleon.vision";
const siteTitle = "مطعم جيمي كوك | GIMMY COOK — إيطالي وشرقي بمود مختلف • دليفري 24 ساعة";
const siteDescription =
  "مطعم جيمي كوك (GIMMY COOK) في القاهرة الجديدة — أكل إيطالي وشرقي بمود مختلف: بيتزا، فطير شرقي وحادق، مكرونة، طواجن فرن، وجبات، ومشويات بدليفري 24 ساعة (01020305074).";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "GIMMY COOK",
  title: {
    default: siteTitle,
    template: "%s | مطعم جيمي كوك — GIMMY COOK",
  },
  description: siteDescription,
  keywords: [
    "جيمي كوك",
    "مطعم جيمي كوك",
    "GIMMY COOK",
    "GIMMYCOOK",
    "بيتزا القاهرة الجديدة",
    "فطير شرقي التجمع",
    "دليفري 24 ساعة القاهرة الجديدة",
    "منيو جيمي كوك",
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.ico?v=1", sizes: "64x64", type: "image/png" },
      { url: "/icon-192.png?v=1", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png?v=1", sizes: "512x512", type: "image/png" },
    ],
    shortcut: ["/icon-192.png?v=1"],
    apple: [{ url: "/apple-icon?v=1", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: siteUrl,
    siteName: "مطعم جيمي كوك | GIMMY COOK",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: "/og-image.jpg?v=1",
        width: 1200,
        height: 630,
        alt: "مطعم جيمي كوك | GIMMY COOK — GOOD FOOD • GOOD MOOD",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/og-image.jpg?v=1"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "GIMMY COOK",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B2D5C",
};

const pwaInitScript = `
(function() {
  if (typeof window === "undefined") return;
  window.addEventListener("error", function(e) {
    if (e && e.filename && e.filename.indexOf("chrome-extension://") === 0) {
      e.stopImmediatePropagation();
    }
  }, true);
  window.addEventListener("unhandledrejection", function(e) {
    var stack = e && e.reason && e.reason.stack ? String(e.reason.stack) : "";
    if (stack.indexOf("chrome-extension://") !== -1) {
      e.stopImmediatePropagation();
      e.preventDefault();
    }
  }, true);
  window.addEventListener("beforeinstallprompt", function(e) {
    e.preventDefault();
    window.__pwaInstallPrompt = e;
    window.dispatchEvent(new Event("pwa-install-available"));
  });
  window.addEventListener("appinstalled", function() {
    window.__pwaInstallPrompt = null;
    window.dispatchEvent(new Event("pwa-app-installed"));
  });
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker.register("/sw.js", { scope: "/", updateViaCache: "none" }).then(function(reg) { reg.update(); }).catch(function() {});
    });
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${tajawal.variable} ${poppins.variable}`}
    >
      <head>
        <Script id="pwa-init" strategy="beforeInteractive">
          {pwaInitScript}
        </Script>
      </head>
      <body className="min-h-dvh flex flex-col bg-[#FFF5E8] text-[#071D3B] antialiased selection:bg-[#FF6A00] selection:text-white">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
