export type GameOutData = {
    id: number;
    team1: Array<GamePlayerData>;
    team2: Array<GamePlayerData>;
    team1_score: number;
    team2_score: number;
    created_at: string;
    deletable: boolean;
};
export type GamePlayerData = {
    id: number;
    name: string;
};
export type PlayerOutData = {
    id: number;
    rank: number;
    name: string;
    mu: number;
    sigma: number;
    score: number;
    games_count: number;
};
