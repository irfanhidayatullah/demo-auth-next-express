import useAxios from "@/hooks/useAxios";
import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface ForgotPasswordPayload{
  email: string
}

const useForgotPassword = () => {

  const forgotPassword = async (email: string) => {
   const router = useRouter()
   const {axiosInstance}=useAxios()

   return useMutation({
    mutationFn: async (payload: ForgotPasswordPayload)=>{
      const {data} = await axiosInstance.post("/auth/forgot-password", payload)
      return data
    },
    onSuccess: () => {
      toast.success("Login success");
      router.replace("/");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data);
    },
   })
  };
};

export default useForgotPassword;
