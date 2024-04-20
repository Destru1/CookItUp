import { auth } from "auth";

const SettingsPage = async () => {
  const session = await auth();
  return <div>{JSON.stringify(session)}sadsad</div>;
};

export default SettingsPage;
