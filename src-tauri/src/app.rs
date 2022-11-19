use tauri::generate_handler;

use crate::{commands, grpc};

pub fn run() {
    let _grpc_service = tauri::async_runtime::block_on(grpc::connect());
    tauri::Builder::default()
        .invoke_handler(generate_handler![commands::login])
        .run(tauri::generate_context!())
        .expect("error while running tauri application")
}
