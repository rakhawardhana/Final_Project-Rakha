import { combineReducers } from 'redux'


import AuthReducer from './AuthReducer'

const init_admin = {
    id: '',
    username: ''
}
const authAdminReducer = (data = init_admin,action)=>{
        switch (action.type) {
            case 'ADMIN_LOGIN_SUCCESS':
                return{
                    id: action.payload.id,
                    username: action.payload.username,
                    email: action.payload.email
                }
                
                
        
            case 'ADMIN_LOGOUT_SUCCESS':
                return{
                    ...data,
                    id:'',
                    username:'',
                    email:''
                }
                
            default:
                
                return data;
        }
    }

export default combineReducers(
    {
        auth: AuthReducer,
        admin: authAdminReducer
    }
)