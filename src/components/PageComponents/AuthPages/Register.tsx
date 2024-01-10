"use client";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import NextLink from "next/link";
import { Divider } from "@nextui-org/divider";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import type { UserFormElements } from "@/types";
import { NextResponse } from "next/server";
import { Chip } from "@nextui-org/react";
import { useAppDispatch, useAppSelector } from "@/lib/reduxHook";
import { setLoading } from "@/redux/loaderSlice";

interface RegisterResponse extends NextResponse {
  success: boolean;
  message: string;
}

type SetState<T> = Dispatch<SetStateAction<T>>;

export const RegisterPage = () => {
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [message, setMessage] = useState("");

  const isLoading = useAppSelector((state) => state.loader.loading);
  const dispatch = useAppDispatch();

  const timeout = (
    setState: SetState<boolean>,
    newValue: boolean,
    limit: number,
    oldValue: boolean,
  ) => {
    setState(newValue);
    setTimeout(() => {
      setState(oldValue);
    }, limit);
  };

  const onSubmit = async (event: FormEvent<UserFormElements>) => {
    event.preventDefault();
    dispatch(setLoading(true));
    const formData = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: formData,
      });
      const data: RegisterResponse = await response.json();

      if (data.success) {
        dispatch(setLoading(false));
        setMessage(data.message);
        timeout(setSuccess, true, 2000, false);
      } else {
        dispatch(setLoading(false));
        setMessage(data.message);
        timeout(setFailure, true, 2000, false);
      }
    } catch (err) {
      dispatch(setLoading(false));
      setMessage("Something went wrong, please try again");
      timeout(setFailure, true, 2000, false);
    }
  };

  return (
    <section>
      <Card>
        <CardHeader>
          <p className="text-xl md:text-3xl font-semibold">Login</p>
        </CardHeader>
        <Divider />
        <CardBody className="flex flex-col gap-4 justify-center">
          <form
            onSubmit={onSubmit}
            className="flex flex-col gap-4 justify-center"
          >
            <Input
              isRequired
              name="name"
              type="text"
              classNames={{
                inputWrapper: "max-w-96 md:w-[400px] ",
              }}
              placeholder="Enter your name..."
              label="name"
              size="lg"
            />
            <Input
              isRequired
              name="email"
              type="email"
              classNames={{
                inputWrapper: "max-w-96 md:w-[400px] ",
              }}
              placeholder="Enter your email..."
              label="Email"
              size="lg"
            />
            <Input
              isRequired
              name="password"
              type="password"
              classNames={{
                inputWrapper: "max-w-96 md:w-[400px] ",
              }}
              placeholder="Enter your password..."
              label="Password"
              size="lg"
            />
            <div className="flex items-center justify-center gap-3">
              <p>Already have an account?</p>
              <Link as={NextLink} href="/login">
                Sign In
              </Link>
            </div>
            <Button
              fullWidth
              isLoading={isLoading}
              color="primary"
              className="font-semibold text-sm md:text-lg"
              type="submit"
            >
              Register
            </Button>
          </form>
          {success && (
            <Chip size="lg" className="self-center" color="success">
              {message}
            </Chip>
          )}
          {failure && (
            <Chip size="lg" className="self-center" color="danger">
              {message}
            </Chip>
          )}
        </CardBody>
      </Card>
    </section>
  );
};
