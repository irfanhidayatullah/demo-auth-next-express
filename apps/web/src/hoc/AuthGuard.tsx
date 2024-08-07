"use client";

import { useAppSelector } from "@/redux/hooks";
import { redirect } from "next/navigation";

export const AuthGuard = (Component: any) => {
  return function isAuth(props: any) {
    const { id } = useAppSelector((state) => state.user);

    if (!id) {
      return redirect("/login");
    }
    return <Component {...props} />;
  };
};
