"use server"
import { signIn } from "../auth"

export async function googleSignin() {
    return signIn("google",{redirectTo:"/dashboard"})

}

export async function signInWithCredentials(email: string, password: string) {
    return signIn("credentials", { email, password }, { redirectTo: "/dashboard" })
}