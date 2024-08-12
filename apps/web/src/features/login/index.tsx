"use client";

import { Button } from "@/components/ui/button";
// import * as React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import { LoginSchema } from "./schemas/LoginSchema";
import useLogin from "@/hooks/api/auth/useLogin";
import Link from "next/link";

const LoginPage = () => {
  const { mutateAsync: login, isPending } = useLogin();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      await login(values);
    },
  });
  return (
    <main>
      <main className="flex justify-center pt-20">
        <Card className="w-[350px]">
          <CardHeader className="items-center">
            <CardTitle>Sign In</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={formik.handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {!!formik.touched.email && !!formik.errors.email ? (
                    <p className="text-xs text-red-500">
                      {formik.errors.email}
                    </p>
                  ) : null}
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    name="password"
                    type="password"
                    placeholder="Your Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {!!formik.touched.password && !!formik.errors.password ? (
                    <p className="text-xs text-red-500">
                      {formik.errors.password}
                    </p>
                  ) : null}
                </div>
                <Link href="/forgot-password" className="text-right text-xs">
                  Forgot Password?
                </Link>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="framework"></Label>
                </div>
              </div>
              <Button className=" w-full" disabled={isPending}>
                {isPending ? "Loading..." : "Submit"}
              </Button>
              <Link
                href="/register"
                className="mt-4 flex justify-center text-xs"
              >
                Ra due akun? Gawe COK!
              </Link>
            </form>
          </CardContent>
        </Card>
      </main>
    </main>
  );
};

export default LoginPage;
