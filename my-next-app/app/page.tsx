"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createUser } from "@/lib/mock-db"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
})

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await createUser(values)
      alert("Account created successfully!")
      form.reset()
    } catch (err) {
      alert(err instanceof Error ? err.message : "Something went wrong")
    }
  }

  return (
    <div className="flex flex-col justify-center p-8 md:p-12 bg-[#9C3766]">
      <Card className="w-full max-w-md mx-auto bg-[#ffffff] border-white shadow-xl text-black">
        <CardHeader>
          <CardTitle className="text-3xl">SignUp</CardTitle>
          <CardDescription className="text-black-100">Create an Account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black-100">Username</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="bg-transparent border-black-300/50 text-white placeholder:text-black-200"
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black-100">Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        className="bg-transparent border-black-300/50 text-white placeholder:text-black-200"
                      />
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black-100">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          className="bg-transparent border-white-300/50 text-white placeholder:text-black-200"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 text-black-200 hover:text-white hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-300" />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold">
                Signup
              </Button>

              <div className="space-y-4 text-center">
                <Link href="/forgot-password" className="text-blue-400 hover:text-blue-700 text-sm">
                  Forgot Password?
                </Link>
                <div>
                  <Link href="/login" className="text-black-100 hover:text-white text-sm">
                    Back to Login
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

