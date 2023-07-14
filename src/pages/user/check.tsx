import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Usercheck=()=>{
 const router=useRouter();
 const { data: session , status: sessionStatus}: any = useSession();
 useEffect(() => {
    if (sessionStatus === 'loading') {
      return;
    }
    if (!session) {
      router.push('/');
    }
  }, [session, sessionStatus, router]);
};
export {Usercheck};