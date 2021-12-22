import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getRegions from '../../store/actions/regions';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import './AddRegion.css'
export default function AddRegion(props) {
    const [newRegion, setNewRegion] = useState({});
    const regionsRes = useSelector(state => state.regions.regions);
    const [region, setRegion] = useState(regionsRes);
    const dispatch = useDispatch();
    useEffect(() => {
        setRegion(props.regions)
    }, [])

    const handelRegionInput = (e) => {
        setNewRegion({
            namear: e.target.value
        })
          console.log(region)
    }
    const deleteRegion = (regionDeleted,) => {
        const regionsList = region.slice();
        for (let i = 0; i < region.length; i++) {
            if (region[i] === regionDeleted) {
                regionsList.splice(i, 1);
                //  console.log('done')
            }
        }
        dispatch(getRegions(regionsList))

    }
    const addNew = async () => {
        const regionsList = region?.slice();
        regionsList?.push(newRegion);
        //  console.log(regionsList)
        setRegion(regionsList)
        dispatch(getRegions(regionsList));
        setNewRegion({
            namear: ""
        })
    }
    return (

        <>
            <Container >
                <div className="taged-textbox form-group">
                    <label className="taged-textbox__lable m-2 fw-bold fs-5 text-danger" htmlFor="">Regions</label>
                    <div className="taged-textbox__data">
                        <div className="taged-textbox__tags">
                            {region?.map((region, index) => {
                                return (<div className="taged-textbox__tag" key={region?.namear} ><span>{region?.namear}</span><a href="#" className="taged-textbox__remove">
                                    <i className="fas fa-times" onClick={() => { deleteRegion(region, index) }}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></i></a>
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