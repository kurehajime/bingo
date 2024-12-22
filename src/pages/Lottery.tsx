import { useEffect, useState } from "react";
import { getLottery, getRoomInfo, RoomInfo } from "../libs/RoomUtil";
import { Link } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";

export default function Lottery() {
    const [roomInfo, setRoomInfo] = useState<RoomInfo | null>(null);
    const [turn, setTurn] = useState(0);
    useEffect(() => {
        const key = localStorage.getItem('roomKey');
        if (key) {
            setRoomInfo(getRoomInfo(key));
        }
    }, []);
    const lottery = getLottery(roomInfo?.lotteryId ?? '', turn);


    return <div>
        <h1>ビンゴ</h1>
        <div className="flex flex-col gap-4">
            <div>
                ルームID: {roomInfo?.roomId}
            </div>
            <div>
                抽選回数: {turn}
            </div>
            <div>
                抽選結果: {lottery.join(', ')}
            </div>
            <div>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    onClick={() => {
                        setTurn(turn + 1);
                    }}>次の抽選</button>
                <button
                    className="bg-gray-200 text-white px-4 py-2 rounded-md"
                    onClick={() => {
                        if (turn > 0) {
                            setTurn(turn - 1);
                        }
                    }}>1つ戻す</button>
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                    onClick={() => {
                        if (window.confirm('ルームを作り直すと参加者にもう一度カードを配りなおす必要があります。よろしいですか？')) {
                            setTurn(0);
                            const uuid = crypto.randomUUID();
                            localStorage.setItem('roomKey', uuid);
                            setRoomInfo(getRoomInfo(uuid));
                        }
                    }}>ルームを作り直す</button>
            </div>
            <div>
                <Link to={`/join/${roomInfo?.roomId}`}
                    target="_blank"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md">参加する</Link>
            </div>
            <div>
                <QRCodeSVG value={`${window.location.origin}/join/${roomInfo?.roomId}`} />
            </div>
        </div>
    </div>;
}