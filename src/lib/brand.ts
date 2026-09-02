// Shared DiziGroww brand/letterhead defaults — used by Invoices, Offer
// Letters and Internship Letters so there's one place to update if the
// company details ever change.
export const BRAND = {
  name: "DiziGroww",
  email: "info@dizigroww.in",
  phone: "+91 94500 10826",
  address: "Plot 19, KP, Greater Noida, Uttar Pradesh, India",
  taxId: "09AMVPU5948E1Z4", // DiziGroww GSTIN
  website: "dizigroww.in",
  logo: "/logo.png",
  // Payment block — shown on the invoice PDF only if at least one field is
  // non-empty. Fill these in when you have the values.
  bank: {
    accountName: "",
    accountNumber: "",
    ifsc: "",
    bankName: "",
    branch: "",
    upiId: "",
  },
  signatoryLabel: "For DiziGroww",
  signatureImage: "/signature.png", // transparent PNG dropped in /public/
};
