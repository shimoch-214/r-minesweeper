use itertools::Itertools;
use r_minesweeper::random_range;
use std::{
    collections::HashSet,
    fmt::{Display, Write},
};

type Position = (usize, usize);

enum OpenResult {
    Mine,
    NoMine(u8),
}

#[derive(Debug)]
pub struct MineSweeper {
    width: usize,
    hight: usize,
    opened_field: HashSet<Position>,
    mine_field: HashSet<Position>,
    flagged_field: HashSet<Position>,
}

impl MineSweeper {
    pub fn new(width: usize, hight: usize, mine_count: usize) -> MineSweeper {
        MineSweeper {
            width,
            hight,
            opened_field: HashSet::new(),
            mine_field: {
                let mut mine_field = HashSet::new();

                while mine_field.len() < mine_count {
                    mine_field.insert((random_range(0, width), random_range(0, hight)));
                }

                mine_field
            },
            flagged_field: HashSet::new(),
        }
    }

    fn neighbors(&self, (x, y): Position) -> impl Iterator<Item = Position> {
        let width = self.width;
        let hight = self.hight;

        ((x - 1).max(0)..=(x + 1).min(width - 1))
            .flat_map(move |i| ((y - 1).max(0)..=(y + 1).min(hight - 1)).map(move |j| (i, j)))
            .filter(move |&pos| pos != (x, y))
    }

    fn get_neighbor_mine_count(&self, pos: Position) -> u8 {
        let neighbors = self.neighbors(pos);
        neighbors
            .filter(|pos| self.mine_field.contains(pos))
            .count() as u8
    }

    pub fn open(&mut self, position: Position) -> OpenResult {
        self.opened_field.insert(position);

        if self.mine_field.contains(&position) {
            OpenResult::Mine
        } else {
            let mine_count = self.get_neighbor_mine_count(position);
            OpenResult::NoMine(mine_count)
        }
    }

    pub fn put_flag(&mut self, position: Position) {
        if self.flagged_field.contains(&position) {
            self.flagged_field.remove(&position);
        }
        self.flagged_field.insert(position);
    }
}

impl Display for MineSweeper {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        let header = (0..self.width)
            .map(|h| h + 1)
            .collect::<Vec<usize>>()
            .iter()
            .join("");

        f.write_fmt(format_args!("   {}\n", &header))?;

        for j in 0..self.hight {
            f.write_str(&format!("{:02} ", j + 1))?;
            for i in 0..self.width {
                let pos = (i, j);

                if self.mine_field.contains(&pos) {
                    f.write_str("!")?
                } else if !self.opened_field.contains(&pos) {
                    f.write_str("■")?
                } else {
                    write!(f, "{}", self.get_neighbor_mine_count(pos))?
                }
            }
            f.write_char('\n')?;
        }
        Ok(())
    }
}

#[cfg(test)]
mod tests {
    use super::MineSweeper;

    #[test]
    fn test() {
        let mut ms = MineSweeper::new(20, 20, 40);
        ms.open((4, 6));

        println!("{}", ms);
    }
}
