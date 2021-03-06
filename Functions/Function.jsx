import axios from "axios";
import {Fetch,Axios,AxiosOutSystem} from "./Fetch";


//-------------------------------------user------------------------------------
export const  Get_userDetails=(email,password)=>{
  return Fetch( `User/userDetails/${email}/${password}`,'Get');
}
export const  GetLastBloodTest=(id)=>{
  return Fetch( `User/GetLastBloodTest/${id}/`,'Get');
}
export const  Get_all_InsulinType=()=>{
  return Fetch( `User/getInsulinType`,'Get');
}
export const  GetInjectionRecommend=(id,blood_sugar_level,injectionType)=>{
  return Fetch( `User/GetInjectionRecommend/${id}/${blood_sugar_level}/${injectionType}`,'Get');
}
export const  Rest_password=(email)=>{
  return Fetch( `User/getPassword/${email}`,'Get');
}
export const  GETpersonalInfoToEdit=(id)=>{
  return Fetch( `User/editPersonalInfo/${id}`,'Get');
}
export const  set_password=(body)=>{
  return Axios( `User/setNewpassword`,'PUT',body);
}
export const  Post_user_data=(body)=>{
  return Axios( `User/InsertData`,'POST',body);
}
export const  Post_user_details=(body)=>{
  return Axios( `User/RegisterUser`,'POST',body);
}
export const  Put_EditPersonalInfo=(id,body)=>{
  return Axios( `User/PutPersonalInfo/${id}`,'PUT',body);
}

//----------------------------------Home doctor--------------------------------

export const  Get_doctor_patients=(id)=>{
  return Fetch( `User/Doctor/${id}`,'Get');
}

//-----------------------------------Home(for patient)-------------------------
export const post_pushToken=(id,body)=>{
  return Axios(`User/addToken/${id}`,'POST',body)
}

//----------------------------------Insert Data--------------------------------
export const  Post_SendPushNotification=(body)=>{
  return Axios( `sendpushnotification`,'POST',body);
}
export const  Get_all_ExceptionalEvent=()=>{
  return Fetch(`User/Get_all_ExceptionalEvent`,'Get');
}

//-------------------------------------Forum-----------------------------------
export const  Delete_Comment=(comment_id)=>{
  return Fetch(`forum/Delete/${comment_id}`,'Delete');
}
export const  Get_all_comments=()=>{
  return Fetch(`forum`,'Get');
}
export const  Get_all_subjects=()=>{
  return Fetch(`forum/GetAllsubjects`,'Get');
}
export const  Post_Comment=(body)=>{
  return Axios( `forum/addComment`,'POST',body);
}
export const  Put_Comment=(id,body)=>{
  return Axios( `Forum/${id}`,'PUT',body);
}
//-------------------------------------Food------------------------------------

export const  Get_all_food=(id,name)=>{
  return Fetch(`Food/${name}/all/${id}`,'Get');
}
export const  Get_all_categories=()=>{
  return Fetch(`Food/Category`,'Get');
}
export const  Get_all_unit=()=>{
  return Fetch(`Food/getUnitOfMeasure`,'Get');
}
export const  Serch_food=(serchName,id,name)=>{
  return Fetch(`Food/${name}/${serchName}/${id}`,'Get');
}
export const  Delete_food=(name,id)=>{
  return Fetch(`Food/${name}/${id}`,'Delete');
}
export const  Post_Food=(name,body)=>{
  return Axios( `Food/${name}`,'POST',body);
}
export const  Post_Favorites=(method,body)=>{
  return Axios( `Food/${method == 'POST' ? 'addFavorites' : 'deleteFavorites'}`,method,body);
}
export const  Post_unit=(id,body)=>{
  return Axios( `food/addunit/${id}`,'POST',body);
}

//---------------------------------patient Data table---------------------------
export const  Get_Table_Data=(userDetails_id,fromDate,toDate)=>{
  return Fetch(`User/GetdataForTable/${userDetails_id}/${fromDate}/${toDate}`,'GET');
}
export const  more_details_PD=(id,dateTime,)=>{
  console.log(`User/more_details_PD/${id}/${dateTime}`)
  return Fetch(`User/more_details_PD/${id}/${dateTime}`,'GET');
}

export const Delete_line_tableData=(time,user_id)=>{
  return Fetch(`User/deleteTableRow/${time}/${user_id}`,'Delete');
  }

  export const Put_line_tableData=(body)=>{
    return Axios(`User/updateTableRow`,'PUT',body);
    }

//-------------------------------patient Data------------------------------------
export const  Get_graphs_details=(userDetails_id)=>{
  return Fetch(`User/GetdataForGraphs/${userDetails_id}`,'GET');
}
//-------------------------------Prescriptions------------------------------------
export const  Get_Prescriptions=(userDetails_id)=>{
  return Fetch(`User/Prescription/${userDetails_id}`,'GET');
}
export const  Delete_Prescriptions=(userDetails_id)=>{
  return Fetch(`User/Prescription/Delete/${userDetails_id}`,'Delete');
}
export const  Post_new_Prescription=(body)=>{
  return Axios(`User/Prescription/addRequest`,'POST',body);
}
export const  Put_Prescription=(id,body)=>{
  return Axios(`User/Prescription/${id}`,'PUT',body);
}
//----------------------------------panic Button------------------------------------
export const  GET_assistant_phone=(userDetails_id)=>{
  return Fetch(`User/assistant_phone/${userDetails_id}`,'GET');
}

export const POST_EmergancyPhoneNumber=(id,number)=>{
  return Axios(`User/assistant_phone/${id}/${number}`,'POST');
}
//---------------------------------maps-----------------------
export const  Get_api_google_key=()=>{
  return Fetch(`User/HistoryLog/googleKey`,'GET');
}
//---------------------------------recommandtion-----------------------
export const get_food_for_hipo=(user_id)=>{
  return Fetch(`Food/hipoRecomendtion/${user_id}`)
}
export const get_recommandtion_food=(user_id)=>{
  return Fetch(`Food/foodRecomendtion/${user_id}`)
}
//---------------------------------information-----------------------
export const get_alerts=(user_id)=>{
  return Fetch(`User/alert/${user_id}`)
}
export const  readAlert=(id)=>{
  return Fetch(`User/readAlert/${id}`,'GET');
}
export const  sendAdminReport=(body)=>{
  return Axios(`User/setAdminReport`,'POST',body);
}

//--------------------------------------ML-----------------------
export const InjectionRecommendByML=(body)=>{
  return AxiosOutSystem(`https://diabeasyml.herokuapp.com/predict`,'POST',body);
}