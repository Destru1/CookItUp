"use client";

interface ClientOnlyProps {
  children: React.ReactNode;
}

const ClientOnly = ({ children }: ClientOnlyProps) => {
  return <>{children}</>;
};

export default ClientOnly;
