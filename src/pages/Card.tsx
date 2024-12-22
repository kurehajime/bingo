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
        <div className="flex flex-col items-center justify-center p-4 min-h-screen w-full" id="bg">
            <h1 className="text-4xl font-black mb-4 w-full text-center">BINGO</h1>
            <div className="text-center w-full flex flex-row gap-2 justify-center max-w-[500px]">
                <div className="mb-2 bg-yellow-100 p-2 rounded-md">
                    <label htmlFor="roomId" className="w-full text-left text-xs">ルームID</label>
                    <div className="flex flex-row gap-2 w-full">
                        <input type="text" className="w-full rounded-md px-2 text-center bg-yellow-100 font-bold"
                            id="roomId"
                            defaultValue={roomId}
                            disabled
                        />
                        <button className="bg-yellow-500 text-white px-4 py-2 rounded-md w-15 active:bg-yellow-700"
                            title="クリップボードにコピーする"
                            onClick={() => {
                                navigator.clipboard.writeText(roomId || '');
                            }}>📋</button>
                    </div>

                </div>
                <div className="mb-2 bg-yellow-100 p-2 rounded-md">
                    <label htmlFor="userId" className="w-full text-left text-xs">ユーザーID</label>
                    <div className="flex flex-row gap-2 w-full">
                        <input type="text" className="w-full rounded-md px-2 text-center bg-yellow-100 font-bold"
                            id="userId"
                            defaultValue={decodeURIComponent(userId || '')}
                            disabled
                        />
                        <button className="bg-yellow-500 text-white px-4 py-2 rounded-md w-15 active:bg-yellow-700"
                            title="クリップボードにコピーする"
                            onClick={() => {
                                navigator.clipboard.writeText(userId || '');
                            }}>📋</button>
                    </div>
                </div>
            </div>
            <div className="bg-yellow-100 p-2 rounded-md w-full max-w-[500px] text-sm">
                <ul className="pl-7">
                    <li className="list-disc">主催者が発表した番号の穴を開けましょう</li>
                    <li className="list-disc">ビンゴになったら主催者にユーザーIDを申告してください</li>
                </ul>
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
    return <div className={`rounded-md cell bg-yellow-200 border-2 border-yellow-500 bg-opacity-50`} onClick={() => {
        setOpen(prev => {
            const newOpen = [...prev];
            newOpen[index] = !newOpen[index];
            return newOpen;
        });
    }}>
        <div className={`font-black text-center rounded-full w-5/6 h-5/6 flex items-center justify-center  bg-opacity-50 ${open || value === 0 ? 'opened' : ''}`
        }>{value !== 0 ? value : '🎉'}</div>
    </div >;
}