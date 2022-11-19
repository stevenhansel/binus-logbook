#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

pub mod app;
pub mod config;
pub mod commands;
pub mod grpc;

fn main() {
    app::run()
}
