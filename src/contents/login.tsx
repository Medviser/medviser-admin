"use client"
import Image from "next/image";
import { Eye, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button";
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { FcGoogle } from "react-icons/fc";
import { SiApple } from "react-icons/si";
import { Checkbox } from "@/components/ui/checkbox";

export default function LoginContent(){
     return (
          <div className="bg-linear-to-br from-primary to-background w-full h-dvh flex justify-center items-center">
               <div className="p-5 rounded-md bg-card/80 backdrop-blur-md border text-card-foreground shadow-sm max-w-sm w-full space-y-5">
                    <div className="flex items-center gap-5">
                         <Image
                              src="/app-icon.png"
                              alt="Medviser admin"
                              width={80}
                              height={80}
                              className="object-contain aspect-square rounded-full shadow-sm"
                         />
                         <div className="space-y-2">
                              <h1 className="font-semibold text-xl md:text-2xl lg:text-3xl">Մուտք</h1>
                              <p className="text-sm text-muted-foreground">Մուտք գործեք ադմինիստրատորի վահանակ՝ բովանդակությունը կառավարելու համար</p>
                         </div>
                    </div>
                    <form>
                         <FieldGroup className="gap-5">
                              <Field>
                                   <FieldLabel htmlFor="identifier">Հեռախոսահամար կամ էլ․ փոստ</FieldLabel>
                                   <Input id="identifier" placeholder="name@example.com կամ +1234567890"/>
                                   <FieldError errors={[]}/>
                              </Field>
                              <Field>
                                   <FieldLabel htmlFor="password">Գաղտնաբառ</FieldLabel>
                                   <InputGroup>
                                        <InputGroupInput type="password" id="password" placeholder="********"/>
                                        <InputGroupAddon align="inline-end">
                                             <InputGroupButton size="icon-xs">
                                                  <Eye/>
                                             </InputGroupButton>
                                        </InputGroupAddon>
                                   </InputGroup>
                                   <FieldDescription>
                                        <Button variant="link" size="xs" className="p-0">
                                             Մոռացե՞լ եք գաղտնաբառը
                                        </Button>
                                   </FieldDescription>
                                   <FieldError errors={[]}/>
                              </Field>
                              <Field orientation="horizontal">
                                   <Checkbox id="remember-me" />
                                   <FieldContent>
                                        <FieldLabel htmlFor="remember-me">Հիշեք ինձ</FieldLabel>
                                        <FieldError errors={[]}/>
                                   </FieldContent>
                              </Field>
                              <Field>
                                   <Button type="submit">
                                        <LogIn/>
                                        Մուտք
                                   </Button>
                              </Field>
                              <FieldSeparator/>
                              <Field>
                                   <Button type="button" variant="outline">
                                        <FcGoogle/>
                                        Շարունակեք Google-ով
                                   </Button>
                                   <Button type="button" variant="outline">
                                        <SiApple/>
                                        Շարունակեք Apple-ով
                                   </Button>
                              </Field>
                         </FieldGroup>
                    </form>
               </div>
          </div>
     )
}