use portpicker::pick_unused_port;
use tauri::{api::process::{Command, CommandEvent}, generate_handler};

use crate::{
    commands,
    grpc::{self, result_listener_client::ResultListenerClient},
};

pub fn run() {
    let scraper_port = match pick_unused_port() {
        Some(port) => port,
        None => 9000,
    };

    let (mut rx, _child) = Command::new_sidecar("api")
        .expect("failed to create `api` binary command")
        .args(["-port", scraper_port.to_string().as_str()])
        .spawn()
        .expect("Failed to spawn sidecar");

    tauri::Builder::default()
        .setup(move |app| {
            let handle = app.handle();
            tauri::async_runtime::spawn(async move {
                // Wait for the server to listen to the port
                while let Some(event) = rx.recv().await {
                    if let CommandEvent::Stdout(line) = event {
                        if line == "started" {
                            println!("Scraper's gRPC server has started");
                            break;
                        }
                    }
                }

                let conn = ResultListenerClient::connect(format!("http://[::1]:{}", scraper_port))
                    .await
                    .unwrap();
                let mut result_rpc = grpc::ResultRPC::new(conn);

                result_rpc.consume(handle).await.unwrap();
            });

            Ok(())
        })
        .invoke_handler(generate_handler![commands::login])
        .run(tauri::generate_context!())
        .expect("error while running tauri application")
}
