export default function Rule() {
    return <div className="flex flex-col items-start gap-4 bg-blue-100 rounded-md w-full max-w-[500px] text-sm">
        <div className="p-4">
            <h1 className="text-center text-base font-bold underline">このビンゴの遊び方</h1>
            <div className="text-left text-sm">
                <h1 className="font-bold text-center">主催者がすること</h1>
                <ul className="pl-7">
                    <li className="list-disc">
                        IDのルールを決めて参加者に伝えてください
                        (例：SNSのID、メールアドレス、社員番号など、1人で複数登録が難しいものが良いです)
                    </li>
                    <li className="list-disc">
                        参加者にQRコードまたは参加用URLを配ってください
                    </li>
                    <li className="list-disc">
                        ビンゴを始める用意ができたら、抽選ボタンを押してください
                    </li>
                    <li className="list-disc">
                        ビンゴ達成した人が現れたらIDを入力して確認してください
                    </li>
                </ul>
            </div>
            <div className="text-left text-sm">
                <h1 className="font-bold text-center">参加者がすること</h1>
                <ul className="pl-7">
                    <li className="list-disc">
                        主催者から案内されたURLまたはQRコードにアクセスしてください
                    </li>
                    <li className="list-disc">
                        主催者から案内された自分のIDを入力して参加してください
                    </li>
                    <li className="list-disc">
                        主催者が発表した番号の穴を開けてください
                    </li>
                    <li className="list-disc">
                        ビンゴになったら主催者にユーザーIDを申告してください
                    </li>
                </ul>
            </div>
        </div>

    </div>
}