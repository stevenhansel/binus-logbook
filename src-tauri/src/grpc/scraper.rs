use tonic::{transport::Channel, Status};

use crate::models;

use super::{scraper_client::ScraperClient, LoginRequest};

pub struct ScraperRPC {
    _client: ScraperClient<Channel>,
}

impl ScraperRPC {
    pub fn new(_client: ScraperClient<Channel>) -> Self {
        ScraperRPC { _client }
    }

    pub async fn login(&mut self, email: String, password: String) -> Result<models::Task, Status> {
        let response = self
            ._client
            .login(LoginRequest { email, password })
            .await?
            .into_inner();

        Ok(models::Task {
            title: response.title,
            tasks: response
                .tasks
                .into_iter()
                .map(|t| models::Subtask {
                    step: t.step,
                    name: t.name,
                })
                .collect::<Vec<models::Subtask>>(),
        })
    }
}
