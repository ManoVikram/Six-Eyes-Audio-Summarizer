import "./globals.css";

export const metadata = {
  title: "Podcast Summarizer",
  description: "Summarize podcasts and any audio with the help of AI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
