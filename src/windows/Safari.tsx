import React from "react";
import WindowWrapper from "@/hoc/WindowWrapper";
import WindowControls from "@/components/WindowControls";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  MoveRight,
  PanelLeft,
  Plus,
  Search,
  Share,
  ShieldHalf,
} from "lucide-react";
import { blogPosts } from "@/constants";

const Safari = () => {
  return (
    <>
      <div id={"window-header"}>
        <WindowControls target={"safari"} />

        <PanelLeft className={"ml-10 icon"} />

        <div className={"flex items-center gap-1 ml-5"}>
          <ChevronLeft className={"icon"} />
          <ChevronRight className={"icon"} />
        </div>

        <div className={"flex-1 flex-center gap-3"}>
          <ShieldHalf className={"icon"} />

          <div className={"search"}>
            <Search className={"icon"} />

            <input
              type={"text"}
              placeholder={"Search or enter website name"}
              className={"flex-1"}
            />
          </div>
        </div>

        <div className={"flex items-center gap-5"}>
          <Share className={"icon"} />
          <Plus className={"icon"} />
          <Copy className={"icon"} />
        </div>
      </div>
      <div className={"blog"}>
        <h2> My Developer Blog</h2>

        {blogPosts.map((blogPost) => (
          <div key={blogPost.id} className={"blog-post"}>
            <div className={"col-span-2"}>
              <img src={blogPost.image} alt="blogPost" />
            </div>
            <div className={"content"}>
              <p>{blogPost.date}</p>
              <h3>{blogPost.title}</h3>
              <a
                href={blogPost.link}
                target="_blank"
                rel={"noopener noreferrer"}
              >
                Check out the full post <MoveRight className={"icon-hover"} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const SafariWindow = WindowWrapper(Safari, "safari");

export default SafariWindow;
