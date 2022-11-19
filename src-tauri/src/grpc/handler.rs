use super::{helloworld::greeter_client::GreeterClient, GrpcService};

pub async fn connect() -> Result<GrpcService, Box<dyn std::error::Error>> {
    let client = GreeterClient::connect("http://[::1]:9000").await?;
    let mut service = GrpcService::new(client);

    service.hello_world().await;

    Ok(service)
}
