import React, { ReactNode } from "react"
import "./Layouts.css";
import NavBar from "../nav/NavBar";
import Footer from "../footer/Footer";


interface LayoutProps {
  children: ReactNode;
}

export default function Layout(props: LayoutProps) {
  return(
    <div>
      <NavBar />
      <div className="container-fluid mt-2">
        {props.children}
      </div>
      <Footer />
    </div>
  );
}
