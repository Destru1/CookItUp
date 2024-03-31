"use client";
import Link from "next/link";
import Container from "~/components/container";
import ClientOnly from "~/components/client-only";
import { Button } from "~/components/ui/button";
import { ingredients } from "~/data/ingredients";
import Modal from "~/components/modals/modal";
import RegisterModal from "~/components/modals/register-modal";

export default function HomePage() {
  return (
    <ClientOnly>
      <Container>
        <div>1</div>
      </Container>
    </ClientOnly>
  );
}
