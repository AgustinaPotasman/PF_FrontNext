"use client";

import { UserContext } from "../UserContext";
import { useContext, useEffect } from "react";

export const ProtectedRoutes = ({ children }) => {
    const { isLoggedIn } = useContext(UserContext);

   

    return children;
};
