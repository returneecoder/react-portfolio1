import { useRef,useState,useEffect } from 'react';
import { getAuth,onAuthStateChanged} from 'firebase/auth'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {db} from '../../firebase'
import {useNavigate} from 'react-router-dom'
import { addDoc,collection } from 'firebase/firestore';


const Dashboard = () => {
  const auth = getAuth()
  const navigate = useNavigate()
  const isMounted = useRef(true)
  const [formData,setFormData] = useState({
    name:'',
    description:'',
    url :'',
    images:{},
  })
  const form = useRef();
  /* const {name,description,url,images} = formData */
 


useEffect(()=>{
  if(isMounted){
    onAuthStateChanged(auth,(user) =>{
      if(user){
        setFormData({...formData,userRef:user.uid})
      }
      else {
        navigate('/')
      }
      })
  }
  return ()=>{
    isMounted.current= false
  }
},[isMounted])

const onMutate = (e) => {
  let boolean = null;

  if (e.target.value === "true") {
    boolean = true;
  }
  if (e.target.value === "false") {
    boolean = false;
  }
  // Files
  if (e.target.files) {
    setFormData((prevState) => ({
      ...prevState,
      images: e.target.files,
    }));
  }

  // Text/Booleans/Numbers
  if (!e.target.files) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: boolean ?? e.target.value,
    }));
  }
};
const submitPortfolio = (e) => {
  e.preventDefault();
  const name = form.current[0]?.value;
  const description = form.current[1]?.value;
  const url = form.current[2]?.value;
  const image = form.current[3]?.files[0];
  const storage = getStorage();
  const storageRef = ref(storage, `portfolio/${image.name}`);

  uploadBytesResumable(storageRef, image).then(
      (snapshot) => {
          getDownloadURL(snapshot.ref).then((downloadUrl) => {
              savePortfolio({
                  name,
                  description,
                  url,
                  image: downloadUrl
              })
          }, (error) => {
              console.log(error);
              savePortfolio({
                  name,
                  description,
                  url,
                  image: null
              })
          })
      }, (error) => {
          console.log(error);
          savePortfolio({
              name,
              description,
              url,
              image: null
          })
      }
  )
}

const savePortfolio = async (portfolio) => {
  try {
      await addDoc(collection(db, 'portfolio'), portfolio);
      window.location.reload(false);
  } catch (error) {
      alert('Failed to add portfolio');
  }
}

    
   /*  return (
      <div className="dashboard">

          <form ref={form} onSubmit={submitPortfolio}>
            <label > Name</label>
              <input type="text" id="name" value={name} required 
              onChange={onMutate}/>
              <p><textarea  type ="text" id ="description" value ={description} onChange={onMutate}     required placeholder="Description" /></p>
              <p><input type="text" placeholder="Url" id ="url" onChange ={onMutate} value={url} /></p>
              <label>Images</label>
              <p><input type="file" id="images" onChange={onMutate} accept = '.jpg,.png,jpeg' required placeholder="Image" /></p>
              <button type="submit">Submit</button>
              <button onClick={() => auth.signOut()}>Sign out</button>
          </form>
      </div>
  ) */
  return (
    <div className="dashboard">

        <form ref={form} onSubmit={submitPortfolio}>
            <p><input type="text" placeholder="Name" /></p>
            <p><textarea placeholder="Description" /></p>
            <p><input type="text" placeholder="Url" /></p>
            <p><input type="file" placeholder="Image" /></p>
            <button type="submit">Submit</button>
            <button onClick={() => auth.signOut()}>Sign out</button>
        </form>
    </div>
)
}

export default Dashboard;