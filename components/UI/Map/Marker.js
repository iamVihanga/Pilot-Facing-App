import { createRoot } from "react-dom/client";

let el;

el = document.createElement("div");
el.className = "marker";

const root = createRoot(el);
root.render(
  <div className="marker-bg w-8 h-8 bg-white p-[0.4rem] rounded-full shadow-lg">
    <div className="marker-inner w-full h-full bg-primaryBlue rounded-full" />
  </div>
);

export default el;
