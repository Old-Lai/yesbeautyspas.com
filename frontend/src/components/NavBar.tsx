export default function NavBar() {
  return (
    <div className="h-full w-full">
      <ul>
        {MENU_CATEGORY.map((category) => {
          if (category.subCategory)
            return (
              <li key={category.name}>
                <button className={`${navButtonStyles}`}>
                  {category.name}
                </button>

                <ul>
                  {category.subCategory.map((subCategoryName) => {
                    return (
                      <li key={subCategoryName}>
                        <button
                          className={`${navButtonStyles} ${subNavButtonStyles}`}
                        >
                          {subCategoryName}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          return (
            <li key={category.name}>
              <button className={`${navButtonStyles}`}>{category.name}</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

type MENU_CATEGORY = {
  name: string;
  subCategory?: string[];
};

const MENU_CATEGORY: MENU_CATEGORY[] = [
  {
    name: "Facial",
    subCategory: [
      "Signiture Facial Treatments",
      "Luxury Facial Treatments",
      "Advanced Facial Treatments",
      "Add-on & Enhancements",
    ],
  },
  {
    name: "Lash & Brow",
  },
  {
    name: "Massage Therapy",
  },
  {
    name: "Head Spa",
  },
];

const navButtonStyles = "p-3";
const subNavButtonStyles = "hidden";
