import React ,{useState,useEffect}from 'react';
import { Select } from 'antd';
import { getCatagory } from '../axios/admin';
import '../css/home.css';
const { Option } = Select;
const SelectOp = ({option}) => {
    const [options, setOptions] = useState([]) 
    const [current, setCurrent] = useState('')   
    function handleChange(value) {
        setCurrent(value);
        option(value);
    }
    useEffect(()=>{
        getCatagory().then(res=>{
            setOptions(res.data)
            setCurrent(res.data[0].name)
            console.log(res.data[0].name);
        }
        )
    },[])
  return (
  <>
    <Select value={current}  style={{ width: 160 }} onChange={handleChange}  >
      {/* <Option value="jack">Jack</Option>
      <Option value="lucy">Lucy</Option>
      <Option value="Yiminghe">yiminghe</Option> */}
      {console.log()}
        {options.map(item=>{
            return <Option key={item.id} value={item.id}>{item.name}</Option>
        })}
    </Select>
    
  </>);
};

export default SelectOp;
