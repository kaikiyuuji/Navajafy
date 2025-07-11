import Image from "next/image";
import { Button } from "./ui/button";
import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { signIn } from "next-auth/react";

const SingInDialog = () => {
    const handleLoginWithGoogleClick = () => signIn("google")
    return ( 
        <>
        <DialogHeader>
            <DialogTitle>Login</DialogTitle>
            <DialogDescription>
            Conecte-se com sua conta do Google.
            </DialogDescription>
        </DialogHeader>

        <Button
            variant="outline"
            className="gap-2 text-lg font-bold"
            onClick={handleLoginWithGoogleClick}
        >
            <Image
            alt="Google"
            src="/google-icon.svg"
            width={18}
            height={18}
            ></Image>
            Google
        </Button>   
        </>
     );
}
 
export default SingInDialog;