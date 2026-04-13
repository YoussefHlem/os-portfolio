"use client";

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
import ResumeWindow from "@/windows/Resume";

gsap.registerPlugin(Draggable);

export default function ClientShell() {
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
