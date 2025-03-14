import { create } from "zustand";
import {
  layoutModeTypes,
  layoutPositionTypes,
  layoutTypes,
  layoutWidthTypes,
  leftSidebarImageTypes,
  leftSidebarTypes,
  leftSidebarViewTypes,
  leftsidbarSizeTypes,
  preloaderTypes,
  sidebarVisibilitytypes,
  topbarThemeTypes,
} from "../constants/layout";
import { changeHTMLAttribute } from "../helpers/layout-helper";

const useLayoutStore = create((set, get) => ({
  layoutType: layoutTypes.VERTICAL,
  leftSidebarType: leftSidebarTypes.DARK,
  layoutModeType: layoutModeTypes.LIGHTMODE,
  layoutWidthType: layoutWidthTypes.FLUID,
  layoutPositionType: layoutPositionTypes.FIXED,
  topbarThemeType: topbarThemeTypes.DARK,
  leftsidbarSizeType: leftsidbarSizeTypes.SMALLICON,
  leftSidebarViewType: leftSidebarViewTypes.DEFAULT,
  leftSidebarImageType: leftSidebarImageTypes.NONE,
  preloader: preloaderTypes.DISABLE,
  sidebarVisibilitytype: sidebarVisibilitytypes.HIDDEN,

  changeLayout: (value) => {
    if (value === "twocolumn") {
      document.documentElement.removeAttribute("data-layout-width");
    } else if (value === "horizontal") {
      document.documentElement.removeAttribute("data-sidebar-size");
    } else if (value === "semibox") {
      changeHTMLAttribute("data-layout-width", "fluid");
      changeHTMLAttribute("data-layout-style", "default");
    }
    changeHTMLAttribute("data-layout", value);
    set((state) => ({ layoutType: value }));
  },
  changeLayoutMode: (value) => {
    changeHTMLAttribute("data-bs-theme", value);
    set((state) => ({ layoutModeType: value }));
  },
  changeSidebarTheme: (value) => {
    changeHTMLAttribute("data-sidebar", value);
    set((state) => ({ leftSidebarType: value }));
  },
  changeLayoutWidth: (value) => {
    if (value === "lg") {
      changeHTMLAttribute("data-layout-width", "fluid");
    } else {
      changeHTMLAttribute("data-layout-width", "boxed");
    }
    set((state) => ({ layoutWidthType: value }));
  },
  changeLayoutPosition: (value) => {
    changeHTMLAttribute("data-layout-position", value);
    set((state) => ({ layoutPositionType: value }));
  },
  changeTopbarTheme: (value) => {
    changeHTMLAttribute("data-topbar", value);
    set((state) => ({ topbarThemeType: value }));
  },
  changeLeftsidebarSizeType: (value) => {
    switch (value) {
      case "lg":
        changeHTMLAttribute("data-sidebar-size", "lg");
        break;
      case "md":
        changeHTMLAttribute("data-sidebar-size", "md");
        break;
      case "sm":
        changeHTMLAttribute("data-sidebar-size", "sm");
        break;
      case "sm-hover":
        changeHTMLAttribute("data-sidebar-size", "sm-hover");
        break;
      default:
        changeHTMLAttribute("data-sidebar-size", "lg");
    }
    set((state) => ({ leftsidbarSizeType: value }));
  },
  changeLeftsidebarViewType: (value) => {
    changeHTMLAttribute("data-layout-style", value);
    set((state) => ({ leftSidebarViewType: value }));
  },
  changeSidebarImageType: (value) => {
    changeHTMLAttribute("data-sidebar-image", value);
    set((state) => ({ leftSidebarImageType: value }));
  },
  changePreLoader: (value) => {
    changeHTMLAttribute("data-preloader", value);
    set((state) => ({ preloader: value }));
  },
  changeSidebarVisibility: (value) => {
    changeHTMLAttribute("data-sidebar-visibility", value);
    set((state) => ({ sidebarVisibilitytype: value }));
  },
}));

export default useLayoutStore;
