import s from "./components/AuthDetails/AuthDetails.module.css";
import Button from "@mui/material/Button";
import SideBar from "./components/SlideBar/SideBar";
import React, {useEffect, useState} from "react";
import useIsUser from "./components/customHook";
import {useNavigate} from "react-router-dom";
import {onValue, ref} from "firebase/database";
import {db} from "./firebase";


const MainLayout = ({children}) => {

    const [activeUser, setActiveUser] = useState(undefined)
    const [photo, setPhoto] = useState(null)
    const [name, setName] = useState(null)
    const [surname, setSurname] = useState(null)
    const navigate = useNavigate()

    const user = useIsUser()


    useEffect(() => {

        const dataRef = ref(db, '/users')
        onValue(dataRef, (snapshot) => {
            const data = snapshot.val()
            if (data != null) {
                const activeUser = Object.values(data).find(({email}) => email === user?.email)
                setActiveUser(activeUser)
                setPhoto(activeUser.imageUrl)
                setName(activeUser.name)
                setSurname(activeUser.surname)
            }
        })
    }, [user])


    return (

        <div className={s.boxAll}>
            {!user && <div className={s.button}>
                <Button margin="dense" size='small' variant="contained"
                        onClick={() => navigate('/')}> Log In </Button>
            </div>
            }
            {user && <> <SideBar photo={photo} name={name} surname={surname}/>
                {children}

            </>}

        </div>


    )

}
export default MainLayout