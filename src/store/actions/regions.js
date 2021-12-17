const getRegions = (data) => {
   // console.log(data);
    return ({
        type: "REGIONS",
        payload: data,
    })
}
export default getRegions;