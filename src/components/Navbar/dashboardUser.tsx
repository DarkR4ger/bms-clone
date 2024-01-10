"use client";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
} from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/logout";
import { delUser } from "@/redux/userSlice";
import { useAppDispatch } from "@/lib/reduxHook";
import { useAppSelector } from "@/lib/reduxHook";
import nextLink from "next/link";
import { Button } from "@nextui-org/react";

type colors = "primary" | "secondary" | "success" | "warning" | "danger";

export const DashboardUser = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const onClick = async () => {
    await logout();
    dispatch(delUser());
    router.push("/login");
  };

  const colors = ["primary", "seconday", "success", "warning", "danger"];

  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar
          isBordered
          color={colors[Math.floor(Math.random() * colors.length)] as colors}
          radius="lg"
          name={user.name}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="dropdown menu with user data" variant="faded">
        <DropdownSection title="Actions">
          <DropdownItem as={nextLink} href="/dashboard/profile" key="profile">
            Profile
          </DropdownItem>
          <DropdownItem as={nextLink} href="/dashboard/settings" key="settings">
            Settings
          </DropdownItem>
        </DropdownSection>
        <DropdownSection title="Danger Zone">
          <DropdownItem
            as={Button}
            onClick={onClick}
            key="logout"
            color="danger"
          >
            Sign out
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};
