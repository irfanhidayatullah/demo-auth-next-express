import { axiosInstance } from "@/lib/axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

const useResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()
  const resetPassword = async (password: string, token: string) => {
    setIsLoading(true);
    try {
      await axiosInstance.patch(
        "/auth/reset-password",
        { password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success("Reset Password Success");
      router.replace("/login")
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data || "Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return { resetPassword, isLoading };
};

export default useResetPassword;
