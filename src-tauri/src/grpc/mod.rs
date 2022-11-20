pub mod result;
pub mod scraper;

pub mod scraper_rpc {
    tonic::include_proto!("scraper");
}

pub mod result_rpc {
    tonic::include_proto!("result");
}

pub use result::*;
pub use scraper::*;
pub use scraper_rpc::*;
pub use result_rpc::*;
