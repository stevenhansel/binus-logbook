use tauri::{AppHandle, Manager};
use tonic::transport::Channel;

use crate::events::Event;

use super::result_rpc::result_listener_client::ResultListenerClient;

pub struct ResultRPC {
    _client: ResultListenerClient<Channel>,
}

impl ResultRPC {
    pub fn new(_client: ResultListenerClient<Channel>) -> Self {
        ResultRPC { _client }
    }

    pub async fn consume(&mut self, handle: AppHandle) -> Result<(), tonic::Status> {
        let mut stream = self._client.listen(()).await?.into_inner();

        while let Some(res) = stream.message().await? {
            println!("{:?}", res);
        }

        // handle.emit_all(Event::Result.str(), "received some message");

        Ok(())
    }
}
