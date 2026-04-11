import { Georama, Roboto_Mono } from "next/font/google";

export const georama = Georama({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-georama-family",
});

export const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-family",
});
