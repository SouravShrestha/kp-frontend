
import SubfolderCard from "./SubfolderCard";

const SubfolderCards = ({ loading, subfolders, imagesBySubfolder }) => (
  <div className="flex flex-col mt-1 mb-16 gap-y-12 items-center">
    {loading && <div className="text-lg">Loading...</div>}
    {!loading &&
      subfolders.map((sf, idx) => (
        <SubfolderCard
          key={sf.id}
          sf={sf}
          images={imagesBySubfolder[sf.id] || []}
          reverse={idx % 2 != 1}
        />
      ))}
  </div>
);

export default SubfolderCards;
