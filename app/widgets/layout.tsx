"use client";

export default function WidgetsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/50 to-background">
      <div className="container mx-auto min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-3xl">{children}</div>
      </div>
    </div>
  );
}
