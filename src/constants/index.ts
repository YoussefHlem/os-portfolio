// ──────────────────────────────────────────────────────────────────────
// Domain types. These are the single source of truth for the shapes of
// the data literals below — the literals are validated against these
// using `satisfies` so the narrow literal types are preserved.
// ──────────────────────────────────────────────────────────────────────

export type FileType = "txt" | "url" | "img" | "fig" | "pdf";
export type LocationType = "work" | "projects" | "about" | "resume" | "trash";

type BaseNode = {
  id: number;
  name: string;
  icon: string;
  position?: string;
};

export type FileNode = BaseNode & {
  kind: "file";
  fileType: FileType;
  href?: string;
  imageUrl?: string;
  description?: string[];
  subtitle?: string;
  image?: string;
};

export type FolderNode = BaseNode & {
  kind: "folder";
  windowPosition?: string;
  children: LocationNode[];
};

export type LocationNode = FileNode | FolderNode;

export type RootFolder = FolderNode & { type: LocationType };

export type NavLink = {
  id: number;
  name: string;
  type: WindowKey;
};

export type NavIcon = {
  id: number;
  img: string;
};

export type DockApp =
  | {
      id: WindowKey;
      name: string;
      icon: string;
      canOpen: true;
    }
  | {
      id: "trash";
      name: string;
      icon: string;
      canOpen: true;
    };

export type BlogPost = {
  id: number;
  date: string;
  title: string;
  image: string;
  link: string;
};

export type TechCategory = {
  category: string;
  items: string[];
};

export type Social = {
  id: number;
  text: string;
  icon: string;
  bg: string;
  link: string;
};

export type PhotoLink = {
  id: number;
  icon: string;
  title: string;
};

export type GalleryItem = {
  id: number;
  img: string;
};

// ──────────────────────────────────────────────────────────────────────
// Data
// ──────────────────────────────────────────────────────────────────────

const navLinks = [
  {
    id: 1,
    name: "Experience",
    type: "finder",
  },
  {
    id: 2,
    name: "Projects",
    type: "finder",
  },
  {
    id: 3,
    name: "Contact",
    type: "contact",
  },
  {
    id: 4,
    name: "Resume",
    type: "resume",
  },
] as const satisfies readonly NavLink[];

const navIcons = [
  {
    id: 1,
    img: "/icons/wifi.svg",
  },
  {
    id: 2,
    img: "/icons/search.svg",
  },
  {
    id: 3,
    img: "/icons/user.svg",
  },
  {
    id: 4,
    img: "/icons/mode.svg",
  },
] as const satisfies readonly NavIcon[];

const dockApps = [
  {
    id: "finder",
    name: "Portfolio", // was "Finder"
    icon: "finder.png",
    canOpen: true,
  },
  {
    id: "safari",
    name: "Articles", // was "Safari"
    icon: "safari.png",
    canOpen: true,
  },
  {
    id: "contact",
    name: "Contact", // or "Get in touch"
    icon: "contact.png",
    canOpen: true,
  },
  {
    id: "terminal",
    name: "Skills", // was "Terminal"
    icon: "terminal.png",
    canOpen: true,
  },
  {
    id: "trash",
    name: "Archive", // was "Trash"
    icon: "trash.png",
    canOpen: true,
  },
] as const satisfies readonly DockApp[];

const blogPosts = [
  {
    id: 1,
    date: "Sep 2, 2025",
    title:
      "TypeScript Explained: What It Is, Why It Matters, and How to Master It",
    image: "/images/blog1.png",
    link: "https://jsmastery.com/blog/typescript-explained-what-it-is-why-it-matters-and-how-to-master-it",
  },
  {
    id: 2,
    date: "Aug 28, 2025",
    title: "The Ultimate Guide to Mastering Three.js for 3D Development",
    image: "/images/blog2.png",
    link: "https://jsmastery.com/blog/the-ultimate-guide-to-mastering-three-js-for-3d-development",
  },
  {
    id: 3,
    date: "Aug 15, 2025",
    title: "The Ultimate Guide to Mastering GSAP Animations",
    image: "/images/blog3.png",
    link: "https://jsmastery.com/blog/the-ultimate-guide-to-mastering-gsap-animations",
  },
] as const satisfies readonly BlogPost[];

