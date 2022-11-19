use super::helloworld::greeter_client::GreeterClient;
use super::helloworld::HelloRequest;
use tonic::transport::Channel;

pub struct GrpcService {
    _client: GreeterClient<Channel>,
}

impl GrpcService {
    pub fn new(_client: GreeterClient<Channel>) -> Self {
        GrpcService { _client }
    }

    pub async fn hello_world(&mut self) {
        let response = self
            ._client
            .say_hello(HelloRequest {
                name: "John Doe".into(),
            })
            .await;

        println!("response: {:?}", response);
    }
}

pub async fn handler() -> Result<GreeterClient<Channel>, Box<dyn std::error::Error>> {
    Ok(GreeterClient::connect("http://[::1]:9000").await?)
}
