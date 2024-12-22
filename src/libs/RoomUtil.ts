import { createShuffle } from 'fast-shuffle'
import { NUMBER_1_90 } from './consts';
export type RoomInfo = {
    id: string;
    roomId: string;
    lotteryId: string;
}

export function getRoomInfo(id: string): RoomInfo {
    const publicId = id.split('-')[0];
    const privateId = id.split('-').slice(1).join('');
    return {
        id: id,
        roomId: publicId,
        lotteryId: privateId
    };
}

export function makeCard(roomId: string, userId: string): number[] {
    const seed = stringTo32BitHash(`${roomId}-${userId}`);
    const shuffle = createShuffle(seed);
    const card = shuffle(NUMBER_1_90).slice(0, 25);
    card[12] = 0;
    return card;
}

export function checkBingo(card: number[], lottery: number[]): boolean {
    const lotteried = [0, ...lottery];
    const checkLines = [
        [0, 1, 2, 3, 4],
        [5, 6, 7, 8, 9],
        [10, 11, 12, 13, 14],
        [15, 16, 17, 18, 19],
        [20, 21, 22, 23, 24],
        [0, 5, 10, 15, 20],
        [1, 6, 11, 16, 21],
        [2, 7, 12, 17, 22],
        [3, 8, 13, 18, 23],
        [4, 9, 14, 19, 24],
        [0, 6, 12, 18, 24],
        [4, 8, 12, 16, 20],
        [0, 6, 12, 18, 24],
        [4, 8, 12, 16, 20],
    ]
    for (const line of checkLines) {
        if (line.every(num => lotteried.includes(card[num]))) {
            return true;
        }
    }
    return false;
}

export function getLottery(lotteryId: string, turn: number): number[] {
    if (lotteryId === '') {
        return [];
    }
    const seed = stringTo32BitHash(`${lotteryId}`);
    const shuffle = createShuffle(seed);
    const lottery = shuffle(NUMBER_1_90).slice(0, turn);
    return lottery;
}

function stringTo32BitHash(str: string) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash = hash & 0xFFFFFFFF;
    }
    return hash >>> 0;
}
