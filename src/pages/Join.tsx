import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Join.css';

function Join() {
    // URLパラメータからroomIdを取得
    const { roomId } = useParams();
    const [userId, setUserId] = useState('');
    return (
        <div className="flex flex-col items-center justify-center h-screen" id="bg">
            {/* roomIdを使用して必要な処理を実装 */}
            <h1 className="text-4xl font-black mb-4 underline">BINGO</h1>
            <h1 className="text-2xl font-bold mb-4">ルーム {roomId} に参加</h1>
            <span className="text-sm text-xl text-gray-700 mb-4 bg-yellow-100 p-2 rounded-md">
                <span className="font-bold">主催者から案内された他の人と重複しない自分のID</span>を入力してください。<br />
                例：YoutubeのID、TwitterのID、メールアドレス、社員番号など
            </span>
            <input type="text" className="border border-gray-300 rounded-md p-2 mb-4" placeholder="ユーザーID" value={userId} onChange={(e) => setUserId(e.target.value)} />
            <Link to={userId ? `/${roomId}/${encodeURIComponent(userId)}` : ''}
                className={`bg-orange-500 text-white px-4 py-2 rounded-md ${userId ? '' : 'opacity-50 cursor-not-allowed'}`}
            >参加</Link>
        </div>
    );
}

export default Join;