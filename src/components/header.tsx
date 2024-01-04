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

export const Navbar = () => {
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
    <header className="container flex flex-col justify-center">
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
        <NavbarContent justify="end">
          <NavbarItem>
            <Button
              as={NextLink}
              size="sm"
              className="bg-red-500"
              href="/login"
            >
              Sign In
            </Button>
          </NavbarItem>
        </NavbarContent>
      </NextUiNavbar>
      <NextUiNavbar className="md:hidden" maxWidth="full">
        <NavbarContent className="md:hidden">
          <NavbarItem className="w-full">{searchInput}</NavbarItem>
        </NavbarContent>
      </NextUiNavbar>
    </header>
  );
};
