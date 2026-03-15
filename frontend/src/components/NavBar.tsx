import { Bars3Icon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function NavBar() {
  const [hambergerMenuToggle, setHambergerMenuToggle] = useState(false);
  const navigate = useNavigate();

  const handleNavClick = (target: EventTarget & HTMLButtonElement) => {
    console.log(target.ariaLabel);
    navigate(target.ariaLabel);
  };

  const handleHambergerToggleClick = () => {
    setHambergerMenuToggle(!hambergerMenuToggle);
  };

  return (
    <>
      <div
        className={`${hambergerMenuToggle ? "overflow-visible" : "overflow-x-clip"} h-full w-full lg:hidden`}
      >
        <div className="flex w-full items-center justify-between">
          <p className="flex-1 pl-16 text-lg">YesBeautySpas</p>
          <button
            className={`${hambergerMenuToggle && "bg-amber-300"} z-30 p-4`}
            onClick={handleHambergerToggleClick}
          >
            <Bars3Icon className="h-8" />
          </button>
        </div>

        <div
          className={`${hambergerMenuToggle ? "left-0 opacity-100" : "left-full opacity-0"} relative z-20 h-[calc(100vh-4rem)] w-full bg-gray-700 transition-all duration-500`}
        >
          <ul className={`relative top-5`}>
            {MENU_CATEGORY.map((category) => {
              if (category.subCategory)
                return (
                  <li key={category.name}>
                    <div className="flex justify-center">
                      <button
                        aria-label={category.page}
                        className={`${navButtonStyles}`}
                        onClick={(e) => handleNavClick(e.currentTarget)}
                      >
                        {category.name}
                      </button>
                      <button className={`bg-amber-300 ${navButtonStyles} `}>
                        <ChevronDownIcon className="h-5" />
                      </button>
                    </div>

                    <ul>
                      {category.subCategory.map((subCategoryObj) => {
                        return (
                          <li key={subCategoryObj.name}>
                            <button
                              aria-label={subCategoryObj.page}
                              className={`${navButtonStyles} ${subNavButtonStyles}`}
                              onClick={(e) => handleNavClick(e.currentTarget)}
                            >
                              {subCategoryObj.name}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              return (
                <li key={category.name}>
                  <button
                    aria-label={category.page}
                    className={`${navButtonStyles}`}
                    onClick={(e) => handleNavClick(e.currentTarget)}
                  >
                    {category.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {/* Desktop view */}
      <div className="hidden h-full w-full lg:flex">
        <p className="flex items-center justify-center pl-16 text-lg">
          YesBeautySpas
        </p>
        <ul className={`flex`}>
          {MENU_CATEGORY.map((category) => {
            if (category.subCategory)
              return (
                <li key={category.name}>
                  <button
                    aria-label={category.page}
                    className={`${navButtonStyles}`}
                    onClick={(e) => handleNavClick(e.currentTarget)}
                  >
                    {category.name}
                  </button>

                  <ul>
                    {category.subCategory.map((subCategoryObj) => {
                      return (
                        <li key={subCategoryObj.name}>
                          <button
                            aria-label={subCategoryObj.page}
                            className={`${navButtonStyles} ${subNavButtonStyles}`}
                            onClick={(e) => handleNavClick(e.currentTarget)}
                          >
                            {subCategoryObj.name}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            return (
              <li key={category.name}>
                <button
                  aria-label={category.page}
                  className={`${navButtonStyles}`}
                  onClick={(e) => handleNavClick(e.currentTarget)}
                >
                  {category.name}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

type MENU_CATEGORY = {
  name: string;
  page: string;
  subCategory?: MENU_CATEGORY[];
};

const MENU_CATEGORY: MENU_CATEGORY[] = [
  {
    name: "Facial",
    page: "/facial",
    subCategory: [
      { name: "Signiture Facial Treatments", page: "/facial" },
      { name: "Luxury Facial Treatments", page: "/facial" },
      { name: "Advanced Facial Treatments", page: "/facial" },
      { name: "Add-on & Enhancements", page: "/facial" },
    ],
  },
  {
    name: "Lash & Brow",
    page: "/lashes",
  },
  {
    name: "Massage Therapy",
    page: "/massage",
  },
  {
    name: "Head Spa",
    page: "/headspa",
  },
];

const navButtonStyles = "p-3 my-2  lg:bg-amber-500 transition-all";
const subNavButtonStyles = "";
