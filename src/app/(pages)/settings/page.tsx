"use client";
import { SessionProvider } from "next-auth/react";
import { useCurrentUser } from "~/app/hooks/useCurrentUser";

const SettingsPage = () => {
  const user = useCurrentUser();
  return <div>{JSON.stringify(user)}sadsad</div>;
};

export default SettingsPage;
