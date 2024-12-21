import { useParams } from 'react-router-dom';

function Join() {
    // URLパラメータからroomIdを取得
    const { roomId } = useParams();

    return (
        <div>
            {/* roomIdを使用して必要な処理を実装 */}
            <h1>ルーム {roomId} に参加</h1>
        </div>
    );
}

export default Join;