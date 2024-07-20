// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use mine_sweeper::GameManager;
use response::Response;
use tauri::State;

mod mine_sweeper;
mod response;

#[tauri::command]
fn get(gm: State<'_, GameManager>) -> Response {
    Response::from(&*gm)
}

#[tauri::command]
fn open(gm: State<'_, GameManager>, x: usize, y: usize) -> Response {
    gm.open(&(x, y));
    Response::from(&*gm)
}

#[tauri::command]
fn add_flag(gm: State<'_, GameManager>, x: usize, y: usize) -> Response {
    gm.add_flag(&(x, y));
    Response::from(&*gm)
}

fn main() {
    tauri::Builder::default()
        .manage(GameManager::new(10, 10, 9))
        .invoke_handler(tauri::generate_handler![get, open, add_flag])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
