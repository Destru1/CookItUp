"use client";
import Link from "next/link";
import Container from "~/components/container";
import ClientOnly from "~/components/client-only";
import { Button } from "~/components/ui/button";
import { ingredients } from "~/data/ingredients";

export default function HomePage() {
  return (
    <ClientOnly>
      <Container>
        <h1>Test</h1>
      </Container>
    </ClientOnly>
  );
}
