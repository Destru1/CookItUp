"use client";
import Link from "next/link";
import Container from "~/components/container";
import ClientOnly from "~/components/client-only";
import { Button } from "~/components/ui/button";
import { ingredients } from "~/data/ingredients";
import Modal from "~/components/modals/modal";

export default function HomePage() {
  return (
    <ClientOnly>
      <Container>
        <Modal isOpen />
      </Container>
    </ClientOnly>
  );
}
