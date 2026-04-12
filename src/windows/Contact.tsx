import React from "react";
import WindowWrapper from "@/hoc/WindowWrapper";
import { socials } from "@/constants";
import WindowControls from "@/components/WindowControls";
import { Mail, MessageCircle } from "lucide-react";

const Contact = () => {
  return (
    <>
      <div id={"window-header"}>
        <WindowControls target={"contact"} />
        <h2>Contact Me</h2>
      </div>

      <div className={"p-5 space-y-5"}>
        <img
          src={"/images/adrian.jpg"}
          alt="Youssef"
          className="w-20 rounded-full"
        />
        <h3>Let's Connect</h3>
        <p>Got an idea? A bug to squash? Or just wanna talk tech? I'm in.</p>
        <div className="flex flex-col gap-2">
          <a
            href="mailto:youssefhlemdev@gmail.com"
            className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 transition hover:bg-gray-100"
          >
            <span className="flex size-9 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <Mail className="size-4" />
            </span>
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">Email</span>
              <span className="text-sm font-medium text-gray-800">
                youssefhlemdev@gmail.com
              </span>
            </div>
          </a>
          <a
            href="https://wa.me/201068017738"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 transition hover:bg-gray-100"
          >
            <span className="flex size-9 items-center justify-center rounded-full bg-green-100 text-green-600">
              <MessageCircle className="size-4" />
            </span>
            <div className="flex flex-col">
              <span className="text-xs text-gray-500">WhatsApp</span>
              <span className="text-sm font-medium text-gray-800">
                +20 106 801 7738
              </span>
            </div>
          </a>
        </div>
        <ul>
          {socials.map(({ id, bg, link, icon, text }) => (
            <li key={id} style={{ backgroundColor: bg }}>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                title={text}
              >
                <img src={icon} alt={text} className="size-5" />
                <p>{text}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const ContactWindow = WindowWrapper(Contact, "contact");
export default ContactWindow;