const techStack = [
  {
    category: "Languages",
    items: ["JavaScript (ES6+)", "TypeScript", "HTML/CSS"],
  },
  {
    category: "Frameworks",
    items: ["React.js", "Next.js", "React Native", "Redux"],
  },
  {
    category: "UI Technologies",
    items: ["Tailwind CSS", "SASS", "Chakra UI", "Shadcn", "Material UI"],
  },
  {
    category: "Specialized",
    items: ["GIS (ArcGIS/Leaflet)", "Responsive Design", "TDD"],
  },
  {
    category: "Dev Tools",
    items: ["Git", "Azure", "Design Patterns"],
  },
] as const satisfies readonly TechCategory[];

const socials = [
  {
    id: 1,
    text: "Github",
    icon: "/icons/github.svg",
    bg: "#f4656b",
    link: "https://github.com/YoussefHlem",
  },
  {
    id: 2,
    text: "Email",
    icon: "/icons/atom.svg",
    bg: "#4bcb63",
    link: "mailto:youssefhlemdev@gmail.com",
  },
  {
    id: 3,
    text: "Phone",
    icon: "/icons/twitter.svg",
    bg: "#ff866b",
    link: "tel:+201068017738",
  },
  {
    id: 4,
    text: "LinkedIn",
    icon: "/icons/linkedin.svg",
    bg: "#05b6f6",
    link: "https://linkedin.com/in/youssef-hlem-002bb1266",
  },
] as const satisfies readonly Social[];

const photosLinks = [
  {
    id: 1,
    icon: "/icons/gicon1.svg",
    title: "Library",
  },
  {
    id: 2,
    icon: "/icons/gicon2.svg",
    title: "Memories",
  },
  {
    id: 3,
    icon: "/icons/file.svg",
    title: "Places",
  },
  {
    id: 4,
    icon: "/icons/gicon4.svg",
    title: "People",
  },
  {
    id: 5,
    icon: "/icons/gicon5.svg",
    title: "Favorites",
  },
] as const satisfies readonly PhotoLink[];

const gallery = [
  {
    id: 1,
    img: "/images/gal1.png",
  },
  {
    id: 2,
    img: "/images/gal2.png",
  },
  {
    id: 3,
    img: "/images/gal3.png",
  },
  {
    id: 4,
    img: "/images/gal4.png",
  },
] as const satisfies readonly GalleryItem[];

export {
  navLinks,
  navIcons,
  dockApps,
  blogPosts,
  techStack,
  socials,
  photosLinks,
  gallery,
};

