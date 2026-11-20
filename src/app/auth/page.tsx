import type { Metadata } from "next"
import LoginContent from "@/contents/login"

export const metadata: Metadata = {
     title: "Մուտք"
}
export default function LoginPage(){
     return (
          <LoginContent/>
     )
}