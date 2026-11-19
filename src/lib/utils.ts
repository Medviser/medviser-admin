export { cn } from "cn"

export function absoluteURL(path?: `/${string}`){
     const baseURL = process.env.NODE_ENV==="production" ? "https://medviser-admin.vercel.app" : "http://localhost:3000"
     return !path ? baseURL : `${baseURL}${path}`
}