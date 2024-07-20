use serde::{Deserialize, Serialize};

use crate::mine_sweeper::GameManager;

#[derive(Serialize, Deserialize)]
struct OpenedPosition {
    x: usize,
    y: usize,
    around_mines_count: u8,
}

#[derive(Serialize, Deserialize)]
struct FlaggedPosition {
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
    flagged_positions: Vec<FlaggedPosition>,
}

impl From<&GameManager> for Response {
    fn from(gm: &GameManager) -> Self {
        let ms = gm.get_minesweeper();

        let flagged_positions = ms
            .get_flagged_positions()
            .iter()
            .map(|p| FlaggedPosition { x: p.0, y: p.1 })
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

        Response {
            status: gm.get_status().to_string(),
            width: ms.get_width(),
            hight: ms.get_hight(),
            mine_count: ms.get_mine_count(),
            opened_positions,
            flagged_positions,
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

        let res = Response::from(&gm);

        let j = json!(res);
        println!("{}", j);
    }
}
