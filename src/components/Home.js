import React from 'react'
import Footer from '../components/Footer'
const Home = () => {

    return (
        <div>
            Home : {localStorage.getItem("username")} - {localStorage.getItem("grade")} - {localStorage.getItem("access_token")}
        </div>
    );
};

export default Home;








//     handleClick(){
        
//         // var config = {
//         //     responseType:'blob',
//         //     headers: {"Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJDSEVGIERTSSAxIiwicm9sZXMiOlsiRFBJIl0sImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9sb2dpbiIsImV4cCI6MTY1NzU0NjU5OX0.rxT0gfc9OLioiuTFAyeVZDpXDwn5eXUqFA7fu0l995M"}
//         // }
//         // axios.get("http://localhost:8000/file/3dae3d6a-ce39-4c30-a0d5-d45242ed8bfcDsiValidation.pdf", config)
//         // .then((response) => {
//             // let url = window.URL.createObjectURL(response.data);
//             // let a = document.createElement('a');
//             // a.href = url;
//             // a.download = '3dae3d6a-ce39-4c30-a0d5-d45242ed8bfcDsiValidation.pdf';
//             // a.click();
//             // this.setState({
//             //   isLoading:false
//             // })
//             // window.location.href = response.url;
//             // const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJDSEVGIERTSSAxIiwicm9sZXMiOlsiRFBJIl0sImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9sb2dpbiIsImV4cCI6MTY1NzU0ODk0OX0.ohdq_7P9gJZX215ACP1m8pdO9MMHTDOAY9qm4xEWAWk";
//             // const decoded = jwtDecode(token);
//         // })
//         // .catch((error)=>{
//         //     if(error.response.status === 403){
//         //         this.setState({
//         //             isAllowed:false
//         //         })
//         //     }
//         // })
//     }