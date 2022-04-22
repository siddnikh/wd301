import { navigate } from "raviger";
import React, { useEffect } from "react";
import { logout } from "../utils/loginUtils";

export default function Logout(){ 

    useEffect(() => {
        logout();
        navigate("/");
        window.location.reload();
    })

    return(
        <></>
    )
}