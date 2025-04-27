function GeneralInput ({placeholder,type,id,onChange,value}){
    return(
        <div className="general-input">
            <label htmlFor={id}>  </label>
            <input className="input"  value={value} id={id} placeholder={placeholder } type={type} onChange={onChange}   />
        </div>
    );
}
export default GeneralInput