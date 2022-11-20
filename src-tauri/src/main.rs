#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

pub mod app;
pub mod commands;
pub mod config;
pub mod events;
pub mod grpc;
pub mod models;

fn main() {
    app::run()
}
