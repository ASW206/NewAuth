"use server"
import { signIn } from "../auth"
export async function googleSignin() {
    return signIn("google",{redirectTo:"/dashboard"})

}