export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
