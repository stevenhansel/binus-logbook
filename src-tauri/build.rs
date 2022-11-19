fn main() {
    let protos: &'static [&str] = &[
        "../proto/scraper.proto",
        "../proto/result.proto",
    ];

    for proto in protos {
        tonic_build::compile_protos(proto)
            .unwrap_or_else(|e| panic!("Failed to compile protos {:?}", e));
    }
    tauri_build::build()
}
