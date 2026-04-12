"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Welcome from "@/components/Welcome";
import Dock from "@/components/Dock";

import { Draggable } from "gsap/all";
import gsap from "gsap";
import TerminalWindow from "@/windows/Terminal";
import SafariWindow from "@/windows/Safari";
import FinderWindow from "@/windows/Finder";
import TextWindow from "@/windows/Text";
import ImageWindow from "@/windows/Image";
import ContactWindow from "@/windows/Contact";
import Home from "@/components/Home";

const ResumeWindow = dynamic(() => import("@/windows/Resume"), { ssr: false });

gsap.registerPlugin(Draggable);

export default function Page() {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />
      {/*  Windows*/}
      <TerminalWindow />
      <SafariWindow />
      <ResumeWindow />
      <FinderWindow />
      <TextWindow />
      <ImageWindow />
      <ContactWindow />
      <Home />
    </main>
  );
}
