import WindowWrapper from "@/hoc/WindowWrapper";
import WindowControls from "@/components/WindowControls";
import useWindowStore from "@/store/window";

const Image = () => {
  const data = useWindowStore((state) => state.windows.imgfile.data);

  if (!data || data.kind !== "file" || !data.imageUrl) return null;

  const { name, imageUrl } = data;

  return (
    <>
      <div id={"window-header"}>
        <WindowControls target={"imgfile"} />
        <h2>{name}</h2>
      </div>

      <div className={"bg-white h-full overflow-auto p-6"}>
        <img
          src={imageUrl}
          alt={name}
          className={"w-full h-auto object-contain"}
        />
      </div>
    </>
  );
};

const ImageWindow = WindowWrapper(Image, "imgfile");

export default ImageWindow;
