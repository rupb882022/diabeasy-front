import {Fetch} from "./Fetch";


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



//---------------------------------patient Data table---------------------------
export const  Get_Table_Data=(userDetails_id)=>{
  return Fetch(`User/GetdataForTable/${userDetails_id}`,'GET');
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
//----------------------------------panic Button------------------------------------
export const  GET_assistant_phone=(userDetails_id)=>{
  return Fetch(`User/assistant_phone/${userDetails_id}`,'GET');
}

