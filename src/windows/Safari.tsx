import React from "react";
import WindowWrapper, { useMobileWindow } from "@/hoc/WindowWrapper";
import WindowControls from "@/components/WindowControls";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Copy,
  MoveRight,
  PanelLeft,
  Plus,
  Search,
  Share,
  ShieldHalf,
  Upload,
} from "lucide-react";
import { blogPosts } from "@/constants";

const Safari = () => {
  const ctx = useMobileWindow();
  const isMobile = ctx?.isMobile ?? false;

  return (
    <>
      {!isMobile && (
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
      )}

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

      {isMobile && (
        <div className={"safari-mobile-footer"}>
          <div className={"safari-mobile-search"}>
            <Search className={"size-4 text-gray-500"} />
            <input
              type={"text"}
              placeholder={"Search or enter website name"}
            />
          </div>
          <div className={"safari-mobile-icons"}>
            <ChevronLeft className={"size-6 text-gray-500"} />
            <ChevronRight className={"size-6 text-gray-500"} />
            <Upload className={"size-6 text-blue-500"} />
            <BookOpen className={"size-6 text-blue-500"} />
            <Copy className={"size-6 text-blue-500"} />
          </div>
        </div>
      )}
    </>
  );
};

const SafariWindow = WindowWrapper(Safari, "safari", { title: "Articles" });

export default SafariWindow;
