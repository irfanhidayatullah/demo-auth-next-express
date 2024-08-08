import { axiosInstance } from "@/lib/axios";
import { AxiosError } from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const useForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);

  const forgotPassword = async (email: string) => {
    setIsLoading(true);
    try {
      await axiosInstance.post("/auth/forgot-password", { email: email });
      toast.success("send email success");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data || "Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return { forgotPassword, isLoading };
};

export default useForgotPassword;
