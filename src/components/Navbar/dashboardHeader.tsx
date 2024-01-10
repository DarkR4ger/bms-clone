"use client";
import {
  Navbar as NextUiNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import NextLink from "next/link";
import { Search } from "lucide-react";
import { DashboardUser } from "./dashboardUser";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/logout";
import { delUser } from "@/redux/userSlice";
import { useAppDispatch } from "@/lib/reduxHook";
import { useAppSelector } from "@/lib/reduxHook";

export const DashBoardNavbar = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const onClick = async () => {
    await logout();
    dispatch(delUser());
    router.push("/login");
  };

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        input: "text-sm",
      }}
      type="search"
      labelPlacement="outside"
      placeholder="Type to search movies..."
      startContent={<Search />}
    />
  );

  return (
    <div className="container flex flex-col justify-center">
      <NextUiNavbar maxWidth="full">
        <NavbarContent className="gap-4" justify="start">
          <NavbarBrand className="max-w-fit">
            <Link
              className="font-semibold"
              as={NextLink}
              href="/"
              color="foreground"
            >
              Book<span className="text-red-500">My</span>Show
            </Link>
          </NavbarBrand>
          <NavbarItem className="hidden md:flex w-96">{searchInput}</NavbarItem>
        </NavbarContent>
        <NavbarContent className="flex gap-4" justify="end">
          <NavbarItem className="cursor-pointer">
            <DashboardUser />
          </NavbarItem>
        </NavbarContent>
      </NextUiNavbar>
      <NextUiNavbar className="md:hidden" maxWidth="full">
        <NavbarContent className="md:hidden">
          <NavbarItem className="w-full">{searchInput}</NavbarItem>
        </NavbarContent>
      </NextUiNavbar>
    </div>
  );
};
