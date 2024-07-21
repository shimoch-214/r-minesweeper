use serde::{Deserialize, Serialize};

use crate::mine_sweeper::{GameManager, GameStatus};

#[derive(Serialize, Deserialize)]
struct OpenedPosition {
    x: usize,
    y: usize,
    around_mines_count: u8,
}

#[derive(Serialize, Deserialize, Debug)]
struct Position {
    x: usize,
    y: usize,
}

#[derive(Serialize, Deserialize)]
pub struct Response {
    status: String,
    width: usize,
    hight: usize,
    mine_count: usize,
    opened_positions: Vec<OpenedPosition>,
    flagged_positions: Vec<Position>,
    mine_positions: Vec<Position>,
}

impl From<&GameManager> for Response {
    fn from(gm: &GameManager) -> Self {
        let ms = gm.get_minesweeper();

        let flagged_positions = ms
            .get_flagged_positions()
            .iter()
            .map(|p| Position { x: p.0, y: p.1 })
            .collect();

        let opened_positions = ms
            .get_opened_positions_with_value()
            .iter()
            .map(|p_w| {
                let ((x, y), around_mines_count) = *p_w;
                OpenedPosition {
                    x,
                    y,
                    around_mines_count,
                }
            })
            .collect();

        let mine_positions = if gm.get_status() == GameStatus::Failed {
            ms.get_mine_positions()
                .iter()
                .map(|p| Position { x: p.0, y: p.1 })
                .collect()
        } else {
            vec![]
        };

        Response {
            status: gm.get_status().to_string(),
            width: ms.get_width(),
            hight: ms.get_hight(),
            mine_count: ms.get_mine_count(),
            opened_positions,
            flagged_positions,
            mine_positions,
        }
    }
}

#[cfg(test)]
mod tests {
    use serde_json::json;

    use crate::mine_sweeper::GameManager;

    use super::Response;

    #[test]
    fn test() {
        let gm = GameManager::new(9, 9, 10);
        gm.open(&(1, 1));
        gm.restart();

        let res = Response::from(&gm);

        let j = json!(res);
        println!("{}", j);
    }
}
