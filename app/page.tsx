"use client";
import { useState } from "react";
import ReactGridLayout, {
  Responsive,
  WidthProvider,
  type Layout,
} from "react-grid-layout";
import InputComponent from "@/components/counter";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import styles from "./page.module.css";

// Adding WidthProvider to ResponsiveGridLayout to manage layout width
const ResponsiveGridLayout = WidthProvider(Responsive);

// Default layout configuration for each grid item
const defaultLayout = {
  w: 6,
  h: 25,
  minW: 1,
  minH: 1,
  isDraggable: false,
  isResizable: true,
  resizeHandles: [
    "s",
    "e",
    "w",
    "n",
    "ne",
    "nw",
    "sw",
    "se",
  ] as ReactGridLayout.ReactGridLayoutProps["resizeHandles"],
  isBounded: true,
};

// Initial layout settings for grid items
const initialLayout = [
  { ...defaultLayout, i: "1", x: 0, y: 0 },
  { ...defaultLayout, i: "2", x: 6, y: 0 },
  { ...defaultLayout, i: "3", x: 0, y: 25, w: 12 },
];

export default function Index() {
  const [layouts, setLayouts] = useState<Record<string, Layout[]>>({
    lg: initialLayout,
    md: initialLayout,
    sm: initialLayout,
    xs: initialLayout,
    xxs: initialLayout,
  });
  const maxCols = 12;
  const maxRows = 50;
  const horizontalItems = ["1", "2"];

  return (
    <div>
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{
          lg: maxCols,
          md: maxCols,
          sm: maxCols,
          xs: maxCols,
          xxs: maxCols,
        }}
        compactType={"horizontal"}
        rowHeight={10}
        isBounded={true}
        maxRows={maxRows}
        onResizeStop={(newLayout, oldItem, newItem) => {
          // Adjust layout heights for horizontal and vertical items after resizing
          const heightForHorizontalItems =
            newItem.i === "3" ? maxRows - newItem.h : newItem.h;
          const heightForVerticalItems = maxRows - heightForHorizontalItems;
          const updatedLayout = newLayout.map((item) => {
            if (horizontalItems.includes(newItem.i)) {
              if (horizontalItems.includes(item.i)) {
                item.h = heightForHorizontalItems;
                item.y = 0;
              }
              const otherItem = newLayout.find(
                (el) => el.i !== newItem.i && horizontalItems.includes(el.i)
              );
              if (otherItem) {
                otherItem.w = maxCols - newItem.w;
                if ((newItem.i === "2" || newItem.i === "1") && item.i === "2")
                  item.x = otherItem.w;
              }
              if (item.i === "3") {
                item.y = heightForHorizontalItems;
                item.h = heightForVerticalItems;
              }
            }
            if (newItem.i === "3") {
              if (item.i === "3") {
                item.h = heightForVerticalItems;
                item.y = heightForHorizontalItems;
              }
              if (horizontalItems.includes(item.i)) {
                item.h = heightForHorizontalItems;
                item.y = 0;
              }
            }
            return item;
          });
          // Update layouts for all breakpoints
          setLayouts({
            lg: updatedLayout,
            md: updatedLayout,
            sm: updatedLayout,
            xs: updatedLayout,
            xxs: updatedLayout,
          });
        }}
      >
        <div key="1" className={styles.resizableDiv}>
          <InputComponent id="1" />
        </div>
        <div key="2" className={styles.resizableDiv}>
          <InputComponent id="2" />
        </div>
        <div key="3" className={styles.resizableDiv}>
          <InputComponent id="3" />
        </div>
      </ResponsiveGridLayout>
    </div>
  );
}
