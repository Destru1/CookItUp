"use client";
import Link from "next/link";
import Container from "../container";
import Search from "./search";
import UserMenu from "./user-menu";

export default function Header() {
  return (
    <header className="w-full bg-white shadow">
      <Container>
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <Link href="/">
              <div>CookitUp</div>
            </Link>
          </div>
          <Search />
          <UserMenu />
        </div>
      </Container>
    </header>
  );
}
