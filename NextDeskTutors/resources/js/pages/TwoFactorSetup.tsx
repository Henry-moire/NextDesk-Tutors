import React from "react";
import Layout from "../layouts/Layout";

type Props = {
  qrCode: string;
  recoveryCodes: string[];
};

export default function TwoFactorSetup({ qrCode, recoveryCodes }: Props) {
  return (
    <Layout>
      <main className="container">
        <h2>Two-Factor Authentication Setup</h2>

        <section className="mt-4">
          <p>Scan this QR code with your authenticator app:</p>
          <div
            dangerouslySetInnerHTML={{ __html: qrCode }}
            className="qr-code"
          />
        </section>

        <section className="mt-4">
          <p>Save these recovery codes in a safe place:</p>
          <ul>
            {recoveryCodes.map((code, index) => (
              <li key={index} className="font-mono">{code}</li>
            ))}
          </ul>
        </section>
      </main>
    </Layout>
  );
}
