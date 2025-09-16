export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Hero Section avec pattern de fond */}
      <div className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('/car-pattern.svg')] opacity-5"></div>

        {/* Contenu principal */}
        <main className="relative">{children}</main>
      </div>
    </div>
  );
}
