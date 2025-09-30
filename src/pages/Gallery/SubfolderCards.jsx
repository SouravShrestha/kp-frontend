
import ImagePlaceholder from "../../components/ImagePlaceholder";
import SubfolderCard from "./SubfolderCard";

const SubfolderCards = ({ loading, subfolders, imagesBySubfolder }) => (
  <div className="flex flex-col mb-16 gap-y-12 items-center">
    {loading && (
      <div className="h-[518px] w-full flex items-center justify-center border-borderColor border-b-0 bg-colorSecondary">
        <ImagePlaceholder />
      </div>
    )}
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
