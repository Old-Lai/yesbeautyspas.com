import { useEffect, useState } from "react";
import { services } from "../api/services";
import { ItemCard } from "../components";
import type { Service } from "../definitions/assets";
export default function Facial() {
  const [menuItems, setMenuItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getFacialMenu();
  }, []);

  function getFacialMenu() {
    services.get.facial.all().then((items) => {
      console.log(items);
      setMenuItems(items);
      setIsLoading(false);
    });
  }
  return (
    <div>
      <h1>This is Facial</h1>
      {!isLoading &&
        menuItems?.map((item: Service) => {
          return <ItemCard item={item} key={item.id} />;
        })}
    </div>
  );
}
