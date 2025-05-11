import { cn } from "@/lib/utils";

type NavItem = {
  title: string;
  href: string;
};

type NavSection = {
  title: string;
  items: NavItem[];
};

type SidebarNavProps = {
  sections: NavSection[];
  className?: string;
  activeHref?: string;
};

const SidebarNav = ({
  sections,
  className,
  activeHref = "#introduction",
}: SidebarNavProps) => {
  return (
    <div className={cn("w-full md:w-64 flex-shrink-0", className)}>
      <nav className="sticky top-6 w-full">
        <div className="space-y-6">
          {sections.map((section, i) => (
            <div key={i} className="space-y-2">
              <h4 className="font-medium text-sm text-muted-foreground">
                {section.title}
              </h4>
              <ul className="space-y-1">
                {section.items.map((item, j) => (
                  <li key={j}>
                    <a
                      href={item.href}
                      className={cn(
                        "block text-sm py-1.5 text-muted-foreground hover:text-foreground",
                        activeHref === item.href && "font-medium text-primary"
                      )}
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default SidebarNav;
