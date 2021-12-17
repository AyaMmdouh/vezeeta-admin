import { Container, Button } from 'react-bootstrap';
import './AddRegion.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getRegions from '../../store/actions/regions';
export default function AddRegion(props) {
    const [region, setRegion] = useState();
    const [newRegion, setNewRegion] = useState({});
    const city= useSelector(state => state.city.city);
    console.log(city)
    //const [isAdded, setIsAdded] = useState(false);
    const [id, setId] = useState(props.id);
    const dispatch = useDispatch();
    //  console.log(id);
    const res = useSelector(state => state.regions.regions);
    useEffect(() => {
        getAllRegion();
        console.log(id)
    }, [res])

    const getAllRegion = async () => {
        if (id) {
            await setRegion(res);
        }
    }
    const handelRegionInput = (e) => {
        setNewRegion({
            namear: e.target.value
        })
        console.log(newRegion)
    }
    const addNew = async () => {
        const regionsList = region?.slice();
        regionsList?.push(newRegion);
        console.log(regionsList)
        setRegion([...region, newRegion])
      //  dispatch(getRegions(regionsList));
        setNewRegion({
            namear: ""
        })
        //  setIsAdded(!isAdded);
    }
    return (

        <>
            <Container >
                <div className="taged-textbox form-group">
                    <label className="taged-textbox__lable m-2 fw-bold fs-5 text-danger" htmlFor="">Regions</label>
                    <div className="taged-textbox__data">
                        <div className="taged-textbox__tags">
                            {region?.map((region) => {
                                return (<div className="taged-textbox__tag" key={region.namear} ><span>{region.namear}</span><a href="#" className="taged-textbox__remove"><i
                                    className="fas fa-times"><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></i></a>
                                </div>)
                            })}
                        </div>
                        <div className="taged-textbox__clear">
                            <a href="#"><i className="fas fa-times"></i></a>
                        </div>
                    </div>
                    <input className="taged-textbox__textbox form-control" type="text" name="namear" value={newRegion.namear} id="" onChange={(e) => { handelRegionInput(e) }} />
                </div>
                <div className="add-product__actions mt-2">
                    <button className="btn btn-primary" type='button' onClick={() => { addNew() }}>Add</button>
                </div>
            </Container>
        </>
    )
}