const WORK_LOCATION: RootFolder = {
  id: 1,
  type: "work",
  name: "Experience",
  icon: "/icons/work.svg",
  kind: "folder",
  children: [
    // ▶ Experience 1 — Bitech Company
    {
      id: 5,
      name: "Bitech Company",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-10 left-5",
      windowPosition: "top-[5vh] left-5",
      children: [
        {
          id: 1,
          name: "Bitech Role.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          subtitle:
            "Software Engineer - Frontend Specialist | Jan 2025 - Present",
          description: [
            "Architected a multi-tenant SaaS admin dashboard from the ground up using Next.js 16, React 19, and TypeScript, serving HRM and PFP modules with full English/Arabic internationalization.",
            "Designed and built a reusable foundation layer including an advanced data table system (sorting, filtering, column pinning/reordering/resizing, bulk actions, CSV/XLSX/PDF export), a SQL-like advanced filter builder with AND/OR group logic, and a multi-view data presentation layer (table/board/list).",
            "Integrated ArcGIS and Leaflet GIS capabilities for spatial data visualization, implementing bi-directional map-table row selection sync and interactive marker/popup systems for incident management.",
            "Implemented RBAC, dynamic custom fields injection, duplicate detection & merge workflows, bulk archive/restore operations, and real-time data import pipelines with validation across 15+ service modules following clean layered architecture.",
          ],
        },
        {
          id: 2,
          name: "bitech-stack.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-10 right-20",
          description: [
            "Tech Stack: Next.js 16, React 19, TypeScript, ArcGIS, Leaflet, Tailwind CSS",
            "Architecture: Clean layered (domain, infrastructure, application, presentation)",
            "Location: Cairo, Nasr City",
          ],
        },
      ],
    },

    // ▶ Experience 2 — Muze Company
    {
      id: 6,
      name: "Muze Company",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-52 right-80",
      windowPosition: "top-[20vh] left-7",
      children: [
        {
          id: 1,
          name: "Muze Role.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 right-10",
          subtitle: "React.js & React Native Developer | Sep 2023 - Dec 2024",
          description: [
            "Contributed to enhancing a social media platform by developing and integrating a real-time messaging feature using WebSocket technology.",
            "Worked closely with senior developers to improve the platform’s UI/UX design, focusing on creating intuitive user interfaces and seamless interactions.",
            "Built the Muze Mobile App using React Native, ensuring consistent functionality across iOS and Android platforms.",
            "Collaborated with backend teams to implement API integrations and gained hands-on experience with Redux for state management in complex applications.",
          ],
        },
        {
          id: 2,
          name: "muze-stack.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-20 left-20",
          description: [
            "Tech Stack: React.js, React Native, Redux, WebSocket",
            "Type: Social Media Platform",
            "Location: Remote",
          ],
        },
      ],
    },

    // ▶ Experience 3 — Softigital Company
    {
      id: 7,
      name: "Softigital Company",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-10 left-80",
      windowPosition: "top-[33vh] left-7",
      children: [
        {
          id: 1,
          name: "Softigital Role.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          subtitle: "React.js & React Native Developer | Jun 2022 - Sep 2023",
          description: [
            "Developed and maintained e-commerce platforms and admin dashboards using React.js, focusing on implementing responsive design principles and optimizing component performance.",
            "Built mobile applications with React Native, ensuring consistent user experiences across different devices and screen sizes.",
            "Worked collaboratively with cross-functional teams including designers, backend developers, and project managers to deliver projects successfully.",
            "Gained valuable experience with Git version control, Agile methodologies, and modern CSS frameworks while contributing to various client projects.",
          ],
        },
        {
          id: 2,
          name: "softigital-stack.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-10 right-20",
          description: [
            "Tech Stack: React.js, React Native, CSS Frameworks, Git",
            "Type: E-commerce Platforms & Admin Dashboards",
            "Location: Giza, 6 October",
          ],
        },
      ],
    },
  ],
};

const PROJECTS_LOCATION: RootFolder = {
  id: 10,
  type: "projects",
  name: "Projects",
  icon: "/icons/work.svg",
  kind: "folder",
  children: [
    // ▶ Project 1 — OS Portfolio
    {
      id: 11,
      name: "OS Portfolio",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-10 left-5",
      windowPosition: "top-[5vh] left-5",
      children: [
        {
          id: 1,
          name: "OS Portfolio.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          image: "/images/project-1.png",
          subtitle: "macOS-style Portfolio Website",
          description: [
            "A creative portfolio website built as a macOS desktop shell with a full windowing system, dock, and Finder-style navigation.",
            "Built with Next.js 16, React 19, TypeScript, Tailwind CSS, GSAP animations, and Zustand for state management.",
          ],
        },
        {
          id: 2,
          name: "os-portfolio.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-10 right-20",
          imageUrl: "/images/project-1.png",
        },
        {
          id: 3,
          name: "source-code.com",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://github.com/YoussefHlem/os-portfolio",
          position: "top-52 right-80",
        },
      ],
    },

    // ▶ Project 2 — SaaS Admin Dashboard
    {
      id: 12,
      name: "SaaS Admin Dashboard",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-52 right-80",
      windowPosition: "top-[20vh] left-7",
      children: [
        {
          id: 1,
          name: "SaaS Dashboard.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 right-10",
          image: "/images/project-2.png",
          subtitle: "Multi-tenant SaaS Admin Dashboard",
          description: [
            "A multi-tenant SaaS admin dashboard built from the ground up with Next.js 16, React 19, and TypeScript, serving HRM and PFP modules with full English/Arabic internationalization.",
            "Features advanced data tables (sorting, filtering, column pinning/reordering/resizing, bulk actions, CSV/XLSX/PDF export), a SQL-like advanced filter builder with AND/OR group logic, and a multi-view data presentation layer.",
            "Integrated ArcGIS and Leaflet GIS capabilities for spatial data visualization with bi-directional map-table row selection sync.",
            "Implements RBAC, dynamic custom fields, duplicate detection & merge workflows, and real-time data import pipelines across 15+ service modules following clean layered architecture.",
          ],
        },
        {
          id: 2,
          name: "saas-dashboard.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-20 left-20",
          imageUrl: "/images/project-2.png",
        },
      ],
    },

    // ▶ Project 3 — Muze Mobile App
    {
      id: 13,
      name: "Muze Mobile App",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-10 left-80",
      windowPosition: "top-[33vh] left-7",
      children: [
        {
          id: 1,
          name: "Muze App.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          image: "/images/project-3.png",
          subtitle: "Muze Social Media Mobile App",
          description: [
            "A cross-platform social media mobile application built with React Native for iOS and Android.",
            "Features real-time messaging via WebSocket technology, intuitive UI/UX design, and Redux for state management.",
            "Integrated with backend APIs for seamless data flow and consistent functionality across platforms.",
          ],
        },
        {
          id: 2,
          name: "muze-app.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-10 right-20",
          imageUrl: "/images/project-3.png",
        },
      ],
    },
  ],
};

