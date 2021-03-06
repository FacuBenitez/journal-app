import React from 'react'
import moment from "moment";
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote, startUploading } from '../../actions/notes';


export const NotesAppBar = () => {
    const dispatch = useDispatch();
    const { active, date } = useSelector(state => state.notes);
    
    const noteDate = moment(date);
  
    const handleNoteSave = () => {
        dispatch(startSaveNote(active));
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if(file){
            dispatch(startUploading(file));
        }
    }

    const handlePictureClick = () => {
        document.querySelector('#file-input').click();
    }
    

    return (
        <div className="notes__appbar">
            <span>{ noteDate.format('dddd D')}</span>
            <input 
            type="file"
            name="file"
                id="file-input"
            style={{display: 'none'}}
            onChange={handleFileChange}
             />

            <div>
                <button className="btn"
                onClick={handlePictureClick}
                >
                    Picture
                </button>

                <button className="btn" onClick={handleNoteSave}>
                    Save
                </button>
            </div>
            
        </div>
    )
}
