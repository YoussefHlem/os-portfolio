"use client";

import Navbar from "@/components/Navbar";
import Welcome from "@/components/Welcome";
import Dock from "@/components/Dock";

import { Draggable } from "gsap/all";
import gsap from "gsap";
import TerminalWindow from "@/windows/Terminal";
import SafariWindow from "@/windows/Safari";
import ResumeWindow from "@/windows/Resume";

gsap.registerPlugin(Draggable);

export default function Home() {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />
      {/*  Windows*/}
      <TerminalWindow />
      <SafariWindow />
      <ResumeWindow />
    </main>
  );
}
