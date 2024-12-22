import { useEffect, useState } from "react";
import { checkBingo, getLottery, getRoomInfo, makeCard, RoomInfo } from "../libs/RoomUtil";
import { Link } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import { NUMBER_1_75 } from "../libs/consts";
import './Lottery.css';

export default function Lottery() {
    const [roomInfo, setRoomInfo] = useState<RoomInfo | null>(null);
    const [turn, setTurn] = useState(0);
    const [userId, setUserId] = useState('');
    const [message, setMessage] = useState(`ビンゴ達成した人は自己申告してください`);
    const [isBingo, setIsBingo] = useState<boolean | null>(null);
    useEffect(() => {
        const key = localStorage.getItem('roomKey');
        if (key) {
            setRoomInfo(getRoomInfo(key));
        }
    }, []);
    const lottery = getLottery(roomInfo?.lotteryId ?? '', turn);
    const joinUrl = new URL(`../#/join/${roomInfo?.roomId}`, `${window.location.origin}${window.location.pathname}`)
    const check = () => {
        if (userId !== '') {
            const card = makeCard(roomInfo?.roomId ?? '', userId);
            const bingo = checkBingo(card, lottery);
            if (bingo) {
                setMessage(`${userId}さんはビンゴ達成です！`);
                setIsBingo(true);
            } else {
                setMessage(`残念！${userId}さんはビンゴ達成ではありません`);
                setIsBingo(false);
            }
        } else {
            setMessage(`ビンゴ達成した人は自己申告してください`);
            setIsBingo(null);
        }
    }
    return (
        <div className="flex w-full justify-center">
            <div className="min-w-[550px] bg-white  flex flex-col items-center justify-center">
                <div>
                    <div className="text-center text-[300px] font-bold py-1 leading-none">
                        {lottery?.length > 0 ? lottery[lottery.length - 1] : '*'}
                    </div>
                </div>
                <div className="flex justify-center my-4" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(15, 32px)',
                    gridTemplateRows: 'repeat(6, 32px)',
                    gridGap: '2px',
                    justifyContent: 'center'
                }}>
                    {
                        NUMBER_1_75.map((num) => {
                            const hit = lottery?.includes(num);
                            return <div key={num} className={`w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 text-xl ${hit ? 'bg-red-500' : ''}`}>
                                {num}
                            </div>
                        })
                    }
                </div>
            </div>
            <div className="flex-grow max-w-[550px] bg-gray-200 p-4 flex flex-col items-center justify-center gap-4">
                <div className="text-center text-2xl font-bold">
                    ルームID: {roomInfo?.roomId}
                </div>
                <div className="text-center text-2xl font-bold">
                    抽選回数: {turn}
                </div>
                <div className="text-center text-2xl font-bold w-full">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
                        onClick={() => {
                            setTurn(turn + 1);
                        }}>抽選する</button>
                </div>
                <div className="text-center text-2xl font-bold w-full">
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md w-full"
                        onClick={() => {
                            if (window.confirm('ルームを作り直すと参加者にもう一度カードを配りなおす必要があります。よろしいですか？')) {
                                setTurn(0);
                                const uuid = crypto.randomUUID();
                                localStorage.setItem('roomKey', uuid);
                                setRoomInfo(getRoomInfo(uuid));
                            }
                        }}>ルームを作り直す</button>
                </div>
                <div className="w-full flex flex-col gap-4 bg-white p-4 rounded-md">
                    <div className="text-center text-2xl font-bold w-full">
                        <Link to={joinUrl.toString()}
                            target="_blank"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md w-full">参加する</Link>
                    </div>
                    <div className="text-center text-2xl font-bold w-full flex justify-center">
                        <QRCodeSVG
                            className="w-52 h-52"
                            value={joinUrl.toString()} />
                    </div>
                    <div className="text-center text-xs font-bold w-full">
                        <p>{joinUrl.toString()}</p>
                    </div>
                </div>
                <div className="text-center text-2xl font-bold w-full flex flex-col gap-2">
                    <label htmlFor="userId" className="w-full text-left text-xs">
                        ビンゴ達成した人のIDを入力して確認する
                    </label>
                    <div className="flex flex-row gap-2 w-full">
                        <input id="userId" type="text" className="w-full rounded-md px-2"
                            placeholder="ID"
                            value={userId}
                            onChange={(e) => {
                                setUserId(e.target.value);
                            }}
                        />
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-md w-40"
                            onClick={() => { check() }}>確認</button>
                    </div>
                    <div className={`text-center text-2xl w-full ${isBingo === true ? 'bingo' : isBingo === false ? 'not-bingo' : ''}`}>
                        {message}
                    </div>
                </div>
            </div>
        </div>
    );
}