const ABOUT_LOCATION: RootFolder = {
  id: 2,
  type: "about",
  name: "About me",
  icon: "/icons/info.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "me.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-10 left-5",
      imageUrl: "/images/me.jpg",
    },
    {
      id: 2,
      name: "about-me.txt",
      icon: "/images/txt.png",
      kind: "file",
      fileType: "txt",
      position: "top-28 right-72",
      subtitle: "Senior Frontend Developer",
      image: "/images/me.jpg",
      description: [
        "Senior Frontend Developer with 4+ years of expertise building scalable enterprise applications using React and Next.js.",
        "Specialized in architecting robust web solutions for HRM, PFP, and SaaS platforms with GIS integration capabilities (ArcGIS, Leaflet).",
        "Proven track record in delivering high-performance applications with Test-Driven Development and industry-leading design patterns following clean layered architecture.",
        "Passionate about leveraging modern technologies and best practices to solve complex business challenges while maintaining code quality and ensuring seamless user experiences.",
      ],
    },
    {
      id: 3,
      name: "education.txt",
      icon: "/images/txt.png",
      kind: "file",
      fileType: "txt",
      position: "top-52 left-80",
      subtitle: "Education",
      description: [
        "Cairo University — Bachelor of Commerce (Aug 2023 - Present)",
        "Cairo, Egypt",
      ],
    },
  ],
};

const RESUME_LOCATION: RootFolder = {
  id: 3,
  type: "resume",
  name: "Resume",
  icon: "/icons/file.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "Resume.pdf",
      icon: "/images/pdf.png",
      kind: "file",
      fileType: "pdf",
      // you can add `href` if you want to open a hosted resume
      // href: "/your/resume/path.pdf",
    },
  ],
};

const TRASH_LOCATION: RootFolder = {
  id: 4,
  type: "trash",
  name: "Trash",
  icon: "/icons/trash.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "trash1.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-10 left-10",
      imageUrl: "/images/trash-1.png",
    },
    {
      id: 2,
      name: "trash2.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-40 left-80",
      imageUrl: "/images/trash-2.png",
    },
  ],
};

export const locations = {
  work: WORK_LOCATION,
  projects: PROJECTS_LOCATION,
  about: ABOUT_LOCATION,
  resume: RESUME_LOCATION,
  trash: TRASH_LOCATION,
} satisfies Record<LocationType, RootFolder>;

export const portfolioRoot: FolderNode = {
  id: 0,
  name: "Portfolio",
  icon: "/images/finder.png",
  kind: "folder",
  children: [
    { ...WORK_LOCATION, icon: "/images/folder.png" },
    { ...PROJECTS_LOCATION, icon: "/images/folder.png" },
    { ...ABOUT_LOCATION, icon: "/images/folder.png" },
    { ...RESUME_LOCATION, icon: "/images/folder.png" },
    { ...TRASH_LOCATION, icon: "/images/folder.png" },
  ],
};

const INITIAL_Z_INDEX = 1000;

type WindowConfigEntry = {
  isOpen: boolean;
  zIndex: number;
  data: LocationNode | null;
};

const WINDOW_CONFIG = {
  finder: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  contact: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  resume: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  safari: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  photos: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  terminal: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  txtfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  imgfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
} satisfies Record<string, WindowConfigEntry>;

export type WindowKey = keyof typeof WINDOW_CONFIG;

export { INITIAL_Z_INDEX, WINDOW_CONFIG };
export type { WindowConfigEntry };
