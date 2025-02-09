 import { supabase } from "./configuration"; 


const apiResponse = (response:{data:any, status:number}) => { 
    const { data, status } = response
    return { 
        status: status, 
        data:data??{}
    };
}
/** 📌 CREATE: Add a new document */

export async function createDocument(body:{table:string, jsonData:string}) {
    const { jsonData,table } = body
    const { data, error } = await supabase
        .from(table)
        .insert([{ jsonData }]);
    if (error) return apiResponse({status:500, data:error});
    else return apiResponse({status:200, data:data});
}

/** 📌 READ: Get a document by ID */
export async function getDocument(table:string) {
    const { data, error } = await supabase.from(table).select();
    if (error) return apiResponse({status:500, data:error});
    else return apiResponse({status:200, data:data});
}

/** 📌 UPDATE: Update a document */
export async function updateDocument(id:number, record:any) {
    const { data, error } = await supabase
        .from("quiz")
        .update(record)
        .eq("id", id);

    if (error) apiResponse({status:500, data:error});
    else apiResponse({status:200, data:{message:'Record updated successfully'  }});
}

/** 📌 DELETE: Delete a document */
export async function deleteDocument(id:number) {
    const { error } = await supabase.from("quiz").delete().eq("id", id);
    if (error) return apiResponse({status:500, data:error});
    else return apiResponse({status:200, data:{message:'Record deleted successfully'}});
}

/** ✅ Example Usaxx     sgdhdsgdsgdsge */
// createDocument("users", { name: "John Doe", age: 25 });
// getDocument("users", "YOUR_DOC_ID");
// updateDocument("users", "YOUR_DOC_ID", { age: 30 });
// deleteDocument("users", "34");


// 📌 Create a new document
