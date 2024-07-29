import axios from "axios";
import { useState } from "react";
export default function PhotosUploader({addedPhotos,onChange}) {
    const[photoLink,setPhotoLink] = useState('');

    async function addPhotoByLink(ev){
        ev.preventDefault();
        const {data:filename} =  await axios.post('/upload-by-link' ,{link: photoLink});
        onChange(prev =>{ 
          return [...prev, filename];
        })
        setPhotoLink('');
      }
      function uploadPhoto(ev){
        const files = ev.target.files;
        const data = new FormData();
        for(var i=0;i<files.length;i++){
          data.append('photos',files[i]);
        }
        axios.post('/upload',data,{
          headers:{'Content-Type':'multipart/form-data'}
        }).then(response => {
            const {data:filenames} = response;
            console.log(data);
            onChange(prev =>{
              return [...prev, ...filenames];
            })
        });
      }

      function removePhoto(ev,filename){
        ev.preventDefault();
         onChange([...addedPhotos.filter(photo => photo!== filename)]);
      }
      function selectMain(ev,filename){
        ev.preventDefault();
         onChange([filename,...addedPhotos.filter(photo => photo!== filename)]);
      }

  return (
    <>
    <div className="gap-2 flex">
                <input type="text" value={photoLink} onChange={ev => setPhotoLink(ev.target.value)} placeholder={'Add Using a Link ....jpg'} />
                <button onClick={addPhotoByLink} className="px-4 primary">Add Photo</button>
              </div>
              <div className="mt-2 gap-2 grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6">
                {addedPhotos.length>0 && addedPhotos.map(link =>(
                  <div className="h-32 flex relative" key={link}>
                    <img className="rounded-2xl w-full object-cover" src={"http://localhost:4000/uploads/" + link} alt="Photo1" />
                    <button onClick={ev => removePhoto(ev,link)} className=" cursor-pointer absolute bottom-0 right-0 p-1 m-1 text-black bg-opacity-90 rounded-2xl ">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    </button>
                    <button onClick={ev => selectMain(ev,link)} className=" cursor-pointer absolute mb-0 m-1 bottom-1 left-1 p-1 text-black bg-opacity-90 rounded-2xl ">
                      {link === addedPhotos[0] && (          
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                      )}
                      {link !== addedPhotos[0] && (          
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                      )}
                    </button>
                  </div>
                ))}
                <label className="h-32 cursor-pointer items-center primary bg-transparent rounded-full p-8 text-xl flex justify-center gap-1 ">
                 <input type="file" multiple className="hidden" onChange={uploadPhoto} />
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
                </svg>
                Upload
              </label>
    </div>
    </>
    )
}
