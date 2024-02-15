import {useEffect, useState} from "react";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../firebase";


const useIsUser = () => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (authUser) => {

            if (authUser) {
                setUser(authUser)
            } else {
                setUser(null)
            }
        })

        return () => {
            listen()
        }

    }, []);

    return user
}
export default useIsUser