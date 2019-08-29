const init = {
    id: '',
    name: ''
}

// const init_admin = {
//     id: '',
//     username: ''
// }

export default (data = init, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...data,
                id: action.payload.id,
                name: action.payload.name
            }
            
        
        case "LOGOUT_SUCCESS":
                return {
                   init
                }
        
        
        default:
            return data
    }
}


// export default (data = init_admin,action)=>{
//     switch (action.type) {
//         case 'ADMIN_LOGIN_SUCCESS':
//             return{
//                 id: action.payload.id,
//                 username: action.payload.username,
//                 email: action.payload.email
//             }
            
            
    
//         case 'ADMIN_LOGOUT_SUCCESS':
//             return{
//                 ...data,
//                 id:'',
//                 username:'',
//                 email:''
//             }
            
//         default:
            
//             return data;
//     }
// }