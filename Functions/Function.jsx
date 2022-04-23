import {Fetch,Axios} from "./Fetch";


//-------------------------------------user------------------------------------
export const  Get_userDetails=(email,password)=>{
  return Fetch( `User/userDetails/${email}/${password}`,'Get');
}
export const  Get_all_InsulinType=()=>{
  return Fetch( `User/getInsulinType`,'Get');
}
export const  Rest_password=(email)=>{
  return Fetch( `User/getPassword/${email}`,'Get');
}
export const  Post_user_data=(body)=>{
  return Axios( `User/InsertData`,'POST',body);
}
export const  Post_user_details=(body)=>{
  return Axios( `User/RegisterUser`,'POST',body);
}
//----------------------------------Home doctor--------------------------------

export const  Get_doctor_patients=(id)=>{
  return Fetch( `User/Doctor/${id}`,'Get');
}
//----------------------------------Insert Data--------------------------------


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

export const Delete_line_tableData=(time)=>{
  return Fetch(`User/deleteTableRow/${time}`,'Delete');
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

