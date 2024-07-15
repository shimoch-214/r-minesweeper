use std::{
    collections::{HashSet, VecDeque},
    fmt::Display,
};

use r_minesweeper::random_range;

type Position = (usize, usize);

fn get_around_positions(
    width: usize,
    hight: usize,
    here: &Position,
) -> impl Iterator<Item = Position> + '_ {
    let (x, y) = *here;
    ((x.max(1) - 1)..(x + 1).min(width - 1) + 1)
        .flat_map(move |i| ((y.max(1) - 1)..(y + 1).min(hight - 1) + 1).map(move |j| (i, j)))
        .filter(move |pos| pos != here)
}

// 爆弾の場合にNone, それ以外は Some(周囲の爆弾の数: u8)
type PositionStatus = Option<u8>;

struct MineSweeper {
    width: usize,
    hight: usize,
    mine_count: usize,
    opened_positions: HashSet<Position>,
    flagged_positions: HashSet<Position>,
    position_status_array: Vec<Vec<PositionStatus>>,
}

impl MineSweeper {
    pub fn new(width: usize, hight: usize, mine_count: usize) -> MineSweeper {
        // 爆弾の配置は最初にマスを開くタイミングで決める
        MineSweeper {
            width,
            hight,
            mine_count,
            opened_positions: HashSet::new(),
            flagged_positions: HashSet::new(),
            position_status_array: vec![vec![Option::Some(0); width]; hight],
        }
    }

    pub fn init_positions_status(&mut self, init_pos: &Position) {
        // 爆弾位置を決定する
        let mut mine_positions = HashSet::new();
        while mine_positions.len() < self.mine_count {
            let x = random_range(0, self.width);
            let y = random_range(0, self.hight);
            // 最初に開かれたマスには爆弾を設置しない
            if (x, y) == *init_pos {
                continue;
            }
            mine_positions.insert((x, y));
            self.position_status_array[y][x] = PositionStatus::None;
        }

        // 各マスの隣接爆弾数を埋める
        for mine_pos in mine_positions {
            let around_positions = get_around_positions(self.width, self.hight, &mine_pos);
            for (x, y) in around_positions {
                let status = self.position_status_array[y][x];
                if status.is_some() {
                    self.position_status_array[y][x] = PositionStatus::Some(status.unwrap() + 1);
                }
            }
        }
    }

    pub fn add_flag(&mut self, pos: &Position) {
        // すでに空いてるマスにフラグを立てようとした場合とか爆弾数以上にフラグを立てようとした場合にエラーとするかはそのうち考える
        if !self.opened_positions.contains(pos) && self.flagged_positions.len() < self.mine_count {
            self.flagged_positions.insert(*pos);
        }
    }

    fn search_positions(&self, pos: &Position) -> HashSet<Position> {
        let mut searched: HashSet<Position> = HashSet::new();
        let mut q: VecDeque<Position> = VecDeque::new();

        q.push_back(*pos);
        while let Some(cur) = q.pop_front() {
            let (x, y) = cur;
            let value = self.position_status_array[y][x].unwrap();
            if value == 0 {
                let around_positions = get_around_positions(self.width, self.hight, &cur);
                for pos in around_positions {
                    if !searched.contains(&pos) {
                        q.push_back(pos);
                    }
                }
            }
            searched.insert((x, y));
        }
        searched
    }

    pub fn open(&mut self, pos: &Position) -> Result<(), &str> {
        let (x, y) = *pos;
        let pos_status = self.position_status_array[y][x];

        if pos_status.is_none() {
            // 失敗で終了
            return Err("爆弾踏んじゃったね");
        }

        if pos_status.is_some_and(|v| v == 0) {
            // 0マスに繋がるあけていいマスを全部開ける
            let searched = self.search_positions(pos);
            self.opened_positions = &self.opened_positions | &searched;
        } else {
            self.opened_positions.insert(*pos);
        }
        // 空いたマスのフラグは外れる
        self.flagged_positions = &self.flagged_positions - &self.opened_positions;
        Ok(())
    }

    pub fn is_completed(&self) -> bool {
        self.width * self.hight == self.mine_count + self.opened_positions.len()
    }
}

impl Display for MineSweeper {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.write_fmt(format_args!(
            "flag_positions: {:?}\n",
            self.flagged_positions
        ))?;

        for j in 0..self.hight {
            for i in 0..self.width {
                let pos_status = self.position_status_array[j][i];
                if pos_status.is_some() {
                    if self.opened_positions.contains(&(i, j)) {
                        f.write_str(pos_status.unwrap().to_string().as_str())?
                    } else {
                        f.write_str("/")?
                    }
                } else {
                    f.write_str("◼")?
                }
            }
            f.write_str("\n")?
        }
        Ok(())
    }
}

// Game 本体の管理

#[derive(PartialEq)]
enum GameStatus {
    Init,
    Started,
    Failed,
    Success,
}

impl Display for GameStatus {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            GameStatus::Init => write!(f, "Init"),
            GameStatus::Started => write!(f, "Started"),
            GameStatus::Failed => write!(f, "Failed"),
            GameStatus::Success => write!(f, "Success"),
        }
    }
}

pub struct GameManager {
    mine_sweeper: MineSweeper,
    status: GameStatus,
}

impl GameManager {
    pub fn new(width: usize, hight: usize, mine_count: usize) -> GameManager {
        GameManager {
            mine_sweeper: MineSweeper::new(width, hight, mine_count),
            status: GameStatus::Init,
        }
    }

    fn is_in_progress(&self) -> bool {
        match self.status {
            GameStatus::Init | GameStatus::Started => true,
            GameStatus::Failed | GameStatus::Success => false,
        }
    }

    pub fn add_flag(&mut self, pos: &Position) {
        if !self.is_in_progress() {
            panic!("異常な status: {}", self.status)
        }
        self.mine_sweeper.add_flag(pos);
    }

    pub fn open(&mut self, pos: &Position) {
        if !self.is_in_progress() {
            panic!("異常な status: {}", self.status)
        }

        if self.status == GameStatus::Init {
            self.mine_sweeper.init_positions_status(pos);
            self.status = GameStatus::Started;
        }
        match self.mine_sweeper.open(pos) {
            Ok(_) => {
                if self.mine_sweeper.is_completed() {
                    self.status = GameStatus::Success;
                }
            }
            Err(_) => {
                self.status = GameStatus::Failed;
            }
        }
    }
}

// #[cfg(test)]
// mod tests {
//     use crate::mine_sweeper::MineSweeper;

//     #[test]
//     fn test() {
//         let mut ms = MineSweeper::new(9, 9, 10);
//         ms.init_positions_status(&(0, 0));
//         ms.add_flag(&(1, 1));
//         ms.open(&(0, 0));

//         println!("{}", ms);
//     }
// }
