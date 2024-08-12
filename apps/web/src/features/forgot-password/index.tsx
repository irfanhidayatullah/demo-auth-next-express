"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import { ForgotPasswordSchema } from "./schemas/ForgotPasswordSchema";
import useForgotPassword from "@/hooks/api/auth/useForgotPassword";


const ForgotPasswordPage = () => {
  const { forzgotPassword, isLoading } = useForgotPassword();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: ForgotPasswordSchema,
    onSubmit: async (values, {resetForm}) => {
      await forgotPassword(values.email);
      resetForm()
    },
  });
  return (
    <main>
      <main className="flex justify-center pt-20">
        <Card className="w-[350px]">
          <CardHeader className="items-center">
            <CardTitle>Forgot Password</CardTitle>
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
                <Button className="mt-7 w-full" disabled={isLoading}>
                  {isLoading ? "Loading..." : "Submit"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </main>
  );
};

export default ForgotPasswordPage;
