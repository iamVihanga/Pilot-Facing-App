import { createRoot } from "react-dom/client";

const el = document.createElement("div");
el.className = "marker";

const root = createRoot(el);
root.render(
  <div className="w-8 h-8 bg-white p-[0.4rem] rounded-full shadow-lg">
    <div className="w-full h-full bg-primaryBlue rounded-full" />
  </div>
);

export default el;
