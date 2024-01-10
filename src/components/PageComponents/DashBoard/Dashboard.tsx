"use client";
import { useAppDispatch } from "@/lib/reduxHook";
import { setUser } from "@/redux/userSlice";
import type { UserData } from "@/types";
import { useEffect } from "react";

export const DashboardPage = ({ id, name, email, isAdmin }: UserData) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const userData = {
      id: id,
      name: name,
      email: email,
      isAdmin: isAdmin,
    };
    dispatch(setUser(userData));
  });

  return (
    <section>
      <p>id: {id}</p>
      <p>name: {name}</p>
    </section>
  );
};
