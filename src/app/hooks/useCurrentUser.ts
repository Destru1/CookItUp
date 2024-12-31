import { useSession } from "next-auth/react";
import { SafeUser } from "../types";

export const useCurrentUser = () : SafeUser | null => {
const session = useSession();

return session.data?.user as SafeUser | null;
};
export default useCurrentUser;