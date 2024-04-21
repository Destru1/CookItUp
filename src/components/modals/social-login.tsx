'use client';
import {signIn} from "next-auth/react";
import { Button } from "../ui/button";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

const socialOnClick = (provider: 'google' | 'github') => {
    signIn(provider, { callbackUrl: '/' });
    }

const SocialLogin = () => {
    return ( 
        <>
        <Button variant="outline" onClick={() => socialOnClick('google')} > <FcGoogle size={20} className="mr-2"/> Continue with Google</Button>
        <Button variant="outline" onClick={() => socialOnClick('github')}><AiFillGithub size={20} className="mr-2"/> Continue with GitHub</Button>
        </>
     );
}
 
export default SocialLogin;