import { Link } from "react-router-dom";

export function ButtonWarning({text,buttonText,to}){
return(<div className="flex justify-center py-2 text-sm font-medium">
    <div>{text}</div>
    <Link to={to}>
    <div className="underline  pl-1 cursor-pointer">{buttonText}</div>
    </Link>
    
</div>)
}