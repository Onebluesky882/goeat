import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

const Footer = () => {
  const location = useLocation();
  const [lang, setLang] = useState<"en" | "th">("th");
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenuMobile = () => {
    setMenuOpen((prev) => !prev);
  };
  console.log(" check:", menuOpen);
  const menus = [
    {
      path: "BillSummary",
      label: { en: "Bill Summary", th: "สรุปบิล" },
      potion: "top-10",
    },
    {
      path: "DashBoard",
      label: { en: "Dashboard", th: "แดชบอร์ด" },
      potion: "top-20",
    },
    {
      path: "MenuManagements",
      label: { en: "Menu", th: "จัดการเมนู" },
      potion: "top-30",
    },
    {
      path: "OrderStatus",
      label: { en: "Order Status", th: "สถานะออเดอร์" },
      potion: "top-40",
    },
    {
      path: "StaffManagement",
      label: { en: "Staff", th: "พนักงาน" },
      potion: "top-50",
    },
    {
      path: "TableSetup",
      label: { en: "Tables", th: "ตั้งค่าโต๊ะ" },
      potion: "top-60",
    },
    {
      path: "cctv",
      label: { en: "CCTV", th: "กล้องวงจรปิด" },
      potion: "top-70",
    },
  ];

  return (
    <>
      <footer className="shadow sticky bottom-0 z-10 border-t left-0">
        <nav className="hidden md:flex max-w-6xl mx-auto px-4 py-3 items-center justify-between">
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6">
            {menus.map((menu, index) => (
              <Link
                key={index}
                to={`/${menu.path}`}
                style={{ top: menu.potion, right: "0" }}
              >
                <span
                  className={`text-sm font-medium ${
                    location.pathname === `/${menu.path}`
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-600 hover:text-blue-500"
                  }`}
                >
                  {menu.label[lang]}
                </span>
              </Link>
            ))}
          </div>

          {/* Language Toggle */}
          <div className="hidden md:flex gap-2 items-center">
            <button
              onClick={() => setLang("th")}
              className={`px-2 py-1 text-sm font-medium rounded ${
                lang === "th" ? "bg-blue-600 text-white" : "text-gray-600"
              }`}
            >
              ไทย
            </button>
            <button
              onClick={() => setLang("en")}
              className={`px-2 py-1 text-sm font-medium rounded ${
                lang === "en" ? "bg-blue-600 text-white" : "text-gray-600"
              }`}
            >
              ENG
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
      </footer>
      <div className="sm:hidden fixed  bottom-0 right-0  rounded-full px-3">
        {/* Mobile Hamburger */}

        <Button
          onClick={toggleMenuMobile}
          className="w-12 right-1 relative bottom-15 rounded-full p-4 outline-1"
        >
          <Menu size={34} />
        </Button>
        {menuOpen && (
          <MobileMenu
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            menus={menus}
            lang={lang}
            setLang={setLang}
            toggleMenuMobile={toggleMenuMobile}
          />
        )}
      </div>
    </>
  );
};

const MobileMenu = ({
  menuOpen,
  lang,
  setLang,
  menus,
  toggleMenuMobile,
}: any) => {
  const handleMenuClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent the click event from bubbling up and closing the menu
  };
  return (
    <div
      onClick={handleMenuClick}
      className="absolute  bottom-25  min-w-25  -ml-10 "
    >
      {menuOpen && (
        <div className="flex flex-col justify-center bg-inherit top-0 left-0 w-3/4 rounded-md ju">
          {/* Loop through menus and display them */}
          {menus.map((menu: any, index: any) => (
            <Link
              key={index} // Only apply key here on the Link element
              to={`/${menu.path}`}
              onClick={toggleMenuMobile}
              className={` shadow-2xl   text-[9px] flex justify-center   text-center p-2 py-3 my-1 text-sm font-bold rounded-full border-1  ${
                location.pathname === `/${menu.path}`
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-black "
              }`}
            >
              {menu.label[lang]}
            </Link>
          ))}
          {/* Mobile Language Toggle */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setLang("th")}
              className={`px-2 py-1 text-sm font-medium rounded ${
                lang === "th" ? "bg-blue-600 text-white" : "text-gray-600"
              }`}
            >
              ไทย
            </button>
            <button
              onClick={() => setLang("en")}
              className={`px-2 py-1 text-sm font-medium rounded ${
                lang === "en" ? "bg-blue-600 text-white" : "text-gray-600"
              }`}
            >
              ENG
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Footer;
