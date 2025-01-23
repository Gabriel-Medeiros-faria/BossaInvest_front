import { useContext } from "react";
import { ScreenSizeContext } from "../context/screenContext";

export default function useScreenSize() {
    return useContext(ScreenSizeContext);
}