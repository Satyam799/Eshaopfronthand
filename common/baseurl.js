import { Platform } from "react-native";


const baseurl=Platform.OS==='android'? 'http//10.0.2.2:3000/api/v1':'http://localhost:3000/api/v1'

export default baseurl


