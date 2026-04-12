import WindowWrapper from "@/hoc/WindowWrapper";
import WindowControls from "@/components/WindowControls";
import useWindowStore from "@/store/window";

const Text = () => {
  const data = useWindowStore((state) => state.windows.txtfile.data);

  if (!data || data.kind !== "file") return null;

  const { name, image, subtitle, description } = data;

  return (
    <>
      <div id={"window-header"}>
        <WindowControls target={"txtfile"} />
        <h2>{name}</h2>
      </div>

      <div className={"bg-white h-full overflow-auto p-6"}>
        {image && (
          <img
            src={image}
            alt={name}
            className={"w-full max-h-64 object-cover rounded mb-4"}
          />
        )}
        {subtitle && (
          <h3 className={"text-lg font-semibold mb-3"}>{subtitle}</h3>
        )}
        {description?.map((paragraph, i) => (
          <p key={i} className={"text-sm mb-3 leading-relaxed"}>
            {paragraph}
          </p>
        ))}
      </div>
    </>
  );
};

const TextWindow = WindowWrapper(Text, "txtfile");

export default TextWindow;
