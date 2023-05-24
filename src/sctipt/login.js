
const btnLogin = document.getElementById("btn-submit");
const message = document.getElementById("message");
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");
const btnClose = document.getElementById("btnClose");
const hideBtn = document.getElementById("hide-btn")

const uri ="http://localhost:5000/login" ;
// const uripath = 'C:\\Users\\SAM2\\Desktop\\SuperChanger Setup 1.0.4.exe';
const getdata = async ()=>{
    let data;
    var raw = JSON.stringify({
        "email": inputEmail.value,
        "password": inputPassword.value
      });
   try{
    const response  = await fetch(uri, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
        body: raw,
        });
     data = response.json();
    if(data.message === "SUCCESS"){
        window.alert('Success');
        return data;
    }
   }
    catch(error){
        console.error(error);
        // handle the error
    };
    return data;
}


const closeMessage =(e) =>{
    console.log("close click!!!")
    message.classList.add("hide");
}
const submitHandler = async (e)=>{
    e.preventDefault();
    console.log("button submit is clicked");
  
    message.classList.remove("hide");
    const data = await getdata();
    if(data && data.isLoggIn ===true) {
        
    }
}
btnLogin.addEventListener('click',submitHandler);
btnClose.addEventListener('click',closeMessage)
hideBtn.addEventListener('click', () => {
    // Find the overlay window
    const overlayWindow = window.parent.document.querySelector('#overlay-window');
    // Hide the overlay window
    overlayWindow.style.display = 'none';
  });