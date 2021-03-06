
import { firebase, googleAuthProvider } from '../firebase/firabase-config';
import { types } from '../types/types'
import { uiFinishLoading, uiStartLoading } from './ui';
import Swal from 'sweetalert2'
import { noteLogout } from './notes';
export const startLoginEmailPassword = (email, password) => {
    
    return(dispatch)=>{
        dispatch( uiStartLoading() );

        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(({user})=>{
           dispatch(login(user.uid, user.displayName))

           dispatch( uiFinishLoading() ); 

        }).catch(err=>{
            dispatch( uiFinishLoading() );
            Swal.fire( 'Error', err.message, 'error')
        })
       
    }
};

export const startGoogleLogin = () => {

    return async(dispatch)=>{
       await firebase.auth().signInWithPopup(googleAuthProvider)
            .then(({user})=>{
                dispatch(
                    login(user.uid, user.displayName)
                )
            }).catch(err=>{
                Swal.fire( 'Error', err.message, 'error')
            })
    }
}

export const startRegisterWithEmailPasswordName = (name, email, password) => {
    return(dispatch)=>{


        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async ({user})=>{
                
               await user.updateProfile({displayName: name});

               dispatch(
                   login(user.uid, user.displayName)
               )
            })
            .catch(err=>{
                console.log(err);
                
            })
    }
}

export const login = (uid,displayName) => ({
        type: types.login,
        payload:{   
           
            uid,
            displayName
        }
})

export const startLogout = () => {
    return async(dispatch)=>{
       await firebase.auth().signOut()
      
       dispatch(logout())
       dispatch(noteLogout())
    }
}

export const logout = () => ({
    type: types.logout,
})