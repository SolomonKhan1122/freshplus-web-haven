// Google Analytics and Google Ads gtag function declarations
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

declare function gtag(...args: any[]): void;

export {};
