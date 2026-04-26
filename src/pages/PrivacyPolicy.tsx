import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useMeta } from "@/hooks/useMeta";

const PrivacyPolicy = () => {
  useMeta({
    title: "Privacy Policy | DiziGroww",
    description: "Learn how DiziGroww collects, uses, and protects your personal data and privacy."
  });

  return (
    <>
      <Navbar />
      <main className="pt-24 min-h-screen bg-background">
        <section className="section-padding">
          <div className="container-main max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-8">Privacy Policy</h1>
            <p className="text-muted-foreground mb-12">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>

            <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4">
              <p>
                At DiziGroww, protecting your privacy and personal data is our top priority. This Privacy Policy details how we collect, use, disclose, and secure your information when you interact with our website, use our services, or communicate with us. It also serves to fulfill the compliance requirements for advertising platforms, including Meta (Facebook) and Google.
              </p>

              <h2>1. Information We Collect</h2>
              <p>We may collect the following types of information when you interact with our website:</p>
              <ul>
                <li><strong>Personal Data:</strong> Name, email address, phone number, and company details submitted through our contact forms or lead generation funnels.</li>
                <li><strong>Usage Data:</strong> Information on how you interact with our website, including IP addresses, browser types, and pages visited, collected automatically.</li>
                <li><strong>Tracking Data:</strong> We utilize cookies, Meta Pixels, and Google Analytics tags to track user activity and measure advertising performance.</li>
              </ul>

              <h2>2. How We Use Your Information</h2>
              <p>DiziGroww utilizes the collected data for the following purposes:</p>
              <ul>
                <li>To provide, operate, and maintain our web development and marketing services.</li>
                <li>To communicate with you regarding your inquiries, proposals, and active projects.</li>
                <li>To optimize our ad campaigns through tracking platforms like the Meta Conversions API and Google Ads.</li>
                <li>To prevent fraud and maintain the security of our web infrastructure.</li>
              </ul>

              <h2>3. Meta (Facebook) Data Collection & Conversions API</h2>
              <p>
                We use the Meta Pixel and the Meta Conversions API (CAPI) to better understand our advertising effectiveness and to deliver more relevant ads to you. When you submit a lead form on our website, we may securely securely hash specific contact information (such as your email address and phone number) using SHA-256 and transmit it to Meta. Meta uses this hashed data to match you to a Facebook account and measure the results of our advertising. You can learn more about how Meta uses this data in the <a href="https://www.facebook.com/policy.php" target="_blank" rel="noopener noreferrer">Meta Privacy Policy</a>.
              </p>

              <h2>4. Sharing of Your Information</h2>
              <p>
                We do not sell, rent, or trade your personal data to third parties. We may share your data with trusted third-party service providers who assist us in operating our business (e.g., Vercel, server hosting, Meta ecosystem, Web3Forms), provided those parties agree to keep this information confidential and secure.
              </p>

              <h2>5. Security of Your Data</h2>
              <p>
                We implement strict, industry-standard security measures, including HTTPS encryption and secure serverless architecture, to protect your personal data from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
              </p>

              <h2>6. Your Data Rights</h2>
              <p>
                Depending on your location, you may have the right to request access to, deletion of, or modification of the personal data we hold about you. To exercise any of these rights, please contact us directly.
              </p>

              <h2>7. Contact Us</h2>
              <p>
                If you have any questions or concerns regarding this Privacy Policy or our data practices, please contact us at:
              </p>
              <p>
                <strong>DiziGroww</strong><br />
                Plot 19, KP, Greater Noida, Uttar Pradesh<br />
                Email: <a href="mailto:info@dizigroww.in">info@dizigroww.in</a><br />
                Phone/WhatsApp: +91 9450010826
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
