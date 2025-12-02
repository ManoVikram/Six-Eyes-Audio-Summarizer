import Navbar from "@/components/navbar";
import "./globals.css";

export const metadata = {
  title: "Six Eyes Podcast Summarizer",
  description: "Summarize podcasts and any audio with the help of AI",
};

// Design Inspiration - https://dribbble.com/shots/24127094-Looper-Website-design-for-the-aviation-procurement-platform

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased flex flex-col min-h-dvh p-6">
        <Navbar />

        {children}
      </body>
    </html>
  );
}
