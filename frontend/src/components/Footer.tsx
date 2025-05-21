import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";

const Footer = () => {
  const location = useLocation();
  const [lang, setLang] = useState<"en" | "th">("en");
  // todo change menuOpen to global state
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenuMobile = () => {
    setMenuOpen((prev) => !prev);
  };

  const mainMenu = [
    {
      path: "login",
      label: {
        en: "login",
        th: "ลงชื่อเข้า",
      },
      potion: "top-10",
    },

    {
      path: "controller",
      label: { en: "controller", th: "ศูนย์กลาง" },
      potion: "top-10",
    },
    {
      path: "shops ",
      label: { en: "shops", th: "ร้านอาหารของคุณ" },
      potion: "top-10",
    },
    {
      path: "profile",
      label: { en: "profile", th: "ผู้ใช้" },
      potion: "top-10",
    },
    {
      path: "feedback",
      label: { en: "feedback", th: "แนะนำติชม" },
      potion: "top-10",
    },
    {
      path: "logout",
      label: { en: "logout", th: "ลงชื่อออก" },
      potion: "top-10",
    },
  ];

  {
    /*
  <Route path="shops">
    <Route path="create" element={<CreateNewShop />} />

    <!-- /shops/:shopId -->
    <Route path=":shopId" element={<Controller />}>
      <Route path="dashboard" element={<DashBoard />} />
      <Route path="dashboard/:orderId" element={<OrderStatus />} />
      <Route path="menu" element={<MenuManagement />} />
      <Route path="orders" element={<OrderStatus />} />
      <Route path="orders/:orderId" element={<BillSummary />} />
      <Route path="staff" element={<StaffManagement />} />
      <Route path="staff/:empId" element={<StaffProfile />} />
      <Route path="table-setup" element={<TableSetup />} />
      <Route path="cctv" element={<Cctv />} />
      <!-- …other nested routes… -->
    </Route>
  </Route>
*/
  }

  const shopMenu = [
    {
      path: "controller",
      label: { en: "Main", th: "mapping" },
      potion: "top-10",
    },
    {
      path: "shops/create",
      label: { en: "Add Shop", th: "สร้างร้านค้า" },
      potion: "top-10",
    },
    {
      path: "shops/layout",
      label: { en: "Table Layout", th: "แผนผังโต๊ะ" },
      potion: "top-10",
    },
    {
      path: "dashboard",
      label: { en: "Dashboard", th: "แดชบอร์ด" },
      potion: "top-20",
    },
    {
      path: "menumanagements",
      label: { en: "Menu", th: "จัดการเมนู" },
      potion: "top-30",
    },
    {
      path: "OrderStatus",
      label: { en: "Order Status", th: "สถานะออเดอร์" },
      potion: "top-40",
    },
  ];

  return (
    <footer className={` shadow-2xl sticky bottom-0 z-10  pt-1    `}>
      <div
        className={` left-0 rounded-t-2xl shadow-2xl ${
          location.pathname.startsWith("/shop") ? `bg-blue-500` : `bg-amber-300`
        } 
        } `}
      >
        <nav className="hidden sm:flex max-w-6xl mx-auto px-4 py-3 items-center justify-between ">
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6">
            {location.pathname.startsWith("/shop") ? (
              <div>
                {shopMenu.map((menu, index) => (
                  <Link
                    key={index}
                    to={`/${menu.path}`}
                    style={{ top: menu.potion, right: "0" }}
                  >
                    <span
                      className={`text-md font-medium mx-2 text-blue-900  ${
                        location.pathname === `/${menu.path}`
                          ? "text-blue-600 border-b-2 border-blue-600"
                          : "text-white hover:text-blue-500"
                      }`}
                    >
                      {menu.label[lang]}
                    </span>
                  </Link>
                ))}{" "}
              </div>
            ) : (
              <div>
                {mainMenu.map((menu, index) => (
                  <Link key={index} to={`/${menu.path}`}>
                    <span
                      className={`text-sm font-medium mx-5 ${
                        location.pathname === `/${menu.path}`
                          ? "text-blue-600 border-b-2 border-blue-600"
                          : "text-gray-700 hover:text-blue-500"
                      }`}
                    >
                      {menu.label[lang]}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Language Toggle */}
          <div className="hidden md:flex gap-2 items-center">
            <button
              onClick={() => setLang("th")}
              className={`px-2 py-1 text-sm font-medium rounded  ${
                lang === "th" ? "bg-blue-600 text-white" : "text-gray-500"
              }`}
            >
              ไทย
            </button>
            <button
              onClick={() => setLang("en")}
              className={`px-2 py-1 text-sm font-medium rounded ${
                lang === "en" ? "bg-blue-600 text-white" : "text-gray-500"
              }`}
            >
              ENG
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
      </div>
      <div className="sm:hidden fixed  bottom-0 right-0  rounded-full px-3">
        {/* Mobile Hamburger */}

        <Button
          onClick={toggleMenuMobile}
          className="w-10 h-10 right-1 relative bottom-5 rounded-full p-4   bg-amber-200"
        >
          <Menu size={34} color="black" />
        </Button>
        {menuOpen && (
          <MobileMenu
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            menus={shopMenu}
            lang={lang}
            setLang={setLang}
            toggleMenuMobile={toggleMenuMobile}
          />
        )}
      </div>
    </footer>
  );
};

const MobileMenu = ({ menuOpen, lang, menus, toggleMenuMobile }: any) => {
  const handleMenuClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent the click event from bubbling up and closing the menu
  };
  return (
    <div
      onClick={handleMenuClick}
      className="absolute right-0 bottom-15  min-w-24  "
    >
      <div className="bg-white/50 shadow backdrop-blur-md outline-1 mr-2 pl-3 rounded-2xl mb-2 pt-1  ">
        {menuOpen && (
          <div className="flex flex-col justify-center left-0 w-3/4 rounded-md ml-1 mt-2  ">
            {/* Loop through menus and display them */}
            {menus.map((menu: any, index: any) => (
              <Link
                key={index} // Only apply key here on the Link element
                to={`/${menu.path}`}
                onClick={toggleMenuMobile}
                className={` shadow   text-[9px] flex justify-center   text-center  text-sm font-bold rounded-full  border-1  py-2 my-1  ${
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
              {/* <button
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
            </button> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Footer;
