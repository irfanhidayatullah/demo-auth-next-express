"use client";
import { axiosInstance } from "@/lib/axios";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import useAxios from "@/hooks/useAxios";

interface RegisterArgs {
  name: string;
  email: string;
  password: string;
}

const useRegister = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { axiosInstance } = useAxios();
  const register = async (payload: RegisterArgs) => {
    setIsLoading(true);
    try {
      await axiosInstance.post("/auth/register", {
        name: payload.name,
        email: payload.email,
        password: payload.password,
      });
      toast.success("Register Success");
      router.push("/login");
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data || "Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return { register, isLoading };
};

export default useRegister;
