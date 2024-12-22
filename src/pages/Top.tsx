import { Link } from "react-router-dom";
import Rule from "./Rule";
import './Top.css';

export default function Top() {
    return <div className="flex flex-col items-center justify-center h-screen gap-4" id="bg">
        <Link to="/lottery" className="bg-orange-500 text-white px-4 py-2 rounded-md"
            onClick={() => {
                localStorage.setItem('roomKey', crypto.randomUUID());
            }}
        >ビンゴ会場を作る</Link>
        <Rule />
    </div>;
}