import { useState } from "react";
import { BiCaretDownCircle, BiCaretRightCircle } from "react-icons/bi";

const ExpandablePanel = ({ header, children }) => {
  const [expanded, setExpaned] = useState(false);
    const handleClick = () => {
        setExpaned(!expanded);
  }
  return (
    <div className="mb-2 border rounded">
      <div className="flex p-2 justify-between items-center">
        <div className="flex flex-row items-center justify-between">
          {header}
              </div>
              <div onClick={handleClick} className="cursor-pointer">
                  {expanded ? <BiCaretDownCircle /> : <BiCaretRightCircle />}
                  </div>
          </div>
          {expanded&&<div className="p-2 border-t">{children}</div>}
    </div>
  );
};

export default ExpandablePanel;
