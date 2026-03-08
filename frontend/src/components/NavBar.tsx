type MENU_CATEGORY = {
  name: string;
  subCategory?: string[];
};

export default function NavBar() {
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
  return (
    <div className="h-full w-full">
      <ul className="">
        {MENU_CATEGORY.map((category) => {
          if (category.subCategory)
            return (
              <li>
                {category.name}
                <ul>
                  {category.subCategory.map((subCategoryName) => {
                    return <li>{subCategoryName}</li>;
                  })}
                </ul>
              </li>
            );
          return <li>{category.name}</li>;
        })}
      </ul>
    </div>
  );
}
