"use client"; // <--- INDICAMOS QUE ES UN CLIENT COMPONENT
import {store} from "@/store/store";
import {Provider} from "react-redux";

export function Providers({children}: {children: React.ReactNode}) {
  return <Provider store={store}>{children}</Provider>;
}
