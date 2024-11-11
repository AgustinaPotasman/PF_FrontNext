"use client";

import { UserContext } from "../UserContext"
import { useRouter } from "next/navigation"
import { useContext } from "react";

export const ProtectedRoutes = ({ children }) => {
    const router = useRouter();
    const { isLoggedIn } = useContext(UserContext);

    if (!isLoggedIn && !router.pathname !== "/Login" && !router.pathname !== "/Registro") {
        return (<h2>Acceso Restringido</h2>)
    }

    return children;
}