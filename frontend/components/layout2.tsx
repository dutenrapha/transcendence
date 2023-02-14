
import { FC, ReactNode } from "react";
//import Footer from "./footer";
//import Navbar from "./navbar";

interface Props {
    children: ReactNode
}

const Layout2: FC<Props> = ({ children }: { children: ReactNode }) => {
    return (
        <div className="content">
            {children}
        </div>

    );
}

export default Layout2;
