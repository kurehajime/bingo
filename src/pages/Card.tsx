import { useParams } from "react-router-dom";
import { makeCard } from "../libs/RoomUtil";
import "./Card.css";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function Card() {
    const [open, setOpen] = useState<boolean[]>(Array(25).fill(false));
    const { roomId, userId } = useParams();
    const cards = makeCard(roomId || '', userId || '');
    useEffect(() => {
        setOpen(prev => {
            const newOpen = [...prev];
            newOpen[12] = true;
            return newOpen;
        });
    }, [roomId, userId]);

    return <>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <div className="flex flex-col items-center justify-center p-4">
            <h1 className="text-2xl font-bold mb-4">ビンゴカード</h1>
            <div className="text-center mb-4">
                <div className="mb-2">
                    ルームID: {roomId}
                </div>
                <div>
                    ユーザーID: {decodeURIComponent(userId || '')}
                </div>
            </div>
            <div id="cards">
                {cards.map((card, index) => {
                    return <Cell key={index} index={index} value={card} open={open[index]} setOpen={setOpen} />
                })}
            </div>
        </div>
    </>;
}

function Cell({ index, value, open, setOpen }:
    { index: number, value: number, open: boolean, setOpen: Dispatch<SetStateAction<boolean[]>> }) {
    return <div className={`rounded-md cell ${open ? 'bg-blue-200' : 'bg-gray-200'}`} onClick={() => {
        setOpen(prev => {
            const newOpen = [...prev];
            newOpen[index] = !newOpen[index];
            return newOpen;
        });
    }}>{value}</div>;
}