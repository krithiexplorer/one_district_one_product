export function InputBox({label,placeholder,onChange}){
    return(<div>
        <div className="text-sm font-medium text-left py-1">{label}</div>
        <input onChange={onChange} className="border w-full px-2 py-1 rounded border-slate-200 " placeholder={placeholder} ></input>
    </div>)
}