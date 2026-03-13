export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main style={{ minHeight: '100vh', background: '#f6f4f5' }}>
      {children}
    </main>
  );
}
