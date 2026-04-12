import type { Service } from "../definitions/assets";
interface ItemCardProps {
  className?: string;
  item: Service;
}
export default function ItemCard({ className, item }: Readonly<ItemCardProps>) {
  return (
    <div
      className={`${className} m-5 my-10 overflow-clip bg-slate-700 p-7 text-left`}
    >
      <div className="scro flex overflow-scroll">
        {item.tags.length > 0 &&
          item.tags.map((tag) => {
            return (
              <div
                key={tag}
                className="mr-3 mb-3 bg-amber-300 px-1 py-0.5 text-sm text-nowrap"
              >
                {tag}
              </div>
            );
          })}
      </div>
      <div className="mb-3 text-3xl">{item.displayName}</div>
      <div className="h-15 overflow-scroll">{item.description}</div>
      <div>{item.totalDuration} minutes</div>
      <div>{item.price}</div>

      <div>{item.subCategoryName}</div>
    </div>
  );
}
