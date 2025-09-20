export const resForErrors= (res, status)=>{
    return res.status(status).json({message: "An error occured."});
}
export const resForSuccess= (res, status, data)=>{
    return res.status(status).json({message: "Success.", ...data});
}