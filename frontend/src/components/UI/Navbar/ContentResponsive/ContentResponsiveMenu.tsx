import { useState } from "react";
import ButtonMenu from "./ButtonMenu";
import SidebarMenu from "./SidebarMenu";

export default function ContentResponsiveMenu() {
    const [isActive,setIsActive] = useState<boolean>(false);
  return (
    <div className="">
      <ButtonMenu setIsActive={setIsActive}/>
      <SidebarMenu setIsActive={setIsActive} isActive={isActive}/>
    </div>
  );
}
